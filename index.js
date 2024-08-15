import express from "express";
import colors from "colors"
import { configDotenv } from "dotenv";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import cors from "cors"
const app=express();
configDotenv()
connectDb();
app.use(cors())
app.use(express.json());
app.use("/api/v1/user",userRoute)
app.get("/",(req,res)=>{
    return res.send({
        message:"Welcome to PCE Purnea Hub"
    })
});

app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`.bgBlue.white)
})