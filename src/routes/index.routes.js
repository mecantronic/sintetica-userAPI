import { Router } from "express";
import usersRoutes from "./users.routes.js";

const indexRouter = Router();

indexRouter.use("/users", usersRoutes);

indexRouter.get("/ping", async (req, res) => {

});

export default indexRouter;
