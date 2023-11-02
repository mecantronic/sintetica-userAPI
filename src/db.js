import "dotenv/config.js";
import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME || 'sintetica';
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASS || 'TiendaPlastik';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: "mysql",
    port: dbPort,
})

export default sequelize
