import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"
import userRoute from "./routes/users.js";
import movieRoute from "./routes/movies.js"
import listRoute from "./routes/lists.js"
import authRoute from "./routes/auth.js"


const app=express()

dotenv.config();
app.use(cors())
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

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);


app.listen(PORT, () => {
    console.log("Backend server is running!");
  });