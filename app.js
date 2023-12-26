import express from "express"
import mongoose from "mongoose"
import userRouter from "./userRouter.js"
import reportRouter from "./reportRouter.js"
import cors from 'cors';

const app=express()
app.use(cors())
app.use(express.json())
app.use("/student",userRouter)
app.use("/report",reportRouter)
let PORT="4500"

mongoose.connect("mongodb://127.0.0.1:27017/")
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
})
app.listen(PORT,()=>console.log(`server starting this number ${PORT}`))