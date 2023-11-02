import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service: {
      type: DataTypes.ENUM,
      values: ["free", "premium"],
      defaultValue: "free",
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);

export default User


  /* userName: ,
  email: ,
  password: ,
  firstName: ,
  lastName: ,
  phone:  */