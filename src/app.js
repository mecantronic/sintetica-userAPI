import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "./passport/passportConfig.js";
import indexRouter from "./routes/index.routes.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());

app.use("/", indexRouter);

export default app;
