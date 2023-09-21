import { generateAccessToken, generateRefreshToken } from "../../middlewares/jwtGen.js";
import UserSchema from "../../model/UserSchema.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { deleteToken } from "../../utilities/token.js";
import {transporter} from '../../middlewares/nodemailerConfig.js'


const RegisterUser = async (req, res) => {
  try {
    const {  
      userName,
      email,
      password,
      number,
      date} = req.body;
    const newUserDetails = req.body;
    console.log(newUserDetails);
    const existingUser = await UserSchema.findOne({ email: email });
    const existingPhone = await UserSchema.findOne({ number});
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email id already exists" });
    }

    if (existingPhone) {
      return res
        .status(409)
        .json({ message: "User with this number is already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    newUserDetails.password = hashedPassword;

    const newUser = new UserSchema({
      userName,
      email,
      password: hashedPassword,
      number,
      date,
    });

    await newUser.save();
    console.log(newUserDetails);
    const Token = await newUser.generateVerificationToken();
    console.log('this is the verification token', Token);
    
    // Extract the payload from the token
  // Extract the payload from the token
const tokenParts = Token.split('.');
const payloadBase64 = tokenParts[1];
const verificationToken = payloadBase64
console.log('this is the Payload token', verificationToken);

// Now you have the payload, and you can use it to construct the URL
const url = `${process.env.BASE_URL}verify-email/${verificationToken}`;

    
    
    // console.log('this i the Payload token'+verificationToken);
    // const url = `${process.env.BASE_URL}verify-email/:${verificationToken}`

    const mailOption=({
      from: process.env.EMAIL_USERNAME, // Sender's email address
      to: email, // The recipient's email address
      subject: 'Verify Account', // The subject of the email
      html: `Click <a href='${url}'>here</a> to confirm your email.`, // The HTML content of the email
    })
    // Sending the email
     await transporter.sendMail(mailOption);
    return res.status(201).json({
      message: `Sent a verification email to ${email}`,verificationToken,MailSend:true
   });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Operation failed" });
  }
};
const LoginUser=async(req,res)=>{
  try {
    const {email,password}=req.body
    const existingUser=await UserSchema.findOne({email:email})

    if(!existingUser){
      return res.status(404).json({message:"User is not found please create an acount!"})
    }
    if(existingUser.isBlocked){
      return res.status(404).json({message:"User is Blocked By admin!"})
    }
    if(!existingUser.Verified){
      return res.status(404).json({message:"User is not verified please check your mail to verify or reguster again!"})
    }
    const passwordMatch=await bcrypt.compare(password, existingUser.password)
    console.log(passwordMatch);
    if(!passwordMatch){
      return res.status(400).json({message:"Password is incorrect"})
    }

    const {_id,userName}=existingUser;
    console.log(_id,email,userName,process.env.ACCESS_SECERET_KEY);

    const accessToken=await generateAccessToken({
      id:_id,
      email:email,
      userName:userName
    })

    const refreshToken =await generateRefreshToken({
      id:_id,
      email:email,
      userName:userName
    })

    res.status(200).json({
      success:true,
      userName:userName,
      userId:_id,
      userToken:accessToken,
      UserRefreshToken:refreshToken,
      message:"Login Succesfully"
    })
  } catch (error) {
    return res.status(400).json({message:"oopssomething went wrong! try again"})
  }
    

    
}
const userLogout=async(req,res)=>{
 try {
 const {UserRefreshToken,userId}=req.body
 await deleteToken(UserRefreshToken,userId)
 return res 
  .status(200)
  .json({status:true,message:"User Logged out Successfully"})


 } catch (error) {
  return res.status(400).json({error:"Operation failed retry"})
 }
}
const generateNewAccessToken=async(req,res)=>{
 try {
  const {UserRefreshToken,userId}=req.body
  console.log(UserRefreshToken,process.env.REFRESH_SECERT_KEY);
  const decoded=jwt.verify(UserRefreshToken,process.env.REFRESH_SECERT_KEY)
  console.log("decoded jwt",decoded,userId);

  const userDetails=await UserSchema.findById(userId);
  const {_id,email,userName}=await generateAccessToken({
    id:_id,
    email:email,
    userName:userName
  })
  res.status(200).json({UserAccessToken:generateNewAccessToken,status:true})
  
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
const UserValidateEmail = async (req, res) => {
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    const { verificationToken } = req.params;
    console.log(verificationToken);

  

    try {
      if (!verificationToken) {
        return res.status(400).json({ 
          message: "Missing Token" 
        });
      }
      const payload = JSON.parse(Buffer.from(verificationToken, 'base64').toString('utf-8'));


      const user = await UserSchema.findById(payload.ID);

      if (!user) {
        return res.status(404).json({ 
          message: "User does not exist" 
        });
      }

      if (user.Verified) {
        return res.status(401).json({
          message: "Account is already verified"
        });
      }

      // Update the user's verification status
      user.Verified = true;
      await user.save();

      console.log('User after update:', user);

      return res.status(200).json({
        message: "Account Verified"
      });
    } catch (err) {
      // Handle token verification errors
      console.error("Token Verification Error:", err);
      return res.status(500).json({ 
        error: "Token verification failed" 
      });
    }
};


export { RegisterUser,LoginUser,userLogout,generateNewAccessToken,UserValidateEmail};

