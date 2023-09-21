import Docterschema from "../../model/docterSchema.js"; // Import the Doctor model
import bcrypt from 'bcrypt'
import {deleteToken} from '../../utilities/token.js'
import {generateAccessToken,generateRefreshToken} from '../../middlewares/jwtGen.js'
export const RegisterDoc = async (req, res) => {
  try {
    console.log('Starting point of the logic code ');
    const {
      fullName,
      password,
      email,
      number,
      dob,
      experience,
      MedicalregisterNo,
      specialization,
    } = req.body;

    console.log('1');

    if (
      !fullName ||
      !password ||
      !email ||
      !number ||
      !dob ||
      !experience ||
      !MedicalregisterNo ||
      !specialization
    ) {
      console.log(2);
      return res.status(401).json({ message: "all fields are required" });
    }

    const doctorDetails = await Docterschema.findOne({ email }); 
    if (doctorDetails) {
      console.log('3');
      return res
        .status(201)
        .json({ success: false, message: "Doctor already Registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('4');
      const newDoctor = await Docterschema.create({
        fullName,
        email,
        password: hashedPassword,
        number,
        dob,
        experience,
        MedicalregisterNo,
        specialization,
      });

      console.log('5');
      return res.status(200).json({
        success: true,
        message: `success account for ${newDoctor.fullName} created`,
      });
    }
  } catch (error) {
    const errorMessage = error.message ;
    console.log(errorMessage);
  res.status(500).json({ status:false,message:"Registration failed try again later!" });
  console.log(error);
  }
};

export const LoginDoc=async(req,res)=>{
try {
  const {email,password}=req.body
  const Doctor=await Docterschema.findOne({email});
  
  if (!Doctor) {
    return res.status(409).json({
      status: false,
      message: "Please Check Credentials. This user doesn't exists",
    });
  }
  // if (Doctor?.isApproved == false) {
  //   return res.status(403).json({
  //     status: false,
  //     message: "Your Application is rejected by the admin",
  //   });
  // }
  //else{
  //   return res.status(403).json({
  //     status: false,
  //     error: "Your Application is accepte by the admin",
  //   });
  // }
  if (Doctor?.isVerified == false) {
    return res.status(403).json({
      status: false,
      message: "Your Application is in verification please try again later",
    });
  }
  // if (Doctor?.isBlocked) {
  //   return res.status(403).json({
  //     status: false,
  //     message: `${Doctor.fullName} is bloocked. Please contact the admin`,
  //   });
  // }
  const PasswordMatch=await bcrypt.compare(password,Doctor.password)
  if (!PasswordMatch) {
    return res.status(401).json({
      status: false,
      message:
        "Invalid  password. Please check your credentials and try again.",
    });
  }
  const {_id,fullName}=Doctor;
  console.log(_id,fullName,email);
  
  const accessToken = await generateAccessToken({
    id: _id,
    email: email,
    name: fullName,
  });
  // const refreshToken = await generateRefreshToken({
  //   id: _id,
  //   email: email,
  //   name: fullName,
  // });
  res.status(200).json({ 
    success:true,
    DoctorName: fullName,
    DoctorId: _id,
    doctorToken: accessToken,
    message: "Login Successfull",
  });
} catch (error) {
  const errorMessage = error.message ;
  console.log(errorMessage);
  res.status(500).json({status:false, error:"Login Failed" });
  console.log(error);
}
}

export const DoctorLogout=async(req,res)=>{
  try {
  const {DocRefreshToken,DoctorId}=req.body
  await deleteToken(DocRefreshToken,DoctorId)
  return res 
   .status(200)
   .json({status:true,message:"User Logged out Successfully"})
 
  } catch (error) {
    const errorMessage = error.message ;
    console.log(errorMessage);
   return res.status(400).json({error:"Operation failed retry"})
  }
}
export const generateNewAccessToken=async(req,res)=>{
  try {
   const {DocRefreshToken,DoctorId}=req.body
   console.log(DocRefreshToken,process.env.REFRESH_SECERT_KEY);
   const decoded=jwt.verify(DocRefreshToken,process.env.REFRESH_SECERT_KEY)
   console.log("decoded jwt",decoded,DoctorId);
 
   const doctorDetails=await Docterschema.findById(DoctorId);
   const {_id,email,fullName}=await generateAccessToken({
     id:_id,
     email:email,
     fullName:fullName
   })
   res.status(200).json({DocAccessToken:generateNewAccessToken,status:true})
   
  } catch (error) {
   if(error.name==="TokenExpiredError"){
     res.status(401).json({
       status:false,
       message:"Refresh token expired. Please Login Again"
     })
   }
   else{
     console.error("Token Verification Error:", error.message);
     res.status(401).json({
       status: false,
       message: "Refresh Token expired, Please login agin",
     });
   
   }
  }
 }
