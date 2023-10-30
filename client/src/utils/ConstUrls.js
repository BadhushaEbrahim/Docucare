export const baseUserUrl="http://localhost:3000/api/users"
export const baseDocUrl='http://localhost:3000/api/doctors'
export const baseAdminUrl='http://localhost:3000/api/admin'

//User 
export const User_Login='/login'
export const User_Register='/register'
export const User_Details='/userDetails'
export const Update_User_Details='/updateUserDetails'
export const Verify_UserEmail='/verify-email'
export const  user_get_doc='/getAllDoc'
export const  user_get_docDetails='/getDoc'
export const Update_User_image='/updateUserImage'
export const User_Google_Login='/google-login'
export const User_Profile_Password='/updatePassword'

//doctor
export const DOC_SIGN_UP='/register'
export const DOC_LOGIN='/login'
export const Update_Doc_Profile='/updateDetails'
export const Get_DocDetails='/details'
export const update_Doc_ProfileImage='/updateDocImage'
export const update_Doc_profile_password='/updatePassword'
export const forget_password_verify='/resetpasswordVerify'
export const forget_password_verification='/resetAcountverification'
export const resetpassword='/resetpassword'



//ADMIN
export const ADMIN_LOGIN='/login'
export const User_list='/allUsers'
export const Block_User='/blockUser'
export const UnBlock_User='/unBlockUser'
export const Doctor_requests='/doctorsRequest'
export const Get_Doc='/getDoctor'
export const Get_count='/getCount'
export const Verifiy_Doctor='/verifyDoctor'
export const reject_Doctor='/rejectDoctor'
export const Get_All_Doc='/allDoctors'
