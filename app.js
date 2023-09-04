import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middleware/error.js";
import { config } from "dotenv";
import cors from "cors"

export const app = express();

config({
    path : "./data/config.env"
});


//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}))

//ROUTER
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(errorMiddleware);

