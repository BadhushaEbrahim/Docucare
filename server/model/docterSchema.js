import mongoose from "mongoose";

const DocterSchema = mongoose.Schema({
  // doctor:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     required:false
  // },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type:String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },

  MedicalregisterNo: {
    type: Number,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default:false
  },
  
});
const Doctor = mongoose.model("Doctor", DocterSchema);
export default Doctor;
