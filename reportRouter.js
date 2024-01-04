import express from "express"
const router=express.Router()
import reportSchema from "./reportSchema.js"
import userSchema from "./userSchema.js";
// const { ObjectId } = require('mongodb');
// import { ObjectId } from "mongodb";


// // get all reports and pastvisit...............
// router.post("/user",async(req,res)=>{

//   try {
//     const RegNo = req.body.RegNo;

//     // Check if the user exists
//     const userExist = await reportSchema.findOne({ RegNo: RegNo });

//     if (!userExist) {
//       // If the user does not exist, return an error
//       return res.status(404).json({ error: "User not found" });
//     }

//     // If the user exists, retrieve their reports
//     const reports = await reportSchema.find({ RegNo: RegNo });

//     if (reports.length > 0) {
//       // If reports exist, return them as an array
//      res.status(200).json({ reports: reports });
//     } else {
//       // If no reports exist, provide a message indicating so
//       res.status(500).json({ user: userExist, message: "No reports found for the user" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// router.post("/join", async (req, res) => {
//   try {
//     // Retrieve all users
//     const users = await userSchema.find();

//     // If no users exist, return an error
//     if (!users || users.length === 0) {
//       return res.status(404).json({ status: "error", message: "No users found" });
//     }

//     // Retrieve reports for all users
//     const reports = await reportSchema.find({ RegNo: { $in: users.map(user => user.RegNo) } });

//     // Return users along with their reports
//     res.status(200).send({ status: "success", users: users, reports: reports });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: "error", message: "Internal Server Error" });
//   }
// });









// final get only reports.........

// router.post("/", async (req, res) => {
//   try {
//     const RegNo = req.body.RegNo;

//     const userExist = await reportSchema.findOne({ RegNo: RegNo });

//     const user = await userSchema.findOne({ RegNo: RegNo });

//     if(user.length>0){
//     res.status(200).json({ status:"success",user: user, reports: reports });

//     }


//     if (!userExist) {
      
//       return res.status(404).json({ error: "User not found" });
//     }

//     const reports = await reportSchema.find({ RegNo: RegNo });

//     if (reports.length > 0) {
//       res.status(200).json({ reports: reports});
//     } else {
//       res.status(500).json({ user: userExist, message: "No reports found for the user" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// user and all user report...........


// router.post("/joindataall", async (req, res) => {
//   try {

//     // Check if the user exists
//     const userExist = await userSchema.find();

//     if (!userExist) {
//       // If the user does not exist, return an error
//       return res.status(404).json({ error: "User not found" });
//     }

//     // If the user exists, retrieve their reports
//     const reports = await reportSchema.find();
    

//     if (reports.length > 0) {
//       // If reports exist, return them as an array
//     res.status(200).json({ status:"success",user: userExist, reports: reports });
//     } else {
//       // If no reports exist, provide a message indicating so
//       res.status(404).json({ status:"success",user: userExist,reports: [], message: "No reports found for the user" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// report joining user and report join data................

router.post("/joindata", async (req, res) => {
  try {
    const RegNo = req.body.RegNo;

    // Check if the user exists
    const userExist = await userSchema.findOne({ RegNo: RegNo });

    if (!userExist) {
      // If the user does not exist, return an error
      return res.status(404).json({ error: "User not found" });
    }

    // If the user exists, retrieve their reports
    const reports = await reportSchema.find({ RegNo: RegNo });
    

    if (reports.length >= 0) {
      // If reports exist, return them as an array
    res.status(200).json({ status:"success",user: userExist, reports: reports||[] });
    console.log(reports) 
  } 
  // else {
  //     // If no reports exist, provide a message indicating so
  //     // res.status(200).json({ user: userExist,reports: reports||[]  });
  //   }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ......todaylist hours.


router.post("/todaylist", async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0,0,0,0);
    console.log(today)
// Set hours, minutes, seconds, and milliseconds to 0 for today's date

    // Fetch users created today
    const users = await userSchema.find({ Created_at: { $gte: today } });

    if (users.length === 0) {
      return res.status(404).json({ status: "success", message: "No users found today" });
    }

    // Fetch reports created today
    const reports = await reportSchema.find({ Created_at: { $gte: today } });

    if (reports.length > 0) {
      // If reports exist, return them along with the users
      res.status(200).json({ status: "success", users: users, reports: reports });
    } else {
      // If no reports exist, provide a message indicating so
      res.status(404).json({ status: "success", users: users, message: "No reports found for the users today" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// this week list.........


// router.post("/thisweeklist", async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Calculate the start of the current week
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() - today.getDay()); // Move to the first day (Sunday) of the current week
//     startOfWeek.setHours(0, 0, 0, 0);

//     // Fetch users created this week
//     const users = await userSchema.find({ Created_at: { $gte: startOfWeek } });

//     if (users.length === 0) {
//       return res.status(404).json({ status: "success", message: "No users found this week" });
//     }

//     // Fetch reports created this week
//     const reports = await reportSchema.find({ Created_at: { $gte: startOfWeek } });

//     if (reports.length > 0) {
//       // If reports exist, return them along with the users
//       res.status(200).json({ status: "success", users: users, reports: reports });
//     } else {
//       // If no reports exist, provide a message indicating so
//       res.status(404).json({ status: "success", users: users, message: "No reports found for the users this week" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// this month.........


router.post("/thismonthlist", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Fetch users created this month
    const users = await userSchema.find({ Created_at: { $gte: startOfMonth } });

    if (users.length === 0) {
      return res.status(404).json({ status: "success", message: "No users found this month" });
    }

    // Fetch reports created this month
    const reports = await reportSchema.find({ Created_at: { $gte: startOfMonth } });

    if (reports.length > 0) {
      // If reports exist, return them along with the users
      res.status(200).json({ status: "success", users: users, reports: reports });
    } else {
      // If no reports exist, provide a message indicating so
      res.status(404).json({ status: "success", users: users, message: "No reports found for the users this month" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// get reports between start date and end date ..............


router.post("/daterange", async (req, res) => {
  try {
    const  start = new Date(req.body.start);
    const  end  = new Date(req.body.end);

    // Validate start and end dates

    // console.log(start)
    // console.log(end)

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Fetch users created within the specified date range
    const users = await userSchema.find({
      Created_at: { $gte: start, $lte: end },
    });
    // console.log(users.length)

    if (users.length === 0) {
      return res.status(404).json({ status: "success", message: "No users found" });
    }


    // Fetch reports created within the specified date range
    const reports = await reportSchema.find({
      Created_at: { $gte: start, $lte: end },
    });
    console.log(reports)

    if (reports.length > 0) {
      // If reports exist, return them along with the users
      res.status(200).json({ status: "success", users: users, reports: reports });
    } else {
      // If no reports exist, provide a message indicating so
      res.status(404).json({
        status: "success",
        users: users,
        message: "No reports found for the users in the specified date range",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






  // create report............. 
  
  router.post("/reportpost", async (req, res) => {
    try {
      const report = await new reportSchema({
        Diagnosis: req.body.Diagnosis,
        Remarks: req.body.Remarks,
        Prescription: req.body.Prescription,
        RegNo: req.body.RegNo,
        followDate:req.body.followDate,
        sos:req.body.sos,
        start:req.body.start,
        end:req.body.end
         // Link the report to a student using studentId
      });
  
      const data = await report.save();
      console.log(data);
      res.status(200).json({status:"success",data:data});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // get data.....
  // router.get('/', async (req, res) => {
  //   try {
  //     // Use req.query to get parameters from the URL or query string
  //     const RegNo = req.body.RegNo;
  
  //     if (!RegNo) {
  //       return res.status(400).json({ error: 'RegNo parameter is required' });
  //     }
  
  //     // Use await with find to get reports based on RegNo from your database
  //     const reports = await reportSchema.find({ RegNo: RegNo });
  
  //     console.log(reports);
  //     res.json(reports);
  //   } catch (error) {
  //     console.error('Error fetching reports:', error.message);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });


  // get final..........

  // router.get('/', async (req, res) => {
  //   try {
  //     // Use req.query to get parameters from the URL or query string
  //     const RegNo = req.body.RegNo;
  
  //     if (!RegNo) {
  //       return res.status(400).json({ error: 'RegNo parameter is required' });
  //     }
  
  //     // Use await with find to get reports based on RegNo from your database
  //     const reports = await reportSchema.find({ RegNo: RegNo });
  //     console.log(reports)
  
  //     // Ensure that the response is always an array
  //     const reportsArray = Array.isArray(reports) ? reports : [reports];
  
  //     console.log(reportsArray);
  //     res.json(reportsArray);
  //   } catch (error) {
  //     console.error('Error fetching reports:', error.message);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });


  // router.get('/report/:regNo', async (req, res) => {
  //   try {
  //     const regNo = req.params.regNo;
  
  //     // Find user based on RegNo
  //     const user = await reportSchema.findOne({ RegNo: regNo });
  
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }
  
  //     // Find reports based on RegNo
  //     const reports = await reportSchema.find({ RegNo: regNo });
  
  //     // Send the response
  //     res.json({ status: 'success', user: user, reports: reports });
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });
  

  

//   joined collection....


// router.get("/getall",async(req,res)=>{
//   // const data=await reportSchema.find({studentId:req.body.studentId})
//   const userId = req.body.studentId;
// const convertedUserId = new ObjectId(userId);

// const userReports = await userSchema.aggregate([
//   {
//     $match: {
//       _id: convertedUserId,
//     },
//   },
//   {
//     $lookup: {
//       from: 'reports', // The name of the reportSchema collection
//       localField: '_id',     // The field from the userSchema collection
//       foreignField: 'studentId', // The field from the reportSchema collection
//       as: 'reports',         
//     },
    
//   },
//   {
//     $project: {
//       _id: 1,
//       name: 1, 
//       RegNo:1,
//       Dept:1,
//       Year:1,// Include other fields from userSchema if needed
//       reports: 1,
//     },
//   },
// ])
//   res.send(userReports)
// })


// router.get('/detail/joineddata', async (req, res) => {
//       const joinedData = await reportSchema.aggregate([
//         {
//           $lookup: {
//             from: 'students', // Use the correct collection name
//             localField: 'studentId',
//             foreignField: '_id',
//             as: 'studentDetails',
//           },
//         },
//       ]).exec();
  
//       res.json(joinedData)
//     })
  export default router