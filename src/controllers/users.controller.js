import Credit from "../models/credits.model.js";
import User from "../models/user.model.js";
import { faker } from "@faker-js/faker";

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    ok: true,
    status: 200,
    users,
  });
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({
    where: { id: userId },
    attributes: ["userName", "email", "firstName", "lastName", "phone"],
    include: {
      model: Credit,
    },
  });
  res.status(200).json({
    ok: true,
    status: 200,
    user,
  });
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { userName, firstName, lastName, phone } = req.body;
  const updatedUser = await User.update(
    {
      userName,
      firstName,
      lastName,
      phone,
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

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await User.destroy({
    where: { id: userId },
  });
  res.status(204).json({
    ok: true,
    status: 204,
    message: "User deleted",
    deletedUser,
  });
};
