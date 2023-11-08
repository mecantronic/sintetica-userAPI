import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.controller.js";

const usersRoutes = Router();

usersRoutes.get("/", getAllUsers);

usersRoutes.get("/:userId", getUser);

usersRoutes.put("/:userId", updateUser);

usersRoutes.delete("/:userId", deleteUser);

export default usersRoutes;
