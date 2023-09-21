import React from 'react';
import { useFormik } from 'formik';
import {doctorInstance} from '../../utils/axios'
import {DOC_LOGIN} from '../../utils/ConstUrls'
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {loginSchema} from '../../schemas/index'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png'
import '../../pages/users/register/errorStyle.css'

function DoctorLogin() {
  const navigate=useNavigate()


  const onSubmit = async (values, actions) => {
    try {
      
    } catch (error) {
      
    }
    const body = JSON.stringify(values);
      await doctorInstance
        .post(DOC_LOGIN, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            toast.success(data.message)
            // document.cookie = `token:${data.userToken}`;
            localStorage.setItem("doctorToken", data.doctorToken);
            setTimeout(() => {
              navigate('/doctor');
            }, 2000);
          } else {
            console.log(data);
            toast.error(data.message);
          }
        })
        .catch((err) => {
          if (err.response.status===500) {
            navigate('/error')
          }
          console.log(err);
            if (err.response) {
              console.log(err.response);
              toast.error(err.response.data.message);
            } else {
              toast.error("An error occurred while making the request.");
              navigate('/error')
            }
        });
    actions.resetForm();
  };


  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=
  useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:loginSchema,
    onSubmit,

  });

  return (
   
    <div
      className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-xl">
        
      <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
            <img src={logo} alt="Logo" className="w-12 h-12 mx-auto" />
            doctor Login
          </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"className="block text-gray-800">
              Email
            </label>
            < input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name='email'
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-purple-300 focus:outline-none"
              placeholder="Enter your email"
            />
             {
             errors.email && touched.email && (
                <p className="error">{errors.email}</p>
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
            name='password'
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-purple-300 focus:outline-none"
              placeholder="Enter your password"
            />
           {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
          </div>
          <div className="text-right">
            <a href="#" className="text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button type='submit' className="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-2 mt-2">
             
            {/* Add similar buttons for other login options */}
          </div>
        </div>
        <p className="mt-6 text-sm text-center text-gray-700">
          Don't have an account?{' '}
          <Link to='/doctor-register' className="font-medium text-purple-600 hover:underline">Sign up</Link>
        </p>
      </div>
      <Toaster/>
    </div>
  );
}

export default DoctorLogin;
