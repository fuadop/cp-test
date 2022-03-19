import http from "node:http";
import { config } from "dotenv"
import debug from "debug";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import mongoose from "mongoose"
import authRouter from "./routes/auth"
import externalRouter from "./routes/external"
import handleResponse from "./utils/response";
import path from "node:path";


config();
const log = debug("cp-api");

const PORT = parseInt(process.env.PORT!, 10) || 2001;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/cp-api";

mongoose.connect(DB_URL)
.then(({ connection }) => {
  log('database connection established');

  connection.on("error", (e) => {
    log("database connection failed");
    log(e);
  });
})
.catch((e) => {
  log("database connection failed");
  log(e);
});

const app = express();

app.use(express.static(path.join(__dirname, "..", "frontend/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup cors - for local development
app.use(cors({
  origin: [
    "http://localhost:3000"
  ]
}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/external", externalRouter);

// 404 routes
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  try {
    return handleResponse(res, 400, "route not found");
  } catch (e) {
    return next(e);
  }
})
// internal server error catcher
app.use((error: Error, _: Request, res: Response, _next: NextFunction) => {
  log(error)
  handleResponse(res, 500, error.message)
});

const server = http.createServer(app);
server.listen(PORT, async () => {
  log("server started on ", PORT);
});

// prevent app from crashing
server.on("error", (e) => {
  log(e);
});

process.on('uncaughtException', (e) => {
  // would have logged error to file
  // but it won't be accessible on heroku (heroku cleans files every night)
  log(e);
});

process.on('unhandledRejection', (e) => {
  log(e);
});