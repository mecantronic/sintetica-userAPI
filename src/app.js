import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "./passport/passportConfig.js";
import indexRouter from "./routes/index.routes.js";

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());

app.use("/", indexRouter);

export default app;
