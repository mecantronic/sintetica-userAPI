import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";

class Credit extends Model {}

Credit.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    freeCredits: {
      type: DataTypes.INTEGER,
      defaultValue: 10000,
    },
    premiumCredits: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Credit",
    timestamps: false,
  }
);

export default Credit;
