import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcryptjs from "bcryptjs";
import passportJWT from "passport-jwt";
import User from "../models/user.model.js";
import Credit from "../models/credits.model.js";

// Configuración de estrategia local
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        //Busco user
        const user = await User.findOne({
          where: { email: username },
          include: [{
            model: Credit,
            attributes: ["freeCredits", "premiumCredits"],
          }],
        });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        //Comparo contraseña
        const match = await bcryptjs.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        return done(null, error);
      }
    }
  )
);

// Configuración de estrategia Google
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CB_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: { email: profile.emails[0].value },
          include: [{
            model: Credit,
            attributes: ["freeCredits", "premiumCredits"],
          }],
        });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          /* user = await User.create({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          }); */
          return done(null, { message: "Unregistered user" });
        }
      } catch (error) {
        return done(error, error);
      }
    }
  )
);

// Configuración de estrategia JWT

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt",
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      console.log(jwtPayload);
      const user = await User.findOne({ where: { id: jwtPayload.id } });

      if (user) {
        return done(null, user);
      }

      return done(null, false, { message: "Invalid token" });
    } catch (error) {
      return done(error, false, { message: "Error to token verification" });
    }
  })
);

export default passport;
