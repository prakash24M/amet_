import express from "express"
const router=express.Router()
import userSchema from "./userSchema.js"


// create user..........
router.post("/post", async (req, res) => {
    const user = new userSchema({
      // name:req.body.name,
      RegNo: req.body.RegNo,
      // Dept:req.body.Dept,
      // Year:req.body.Year

    });
  
    const userExist = await userSchema.findOne({ RegNo: req.body.RegNo });
  
    if (!userExist) {
      res.status(400).json({ status: "error", message: "User already exists", data: userExist });
    }else{
      const data = await user.save();
      console.log()
      res.json({ status: "success", data: data });
    }
  })



export default router
