import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Toaster,toast } from 'react-hot-toast'
import { ResetPasswordSchema } from '../../../schemas'
import { resetpassword } from '../../../utils/ConstUrls'
import axios from '../../../utils/axios'
import { useParams } from 'react-router-dom'

function ForgetPassword() {
    const{id}=useParams()
    const navigate=useNavigate()

    const onSubmit=async(values,actions)=>{
      const body=JSON.stringify(values)
        try {
            const response =await axios.put(`${resetpassword}/${id}`,body,{
            headers:{"Content-Type":"application/json"}
            })
            console.log(response);
            if(response){
              toast.success(response.data.message)
              setTimeout(() => {
                navigate('/user-login')
              }, 1000);
            }
        } catch (error) {
          console.log(error);
            if(error.response.status==500){
              navigate('/error')
            }

            toast(error.response.data.message)
        }
       
    }
    const {handleBlur,handleChange,handleSubmit,errors,touched,isSubmitting}=useFormik({
        initialValues:{
            newPassword:"",
            confirmPassword:""
        },
        validationSchema:ResetPasswordSchema,
        onSubmit,
    })
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-[900px] px-4">
      <div className="w-full h-[300px] md:h-[500px] hidden md:block">
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/di99qdkb5/image/upload/v1698400091/svg%20animated%20images/Reset_password_nb4ey6.gif"
          alt="Scenic Trees"
        />
      </div>
      <div className="p-4 flex flex-col justify-center bg-white rounded-lg shadow-lg">
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-customGreen text-center mb-6">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm text-gray-700 mb-2">
              Enter your new password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-customGreen focus:border-customGreen"
              placeholder="New Password"
            />
            {errors.newPassword&&touched.newPassword &&(
                <p className='mt-1 text-red-600 text-sm'>{errors.newPassword}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
              Confirm your new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-customGreen focus:border-customGreen"
              placeholder="Confirm Password"
            />
             {errors.confirmPassword&&touched.confirmPassword &&(
                <p className='mt-1 text-red-600 text-sm'>{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-customGreen hover:bg-customGreen text-white rounded-md mb-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "updating....": "update"}
            
          </button>
        </form>
        
        <div className="text-center text-gray-600">
          <p>Don't have an account? <a href="/signup" className="text-customGreen">Sign up</a></p>
          <p>Remember your password? <a href="/login" className="text-customGreen">Log in</a></p>
        </div>
      </div>
    </div>
    <Toaster/>
  </div>
  )
}

export default ForgetPassword