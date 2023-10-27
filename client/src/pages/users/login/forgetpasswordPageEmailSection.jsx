import React from 'react'
import {PasswordEmailSchema} from '../../../schemas/index'
import { forget_password_verify } from '../../../utils/ConstUrls'
import axios from '../../../utils/axios'
import { useFormik } from 'formik'
import { json, useNavigate } from 'react-router-dom'
import { Toaster,toast } from 'react-hot-toast'


function forgetpasswordPageEmailSection() { 

  const navigate=useNavigate()

  const onSubmit=async(values,actions)=>{
    try {
      const body =JSON.stringify(values);
      await axios.post(forget_password_verify,body,{
        headers:{"Content-Type":"application/json"}
      })
      .then(({data})=>{
        console.log(data);
        
        if(data.MailSend){
          toast.success(data.message)
          setTimeout(() => {
            navigate('/user-login')
          },1000);
         
        }
      })
    } catch (error) {
      console.log(error);
      const message=error.response.data.message
      toast.error(message)
      if(error.response.status==500){
        navigate('/error')
      }
    }
    actions.resetForm();
  }

  const {handleBlur,handleChange,handleSubmit,isSubmitting,errors,touched}=useFormik({
    initialValues:{
      email:""
    },
    validationSchema:PasswordEmailSchema,
     onSubmit
  })
  return (

    <div className="w-full h-screen flex">
    <div className="grid grid-cols-1 md:grid-cols-2 m-auto max-w-[600px] md:max-w-[800px] lg:max-w-[900px] px-4">
      <div className="w-full h-[300px] md:h-[500px] hidden md:block">
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/di99qdkb5/image/upload/v1698302857/svg%20animated%20images/Forgot_password_h4qvuq.gif"
          alt="Scenic Trees"
        />
      </div>
      <div className="p-4 flex flex-col justify-around">
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-center mb-6">Forget Password</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-small text-grey-800 mb-5">
              Enter your email and we'll send you a link to reset your password
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 p-2 rounded-md w-full focus:ring focus:ring-customGreen focus:border-customGreen"
              placeholder="Enter Your Email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email&&touched.email&&(
              <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
            )}
          </div>
 
          <button
            type="submit"
            className="w-full py-2 bg-customGreen hover:bg-customGreen text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting?"Sending..." :"Send"}
          </button>
        </form>
   

      </div>
    </div>
    <Toaster/>
  </div>
  )
}

export default forgetpasswordPageEmailSection