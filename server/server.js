import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "mongoose";
import connectDb from "./configs/db.js";
import userRouter from "./router/userRoutes.js";
import resumeRouter from "./router/resumeRoutes.js";
import aiRouter from "./router/aiRoutes.js";

const app = express()
const PORT = process.env.PORT || 3000;

// Database connection
await connectDb();

app.use(express.json())
app.use(cors())

app.get('/',(req, res) => res.send("Server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

