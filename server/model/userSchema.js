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
  profilePic:{
    type:String,
    default:'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360&t=st=1695991082~exp=1695991682~hmac=5bb778fe970c41b3f6d39869c175a2cb6e28fa1eac374c16974b8fcd9411ba32'
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
  const verificationToken = jwt.sign(payload,process.env.ACCESS_SECERET_KEY, { expiresIn: '10m' });
  return verificationToken;
};





const User = mongoose.model("User", UserSchema);
export default User;
