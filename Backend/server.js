import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";

dotenv.config();

const app = express();

connectDb();

let port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/user' , userRoute)



app.listen(port, () => console.log("server started"));
