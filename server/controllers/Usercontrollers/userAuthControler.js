import {
  generateAccessToken,
  generateRefreshToken,
} from "../../middlewares/jwtGen.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { deleteToken } from "../../utilities/token.js";
import { transporter } from "../../middlewares/nodemailerConfig.js";
import User from "../../model/User.js";

const RegisterUser = async (req, res) => {
  try {
    const { userName, email, password, number, date } = req.body;
    const newUserDetails = req.body;
    console.log(newUserDetails);
    const existingUser = await User.findOne({ email: email });
    const existingPhone = await User.findOne({ number });
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

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      number,
      date,
    });

    await newUser.save();
    console.log(newUserDetails);
    const Token = await newUser.generateVerificationToken();
    console.log("this is the verification token", Token);

    // Extract the payload from the token
    const tokenParts = Token.split(".");
    const payloadBase64 = tokenParts[1];
    const verificationToken = payloadBase64;
    console.log("this is the Payload token", verificationToken);

    // Now you have the payload, and you can use it to construct the URL
    const url = `${process.env.BASE_URL}verify-email/${verificationToken}`;
    // console.log('this i the Payload token'+verificationToken);
    // const url = `${process.env.BASE_URL}verify-email/:${verificationToken}`

    const mailOption = {
      from: process.env.EMAIL_USERNAME, // Sender's email address
      to: email, // The recipient's email address
      subject: "Verify Account", // The subject of the email
      html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px;">
      <div style="background-color: #0070c9; color: #fff; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
        <h1 style="font-size: 28px; margin: 0;">Welcome to Docucare</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 18px;">Dear Valued User,</p>
        <p style="font-size: 18px;">Thank you for choosing Docucare, your trusted online medical consultation service. To complete your account setup, please verify your email by clicking the button below:</p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #0070c9; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px; margin-top: 20px;">Verify My Account</a>
        <p style="font-size: 18px;">If you didn't create a Docucare account, please disregard this email.</p>
        <p style="font-size: 18px;">Best regards,</p>
        <p style="font-size: 20px; font-weight: bold; color: #0070c9;">The Docucare Team</p>
      </div>
    </div>`,
    };
    // Sending the email
    await transporter.sendMail(mailOption);
    return res.status(201).json({
      message: `Sent a verification email to ${email}`,
      verificationToken,
      MailSend: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Operation failed" });
  }
};
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User is not found please create an acount!" });
    }
    if (existingUser.isBlocked) {
      return res.status(404).json({ message: "User is Blocked By admin!" });
    }
    if (!existingUser.Verified) {
      return res
        .status(404)
        .json({
          message:
            "User is not verified please check your mail to verify or reguster again!",
        });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const { _id, userName } = existingUser;
    console.log(_id, email, userName, process.env.ACCESS_SECERET_KEY);

    const accessToken = await generateAccessToken({
      id: _id,
      email: email,
      userName: userName,
    });

    // const refreshToken =await generateRefreshToken({
    //   id:_id,
    //   email:email,
    //   userName:userName
    // })

    res.status(200).json({
      success: true,
      userName: userName,
      userId: _id,
      userToken: accessToken,
      // UserRefreshToken:refreshToken,
      message: "Login Succesfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "oopssomething went wrong! try again" });
  }
};
const userLogout = async (req, res) => {
  try {
    const { UserRefreshToken, userId } = req.body;
    await deleteToken(UserRefreshToken, userId);
    return res
      .status(200)
      .json({ status: true, message: "User Logged out Successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Operation failed retry" });
  }
};
const generateNewAccessToken = async (req, res) => {
  try {
    const { UserRefreshToken, userId } = req.body;
    console.log(UserRefreshToken, process.env.REFRESH_SECERT_KEY);
    const decoded = jwt.verify(
      UserRefreshToken,
      process.env.REFRESH_SECERT_KEY
    );
    console.log("decoded jwt", decoded, userId);

    const userDetails = await User.findById(userId);
    const { _id, email, userName } = await generateAccessToken({
      id: _id,
      email: email,
      userName: userName,
    });
    res
      .status(200)
      .json({ UserAccessToken: generateNewAccessToken, status: true });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        status: false,
        message: "Refresh token expired. Please Login Again",
      });
    } else {
      console.error("Token Verification Error:", error.message);
      res.status(401).json({
        status: false,
        message: "Refresh Token expired, Please login agin",
      });
    }
  }
};
const UserValidateEmail = async (req, res) => {
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  const { verificationToken } = req.params;
  console.log(verificationToken);

  try {
    if (!verificationToken) {
      return res.status(400).json({
        message: "Missing Token",
      });
    }
    const payload = JSON.parse(
      Buffer.from(verificationToken, "base64").toString("utf-8")
    );

    const user = await User.findById(payload.ID);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    if (user.Verified) {
      return res.status(401).json({
        message: "Account is already verified",
      });
    }

    // Update the user's verification status
    user.Verified = true;
    await user.save();

    console.log("User after update:", user);

    return res.status(200).json({
      message: "Account Verified",
    });
  } catch (err) {
    // Handle token verification errors
    console.error("Token Verification Error:", err);
    return res.status(500).json({
      error: "Token verification failed",
    });
  }
};

export const resetPasswordVerification = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Acount is not found! Enter a valid emailId" });
    }

    const Token = await user.generateVerificationToken();

    // Extracting the payload from the token
    const tokenParts = Token.split(".");
    const payloadBase64 = tokenParts[1];
    const resetPasswordVerificationToken = payloadBase64;
    console.log("this is the Payload token", resetPasswordVerificationToken);

    //creating a url for verifing the user for reseting password with this token
    const ResetVerifyUrl = `${process.env.BASE_URL}Verify-ResetPassord/${resetPasswordVerificationToken}`;
    console.log(
      `This is the url for verifying user for reseting password ${ResetVerifyUrl}`
    );

    const mailOption = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Reset Password Verification",
      html: `
  <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
  <h1 style="color: #0070c9; font-size: 24px;">Docucare Password Reset</h1>
  <p style="color: #555;">Dear Docucare user,</p>
  <p style="color: #555;">We received a request to reset your password. To complete the password reset process, please click the link below:</p>
  <a href="${ResetVerifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0070c9; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Reset Password</a>
  <p style="color: #555;">If you did not request this reset, please disregard this email. Your account's security is important to us.</p>
  <p style="color: #555;">Best regards,</p>
  <p style="color: #0070c9; font-weight: bold;">The Docucare Team</p>
</div>`,
    };
    // Sending the email
    await transporter.sendMail(mailOption);
    return res.status(201).json({
      message: `Check your email for reseting your password`,
      MailSend: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
export const ResetPasswordAccountVerify = async (req, res) => {
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  const { verificationToken } = req.params;
  console.log(verificationToken);

  try {
    if (!verificationToken) {
      return res.status(400).json({
        message: "Missing Token",
      });
    }
    const payload = JSON.parse(
      Buffer.from(verificationToken, "base64").toString("utf-8")
    );

    const user = await User.findById(payload.ID);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    console.log("User after update:", user);

    const userId = payload.ID;
    return res.status(200).json({
      message: "Account Verified",
      userId,
    });
  } catch (err) {
    // Handle token verification errors
    console.error("Token Verification Error:", err);
    return res.status(500).json({
      error: "Token verification failed",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    console.log("came");
    const password = req.body.newPassword;
    console.log(password);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      return res
        .status(200)
        .json({ message: "User password is updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const GoogleAuth = async (req, res) => {
  try {
    const userName = req.body.name;
    const email = req.body.email;
    const profilePic = req.body.imageUrl;

    const user = await User.findOne({ email });
    if (user) {
      const { userName, _id } = user;

      const accessToken = await generateAccessToken({
        id: _id,
        email: email,
        userName: userName,
      });
      console.log("Google login successful", user);
      return res.status(200).json({
        success: true,
        userName: userName,
        userId: _id,
        userToken: accessToken,
        // UserRefreshToken: refreshToken,
        message: "Login Successfully",
      });
    } 
      const newUser = new User({
        userName: userName,
        email: email,
        profilePic: profilePic, // Corrected the profilePic field
        Verified: true,
      });
      await newUser.save();
      console.log("Google login successful", newUser);

      const {_id } = newUser;

      const accessToken = await generateAccessToken({
        id: _id,
        email: email,
        userName: userName,
      });
      return res.status(200).json({
        success: true,
        userName: userName,
        userId: _id,
        userToken: accessToken,
        // UserRefreshToken: refreshToken,
        message: "Login Successfully",
      });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};


export {
  RegisterUser,
  LoginUser,
  userLogout,
  generateNewAccessToken,
  UserValidateEmail,
};
