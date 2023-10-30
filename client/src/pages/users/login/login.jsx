import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../../schemas';
import axios from './../../../utils/axios';
import { User_Login } from '../../../utils/ConstUrls';
import { toast, Toaster } from 'react-hot-toast';
import { authWithGoogle } from '../../../../config/firebase';
import { User_Google_Login } from '../../../utils/ConstUrls';


const clientId = import.meta.env.VITE_GoogleClientId;

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    await axios
      .post(User_Login, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("userToken", data.userToken);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate('/error');
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
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });





  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      const user = await authWithGoogle();
      console.log(user.displayName,'ppp');
      const userData = {
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        imageUrl: user.photoURL
      };
      console.log(user);
      console.log(userData);
      console.log("before responsce posting");
      const response = await axios.post(User_Google_Login,userData);
      const data=response.data
      if(response){
        localStorage.setItem("userToken",data.userToken)
        toast.success("Login Successfully")
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }
      console.log(response);
      console.log('after response');
    } catch (err) {
      toast.error('Trouble logging in through Google');
      console.log(err);
    }
  };
  


  return (
      <div className="w-full h-screen flex">
        <div className="grid grid-cols-1 md:grid-cols-2 m-auto max-w-[600px] md:max-w-[800px] lg:max-w-[900px] px-4">
          <div className="w-full h-[300px] md:h-[500px] hidden md:block">
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/di99qdkb5/image/upload/v1693480099/svg%20animated%20images/medical-prescription-animate_fjelng.svg"
              alt="Scenic Trees"
            />
          </div>
          <div className="p-4 flex flex-col justify-around">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-sm mx-auto">
              <h2 className="text-4xl font-bold text-center mb-6">Welcome User</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 p-2 rounded-md w-full focus:ring focus:ring-customGreen focus:border-customGreen"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-1 text-red-600 text-sm">{formik.errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 p-2 rounded-md w-full focus:ring focus:ring-customGreen focus:border-customGreen"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-1 text-red-600 text-sm">{formik.errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-customGreen hover:bg-customGreen text-white rounded-md"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p className="text-center mt-2">
              <a onClick={()=>navigate('/forgetPasswordMailSection')} className="text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </a>
            </p>
            <div className="flex justify-center items-center">
  <button className="w-full py-2 text-[#666] rounded-md text-center bg-white hover:bg-[#6FA3EF] hover:text-white transition duration-300 focus:outline-none shadow-md hover:shadow-lg" onClick={handleGoogleAuth}>
    <span className="flex items-center justify-center gap-2">
      <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google logo" />
      <span className="font-semibold">Sign in with Google</span>
    </span>
  </button>
</div>






            <p className="text-center mt-6">
              Don't have an account?{' '}
              <a onClick={() => navigate('/user-register')} className="text-blue-600 hover:underline cursor-pointer">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <Toaster />
      </div>

  );
}
