import React from 'react';
import Logo from '../../assets/logo2.png'
import { useFormik } from 'formik'
import { useNavigate, Link } from "react-router-dom"
import '../users/register/errorStyle.css'
import { doctorInstance } from '../../utils/axios'
// import { doctorSignUpSchema } from '../../schemas/index'
import { DOC_SIGN_UP } from "../../utils/ConstUrls"
import { Toaster, toast } from 'react-hot-toast';
import {doctorSignUpSchema} from '../../schemas/index'

function DoctorRegistration() {
  const navigate = useNavigate()

  const options = [
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    {
      value: "Neurologist",
      label: "Neurologist",
    },
    {
      value: "Oncologist",
      label: "Oncologist",
    },
  ];

  const exp = [
    { value: "0-1", label: "0-1" },
    { value: "1-2", label: "1-2" },
    { value: "2-3", label: "2-3" },
    { value: "3-4", label: "3-4" },
    { value: "above 4", label: "above 4" },
  ];
  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    try {
      const response = await doctorInstance.post(DOC_SIGN_UP, body, {
        headers: { "Content-Type": "application/json" },
      });
      
      const responseData = response.data; 
      
      if (responseData.success === true) { 
        toast.success(responseData.message);
        navigate("/doctor-login");
      } else {
        console.log('hiiiiiiiiiiiiiiiiiiiii');
        toast.error(responseData.message);
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        toast.error(err.response.data.message || err.response.data.msg);
      } else {
        toast.error("An error occurred while making the request.");
      }
    }
    actions.resetForm();
  };
  




  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik(
    {
      initialValues: {
        fullName: "",
        email: "",
        dob: "",
        experience: "",
        MedicalregisterNo: "",
        number: "",
        password: "",
        specialization: ""
      },
      onSubmit,
      validationSchema:doctorSignUpSchema

    }
  )
  return (
    <section className="bg-gray-50 dark:bg-gray-900 pt-8 pb-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 ">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white pr-6">
          <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
          Docucare
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Doc account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action='POST'>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                <input type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Full Name"/>
                {errors.fullName && touched.fullName && (
                  <p className="error">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 id="email"
                 type="text"
                 placeholder="Enter your Email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}

              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Date of Birth</label>
                <input
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="dob"
                  id="dob"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Date of Birth"
                />
                {errors.dob && touched.dob && (
                  <p className="error">{errors.dob}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Experience</label>
                <select
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="experience"
                  id="experience"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Experience"
                >
                  {exp.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.experience && touched.experience && (
                  <p className="error">{errors.experience}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your specialization</label>
                <select
                  value={values.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="specialization"
                  id="specialization"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your specialization"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.specialization && touched.specialization && (
                  <p className="error">{errors.specialization}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your MedicalregisterNo</label>
                <input type="number" value={values.MedicalregisterNo} onChange={handleChange}
                  onBlur={handleBlur} name="MedicalregisterNo" id="MedicalregisterNo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your MedicalregisterNo" required="" />
                {errors.MedicalregisterNo && touched.MedicalregisterNo && (
                  <p className="error">{errors.MedicalregisterNo}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Number</label>
                <input type="text" value={values.number} onChange={handleChange}
                  onBlur={handleBlur} name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Number " required="" />
                {errors.number && touched.number && (
                  <p className="error">{errors.number}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" value={values.password} onChange={handleChange}
                  onBlur={handleBlur} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
                )}
              </div>
              {/* <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div> */}
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
export default DoctorRegistration;
