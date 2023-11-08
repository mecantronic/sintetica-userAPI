import { Router } from "express";
import { addFreeCredits, addPremiumCredits, getCredits, subtractFreeCredits, subtractPremiumCredits } from "../controllers/credits.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const creditsRoutes = Router();



creditsRoutes.get("/", verifyToken, getCredits);

creditsRoutes.put("/addFree", verifyToken, addFreeCredits);

creditsRoutes.put("/addPremium", verifyToken, addPremiumCredits);

creditsRoutes.put("/subtractFree", verifyToken, subtractFreeCredits);

creditsRoutes.put("/subtractPremium", verifyToken, subtractPremiumCredits);

export default creditsRoutes;
