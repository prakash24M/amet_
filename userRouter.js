import express from "express"
const router=express.Router()
import userSchema from "./userSchema.js"


// create user only regno..........
// router.post("/post", async (req, res) => {
//     const user = new userSchema({
//       // name:req.body.name,
//       RegNo: req.body.RegNo,
//       // Dept:req.body.Dept,
//       // Year:req.body.Year

//     });
  
//     const userExist = await userSchema.findOne({ RegNo: req.body.RegNo });
  
//     if (!userExist) {
//       res.status(400).json({ status: "error", message: "User already exists", data: userExist });
//     }else{
//       // const data = await user.save();
//       res.json(user)
//       console.log()
//       res.json({ status: "success", data: data });
//     }
//   })


router.post("/usermatch", async (req, res) => {
  try {
    const { RegNo } = req.body;

    // Check if the user already exists
    const userExist = await userSchema.findOne({ RegNo: RegNo });

    if (userExist) {
      // If the user already exists, return success
      return res.status(200).json({ status: "success", message: "User already exists & available", data: userExist });
    } else {
      // If the user does not exist, return an error
      return res.status(400).json({ status: "error", message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Login Match....


router.post("/loginmatch", async (req, res) => {
  try {
    const { name, RegNo } = req.body;

    // Check if the user already exists based on RegNo
    const userExistByRegNo = await userSchema.findOne({ RegNo: RegNo });

    // Check if the user already exists based on name
    const userExistByName = await userSchema.findOne({ name: name });

    if (userExistByRegNo && userExistByName) {
      // If the user exists based on both RegNo and name, return success
      return res.json({ status: "success", message: "User already exists & available ",data: userExistByRegNo });
    } else if (userExistByRegNo) {
      // If the user exists based on RegNo but not on name, return an error
      return res.status(400).json({ status: "error", message: "User exists with a different name" });
    } else if (userExistByName) {
      // If the user exists based on name but not on RegNo, return an error
      return res.status(400).json({ status: "error", message: "User exists with a different RegNo" });
    } else {
      // If the user does not exist, return an error
      return res.status(400).json({ status: "error", message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});






  // create post.....

  router.post("/postuser", async (req, res) => {
    try {
      const { name, RegNo, Dept, Year } = req.body;
  
      // Check if the user already exists
      const userExist = await userSchema.findOne({ RegNo: RegNo });
  
      if (userExist) {
        return res.status(400).json({ status: "error", message: "User already exists", data: userExist });
      }
  
      // Create a new user
      const newUser = new userSchema({
        name: name,
        RegNo: RegNo,
        Dept: Dept,
        Year: Year
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      res.status(200).json({ status: "success", data: savedUser });
      console.log(savedUser)
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  



export default router
