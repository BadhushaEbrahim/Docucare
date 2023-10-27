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
    default:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360&t=st=1694166086~exp=1694166686~hmac=df857f22d4d44959529c9b23e4a06142bf0c708c136051632b7f517cbc7d7d13",
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

  appointments:[
    {
      date:{type:Date,required:true},
      times:[{type:String,required:true}]
    }
  ]
  
});
const Doctor = mongoose.model("Doctor", DocterSchema);
export default Doctor;
