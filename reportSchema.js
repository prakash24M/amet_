import mongoose from "mongoose";
const reportSchema=mongoose.Schema({

    Diagnosis:{
        type:String,
        required:true
    },
    Remarks:{
        type:String,
        required:true
    },
    Prescription:{
        type:String,
        required:true
    },
    // studentId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Student', // Use the correct model name
    //   },
    RegNo:{
        type:String,
        require:true
    },
    Created_at: {
        type: Date,
        default: Date.now
      },
      followDate: {
        type: Date,
        default: null,
        get: (val) => val ? val.toISOString().split('T')[0] : null, // get only the date part
        set: (val) => val, // allow setting full date
      },
      sos:{
        type:String,
        default:null
      },
})
const Schema=mongoose.model("report",reportSchema)

export default Schema;