import express from "express";
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
} from "../controllers/Usercontrollers/userAuthControler.js";
import {
  userDetails,
  updateUserDetails,
  getAllDoc,
  getDoc,
} from "../controllers/Usercontrollers/userControler.js";
import loginRateLimiter from "./../middlewares/Loginratelimiter.js";
import {userVerification} from '../middlewares/userVerification.js'
const router = express.Router();

router.route("/register").post(UserRegisterValidationRules, RegisterUser);
router.route("/verify-email/:verificationToken").get(UserValidateEmail);
router.route("/login").post(UserLoginValidationRules, LoginUser);
router.route("/getAllDoc").get(getAllDoc);
router.route("/getDoc/:id").get(getDoc);

// router.route("/regenerate_access_token").post(generateNewAccessToken);
// router.route('/logout').post(userAuthMiddleware,userLogout);

router.route("/userDetails/:id").get(userVerification,userDetails);
router.route("/updateUserDetails/:id").put(userVerification,updateUserDetails);

export default router;
