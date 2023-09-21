import express from "express";
import { RegisterDoc,LoginDoc,DoctorLogout,generateNewAccessToken} from "../controllers/doctorcontrollers/doctorAuthController.js";
import { DocterLoginValidationRules, DoctorRegisterRules } from "../validators/doctorValidation-rules.js";
import {doctorAuthmiddleware} from '../config/passport-jwt.js'
import{doctorDetails,updateDetails,updatePassword} from "../controllers/doctorcontrollers/DoctorProfileManagerController.js"
const router=express.Router()


router.route('/register').post(DoctorRegisterRules,RegisterDoc)
router.route('/login').post(DocterLoginValidationRules,LoginDoc)
// router.route('/logout').post(doctorAuthmiddleware,DoctorLogout)
router.route("/regenerate_access_token").post(generateNewAccessToken);


router.route('/details/:id').get(doctorDetails)
router.route('/updateDetails/:id').put(updateDetails)
// router.route('updatePassword/:id').put(updatePassword)



export default router
