import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Credit from "../models/credits.model.js";

export const loginUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: info.message });
    }

    const token = jwt.sign({ id: user.id, service: user.service }, process.env.JWT_SECRET);

    return res.status(200).json({
      ok: true,
      status: 200,
      data: { token, userName: user.userName, service: user.service, credits: user.Credit },
    });
  })(req, res, next);
};

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password, firstName, lastName, phone } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: "The e-mail address has already been registered",
      });
      return;
    }

    const user = await User.create({
      userName,
      email,
      password,
      firstName,
      lastName,
      phone,
    });

    const addCredits = await Credit.create({});

    await addCredits.setUser(user);

    const token = jwt.sign({ id: user.id, service: user.service }, process.env.JWT_SECRET);

    return res.status(201).json({
      ok: true,
      status: 200,
      data: { token, userName: user.userName, credits: user.Credit },
    });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user" });
  }
};

export const loginWithGoogle = (req, res) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Google login error" });
    }

    const token = jwt.sign({ id: user.id, service: user.service }, process.env.JWT_SECRET);

    return res.json({ token, userName: user.userName, service: user.service, credits: user.Credit });
  })(req, res);
};

export const isLoggedIn = (req,res) => {
  const user = req.user
  if (user) {
    return res.status(201).json({
      ok: true,
      status: 200,
      message: "Verified token",
    });
  } else {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Unverified token",
    });
  }
}

export const upgradeUser = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await User.update(
    {
      service: "premium"
    },
    {
      where: { id: userId },
    }
  );
  res.status(202).json({
    ok: true,
    status: 202,
    message: "User updated",
    updatedUser,
  });
};