import Credit from "./models/credits.model.js";
import User from "./models/user.model.js";

User.hasOne(Credit);
Credit.belongsTo(User);
