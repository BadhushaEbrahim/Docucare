import express from "express";
import { isBlocked } from "../utilities/authorize.js";
import {
  UserRegisterValidationRules,
  UserLoginValidationRules,
} from "./../validators/Uservalidation-rule.js";
import {
  RegisterUser,
  LoginUser,
  userLogout,
  generateNewAccessToken,
  UserValidateEmail,
  resetPasswordVerification,
  ResetPasswordAccountVerify,
  resetPassword
} from "../controllers/Usercontrollers/userAuthControler.js";
import {
  userDetails,
  updateUserDetails,
  getAllDoc,
  getDoc,
  updateProfileImage,
  UserGoogleLoginAuth,
  updatePassword
} from "../controllers/Usercontrollers/userControler.js";
import loginRateLimiter from "./../middlewares/Loginratelimiter.js";
import {userVerification} from '../middlewares/userVerification.js'
import upload from "../utilities/multer.js";
const router = express.Router();

router.route("/register").post(UserRegisterValidationRules, RegisterUser);
router.route("/verify-email/:verificationToken").get(UserValidateEmail);
router.route("/login").post(UserLoginValidationRules, LoginUser);
router.route("/GoogleAuth").post(UserGoogleLoginAuth)
router.route("/getAllDoc").get(getAllDoc);
router.route("/getDoc/:id").get(getDoc);
router.route("/availability",)

router.route('/updatePassword/:id').put(updatePassword)
router.route('/resetpasswordVerify').post(resetPasswordVerification)
router.route('/resetAcountverification/:verificationToken').get(ResetPasswordAccountVerify)
router.route('/resetpassword/:id').put(resetPassword)

// router.route("/regenerate_access_token").post(generateNewAccessToken);
// router.route('/logout').post(userAuthMiddleware,userLogout);

router.route("/userDetails/:id").get(userVerification,userDetails);
router.route("/updateUserDetails/:id").put(userVerification,updateUserDetails);
router.route("/updateUserImage/:id").put(userVerification,upload.single('image'),updateProfileImage)



export default router;
