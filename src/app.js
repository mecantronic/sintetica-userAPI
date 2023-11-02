import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/", indexRouter);

export default app;
