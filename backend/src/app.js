import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import userRouter from "./routes/user.routes.js";
app.use("/api/auth", userRouter);

import postRouter from "./routes/post.routes.js";
app.use("/api/posts", postRouter);

import chatRouter from "./routes/chat.routes.js";
app.use("/api/chat", chatRouter);

export { app };
