import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
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
  number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  Verified:{
    type:Boolean,
    default:false,
  },
  verificationToken:{
    type:String
  }
  
});

UserSchema.methods.generateVerificationToken = function () {
  const user = this;
  const payload = { ID: user._id };

  // Generate a JWT token with the payload
  const verificationToken = jwt.sign(payload,process.env.ACCESS_SECERET_KEY, { expiresIn: '7d' });

  return verificationToken;
};





const User = mongoose.model("User", UserSchema);
export default User;
