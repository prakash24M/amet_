import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    RegNo: {
        type: Number,
        required: true,
    },
    Dept: {
        type: String,
        required: true,
    },
    Year: {
        type: Number,
        required: true,
    },
    Created_at: {
        type: Date,
        default: Date.now,
      },
});

export default mongoose.model('Student', userSchema);