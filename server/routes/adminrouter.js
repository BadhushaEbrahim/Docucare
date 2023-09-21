import express from 'express'
const router =express.Router()
import { adminVerification } from '../middlewares/adminVerification.js'
import {adminlogin,getAllUsers,doctorsRequest,getAllDoctors,getDoctor,verifyDoctor,blockUser,unblockUser,getAllCount,removeDoctor} from '../controllers/Admincontrollers/adminController.js'

router.route('/login').post(adminlogin)
router.route("/allUsers").get(adminVerification,getAllUsers),
router.route("/allDoctors").get(adminVerification,getAllDoctors)
router.route("/getDoctor/:id").get(adminVerification,getDoctor)
router.route("/doctorsRequest").get(adminVerification,doctorsRequest)


router.route("/verifyDoctor/:id").put(adminVerification,verifyDoctor)
router.route("/rejectDoctor/:id").put(adminVerification,removeDoctor)
router.route("/blockUser/:id").put(adminVerification,blockUser)
router.route("/unblockUser/:id").put(adminVerification,unblockUser)
router.route("/getCount").get(getAllCount)

export default router;