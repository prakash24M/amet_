import express from "express"
import mongoose from "mongoose"
import userRouter from "./userRouter.js"
import reportRouter from "./reportRouter.js"
import adminRouter from "./adminRouter.js"
import cors from 'cors';
import morgan from "morgan"

const app=express()
app.use(cors())
app.use(express.json())
app.use("/student",userRouter)
app.use("/report",reportRouter)
app.use("/admin",adminRouter)
app.use(morgan("dev"))
let PORT="4500"

mongoose.connect("mongodb://localhost:27017/")
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
})
app.listen(PORT,()=>console.log(`server starting this number ${PORT}`))