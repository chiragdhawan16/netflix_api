import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"
import userRoute from "./routes/users.js";

dotenv.config();
const app=express()
app.use(express.json());

const PORT=process.env.PORT||8080

const connectDB=async()=>{
    try {
       
       const conn=await mongoose.connect(process.env.MONGO_URL);
       console.log("db connected")
    } catch (error) {
        console.log(error )
    }
}

connectDB();

app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log("Backend server is running!");
  });