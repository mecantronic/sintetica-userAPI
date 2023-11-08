import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  registerUser,
  loginWithGoogle,
  isLoggedIn,
  upgradeUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoutes.get("/google/callback", loginWithGoogle);

authRoutes.get("/isLog", verifyToken, isLoggedIn);

authRoutes.put("/upgrade/:userId", upgradeUser);
export default authRoutes;

