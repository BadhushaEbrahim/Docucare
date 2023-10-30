import User from "../../model/User.js";
import Doctor from "../../model/docterSchema.js";
import cloudinary from "../../utilities/cloudinary.js";
import {OAuth2Client} from "google-auth-library"
import bcrypt from 'bcrypt'


export const userDetails = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "user data sent successfully", userDetails });
      
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const useDetails = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        userName: req.body.userName,
        email: req.body.email,
        number: req.body.number,
      }
    );
    if (!userDetails) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "user data updated successfully", useDetails });
  } catch (error) {
    res.status(400).json({ error: err });
  }
};

export const getAllDoc = async (req, res) => {
  try {
    const docters = await Doctor.find({ isVerified: true });
    if (!docters) {
      console.log("Doctors not found");
      return res.status(404).json({ message: "Doctors not Found" });
    }
    res.status(200).json({ message: "this is the doc data", docters });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getDoc = async (req, res) => {
  const docID = req.params.id;
  try {
    const docDetails = await Doctor.findOne({ _id: docID });
    if (!docDetails) {
      console.log("Doctor not found");
      return res.status(404).json({ message: "Doctor not Found" });
    }
    return res
      .status(200)
      .json({ message: "this is the docDetais", docDetails });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "an error aquired Error:", error: err });
  }
};

export const updateProfileImage=async(req,res)=>{
  try {
    const result =await cloudinary.uploader.upload(req.file.path)
    const user=await User.findByIdAndUpdate(req.params.id,{
      $set:{
        profilePic:result.secure_url
      }
    });
    const pic =user.profilePic;
    return res .status(200) .json({message:"user image updated successfully",pic})
  } catch (err) {
    console.log(err);
    res.status(400).json({error:err})
  }
}


// export const availability=async(req,res)=>{
//   try {
//     const doctorId=req.body.doctorId
//     const date=req.body.data
//     const time=req.body.time;
//     const userId=req.body.userId
//     const doctor=await Doctor.findById(doctorId)
//   } catch (error) {
    
//   }
// }

export const updatePassword = async (req, res) => {
  try {
    console.log("came");
    const password = req.body.newPassword;
    console.log(password);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set:{
            password: hashedPassword,
          }
          
        }
      );
      return res
        .status(200)
        .json({ message: "User password is updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({message:"Server error",error})
  }
};
