import { Model, DataTypes } from "sequelize";
import bcryptjs from "bcryptjs";
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
      unique: true,
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

User.beforeCreate(async (user) => {
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);
});

User.prototype.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcryptjs.compare(password, user.password);
  return compare;
};

export default User;

/* userName: ,
  email: ,
  password: ,
  firstName: ,
  lastName: ,
  phone:  */
