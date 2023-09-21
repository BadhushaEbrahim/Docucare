import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {loginSchema} from '../../../schemas';
import axios from './../../../utils/axios'; 
import { User_Login } from '../../../utils/ConstUrls';
import { toast,Toaster } from 'react-hot-toast';

export default function Login() {
    const navigate=useNavigate()

    const onSubmit = async (values, actions) => {
      const body = JSON.stringify(values);
        await axios
          .post(User_Login, body, {
            headers: { "Content-Type": "application/json" },
          })
          .then(({ data }) => {
            console.log(data);
            
            if (data.success) {
              toast.success(data.message)
              // document.cookie = `token:${data.userToken}`;
              localStorage.setItem("userToken", data.userToken);
              setTimeout(() => {
                navigate('/');
              }, 2000);
            } else {
              toast.error(data.message);
            }
          })
          .catch((err) => {
            if (err.response.status===500) {
              navigate('/error')
            }
              if (err.response) {
                toast.error(err.response.data.message);
              } else {
                toast.error("An error occurred while making the request.");
              }
          });
      actions.resetForm();
    };


    const formik = useFormik({
      initialValues:{
        email:"",
        password:"",
        },
        validationSchema:loginSchema,
        onSubmit

      })
  return (
   
    <div className='w-full h-screen flex'>
      {/* Smaller Grid for arranging content */}
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto max-w-[600px] md:max-w-[800px] lg:max-w-[900px] px-4'>
        {/* Image Section */}
        <div className='w-full h-[300px] md:h-[500px] hidden md:block'>
          {/* <img className='w-full h-full object-cover' src='https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg?w=740&t=st=1692858326~exp=1692858926~hmac=fee59a34e3bf35e1adcda25cf2968cfa6a8c04713130e7ee9345864f1f80d9d1' alt='Scenic Trees' /> */}
          <img className='w-full h-full object-cover' src='https://res.cloudinary.com/di99qdkb5/image/upload/v1693480099/svg%20animated%20images/medical-prescription-animate_fjelng.svg' alt='Scenic Trees' />
        </div>
        {/* Login Form Section */}
        <div className='p-4 flex flex-col justify-around'>
          <form onSubmit={formik.handleSubmit}>
            <h2 className='text-4xl font-bold text-center mb-6'>Welcome User</h2>
            <div className='mb-3'>
              <input
               id='email'
               name='email'
                className='border p-2 rounded-md w-full'
                type='email'
                placeholder='Email'
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="error">{formik.errors.email}</p>
              )}
            </div>
            <div className='mb-3'>
              <input
                className='border p-2 rounded-md w-full'
                type='password'
                placeholder='Password'
                id='password'
               name='password'
               value={formik.values.password}
               onChange={formik.handleChange}  
               onBlur={formik.handleBlur}
              />
                {formik.errors.password && formik.touched.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </div>
            <button type="submit" className='w-full py-2 bg-customGreen hover:bg text-white rounded-md'>
              Sign In
            </button>
            <p className='text-center mt-3'>
              <a href='#' className='text-blue-600 hover:underline'>
                Forgot Username or Password?
              </a>
            </p>
          </form>
          <p className='text-center mt-6'>
            Don't have an account?{' '}
            <a onClick={()=>{navigate('/user-register')}}className='text-blue-600 hover:underline cursor-pointer'>
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

