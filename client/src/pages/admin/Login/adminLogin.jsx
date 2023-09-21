import React from 'react'
import { useNavigate } from 'react-router-dom'
import {adminInstance} from '../../../utils/axios'
import {ADMIN_LOGIN} from '../../../utils/ConstUrls'
import logo from '../../../assets/logo2.png'
import { useFormik } from 'formik'
import { Toaster,toast } from 'react-hot-toast'


function adminLogin() {
 
    const navigate=useNavigate()

    const onSubmit=async(values,action)=>{
      const body =JSON.stringify(values)
      try {
        const response=await adminInstance.post(ADMIN_LOGIN,body,{
          headers:{"Content-Type":"application/json"}
        })
        const responseData=response.data;
         console.log(responseData);
        if(responseData.success===true){
          localStorage.setItem("adminToken", responseData.adminToken);
          toast.success(responseData.message)
          setTimeout(() => {
            navigate("/admin")
          }, 1000);
        }else{
          console.log(responseData);
          toast.error(responseData.message)
        }
      } catch (error) {
        if(error){
          console.log(error);
          toast.error(error)
        }else{
          toast.error("An error occured while making the request")
        }
      }
      action.resetForm()
    }
  
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
      initialValues:{
        email:"",
        password:""
      },
      onSubmit
  
    })
    return (
     
        <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
            <img src={logo} alt="Logo" className="w-12 h-12 mx-auto" />
            Admin Login
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-800">
                Email
              </label>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-purple-300 focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-purple-300 focus:outline-none"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
            >
              Login
            </button>
          </form>
        </div>
        <Toaster />
      </div>
      
    )
  
}

export default adminLogin