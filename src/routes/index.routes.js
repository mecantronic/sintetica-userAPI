import { Router } from "express";
import usersRoutes from "./users.routes.js";
import creditsRoutes from "./credits.routes.js";
import authRoutes from "./auth.routes.js";

const indexRouter = Router();

indexRouter.use("/users", usersRoutes);
indexRouter.use("/credits", creditsRoutes);
indexRouter.use("/auth", authRoutes);

indexRouter.get("/ping", async (req, res) => {

});

export default indexRouter;
