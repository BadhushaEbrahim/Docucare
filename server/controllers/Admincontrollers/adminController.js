import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../../model/adminSchema.js";
import User from "../../model/UserSchema.js";
import Doctor from "../../model/docterSchema.js";
export const adminlogin=async(req,res)=>{
    try {
        const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }const adminDetails = await Admin.findOne({ email });
    if (adminDetails) {
      const matchPassword = await bcrypt.compare(
        password,
        adminDetails.password
      );
      if (!matchPassword)
        return res
          .status(200)
          .json({ success: false, message: "Admin Password is not matched" });

      const adminToken = await jwt.sign(
        { id: adminDetails._id},
        process.env.ADMIN_JWT_SECRET
      );
    //   token(adminToken);
      res.status(200).json({
        success: true,
        message: "Login success",
        adminToken,
        adminDetails,
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "admin email is not matched" });
    }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error, message: "server error" });

    }
}

export const getAllUsers=async(req ,res)=>{
  try {
    const users=await User.find({Verified:true});
    if(!users){
      return res.status(200).json({message:"no users found"})
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({error})
  }
}

export const getAllDoctors=async(req,res)=>{
  try {
    const doctors=await Doctor.find({isVerified:true});
    if(!doctors){
      return res.status(200).json({message:"no doctors found"})
    }
    res.status(200).json(doctors)
  } catch (err) {
    res.status(400).json({error:err})
  }
};

export const getDoctor=async(req,res)=>{
  try {
    const doctor =await Doctor.findOne({_id:req.params.id})
    res.status(200).json({message:"doctors data sent success",doctor})
  } catch (err) {
    res.status(400).json({error:err})

  }
}


export const blockUser=async(req,res)=>{
  const UserId=req.params.id
  try {
    const user=await User.findOneAndUpdate(
      {_id:UserId},
      {
        isBlocked:true
      }
    );
    res.status(200).json({message:"User is blocked successfully",user,success:true})
  } catch (err) {
    res.status(400).json({error:err})
  }
}

export const unblockUser=async(req,res)=>{
  const UserId=req.params.id
  try {
    const user=await User.findOneAndUpdate(
      {_id:UserId},
      {
        isBlocked:false
      }
    );
    res.status(200).json({message:"User unblocked successfully",success:true,user})
  } catch (err) {
    res.status(400).json({error:err})
  }
}
 export const doctorsRequest=async(req,res)=>{
  try {
    const doctors=await Doctor.find({isVerified:false})
    if (!doctors) {
      return res.status(404).json({message:"no doctor found"})
    }
    res.status(200).json(doctors)
  } catch (err) {
    res.status(400).json({error:err})
  }
 }

 export const getAllCount=async(req,res)=>{
  try {
    const doctorCount = await Doctor.countDocuments({isVerified:true});
    const userCount = await User.countDocuments({Verified:true});

    res.status(200).json({ doctorCount, userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error});
  } }

export const verifyDoctor=async(req,res)=>{
    try {
      const doctor=await Doctor.findOneAndUpdate(
        {_id:req.params.id},
        {
          isVerified:true,
        }
      );
      res.status(200).json({message:"doctor is verified successfully",doctor})
    } catch (err) {
      res.status(400).json({error:err})
    }
  }

  export const removeDoctor = async (req, res) => {
    try {
      const doctor = await Doctor.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ message: "doctor removed successfully", doctor });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  };
  