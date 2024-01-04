import mongoose from "mongoose";
const registerSchema=mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Dept:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    // studentId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Student', // Use the correct model name
    //   },
    Password:{
        type:String,
        require:true
    },
    Created_at: {
        type: Date,
        default: Date.now, 
      },
      Token: {
        type: String // Add this field to store the JWT token
    },
})

export default mongoose.model("admin",registerSchema)