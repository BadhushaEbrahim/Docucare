import React, { useEffect, useState } from 'react';
import { Update_User_Details, User_Details } from '../../../utils/ConstUrls'
import { useFormik } from 'formik';
import {Toaster,toast} from 'react-hot-toast';
import axios from '../../../utils/axios';
import { useDispatch } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { userDetailsUpdateSchema } from '../../../schemas';

const EditProfile = () => {
  const [UserDetails, setUserDetails] = useState([])
  const [updatedDetails, setupdatedDetails] = useState('')
  const [showPasswordSection, setShowPasswordSection] = useState(false); 
  const token = localStorage.getItem('userToken')
  const decode = jwtDecode(token)
  const navigate = useNavigate()

  const onSubmit = async (values, actions) => {
    try {
      await axios.put(`${Update_User_Details}/${decode.id}`,values,{
        headers:{Authorization:`Bearer ${token}`},
      }).then((response)=>{
        console.log(response);
        if(response.data){
          setupdatedDetails(response.data)
          toast.success("updated successfully");
  
        }else{
          toast.error("Oops Something went wrong");
        }
      }).catch((error)=>{
        console.log(error);
        navigate('/error')
      })
    } catch (error) {
      console.log(error);
      navigate('/error')
    }

  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({

    initialValues: {
      userName: UserDetails.userName,
      email: UserDetails.email,
      number: UserDetails.number
    },
    enableReinitialize: true,
    validationSchema: userDetailsUpdateSchema,
    onSubmit
  })





  const getUserDetails = async () => {
    try {
      await axios
        .get(`${User_Details}/${decode.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          setUserDetails(response.data.userDetails);
        })
        .catch((error) => {
          console.log(error);
          navigate('/error')
        });
    } catch (error) {
      console.log(error);
      if (err.response.status===500) {
        navigate('/error')
      }
    }
  };

  useEffect(() => {
    getUserDetails()
  }, [updatedDetails])


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mb-5">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="form-input rounded-md border-gray-300"
            type="text"
            id="userName"
            name="userName"
            placeholder=" Enter Your name"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <p className="error">{errors.userName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="form-input rounded-md border-gray-300"
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
            Mobile
          </label>
          <input
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-input rounded-md border-gray-300"
            type="number"
            id="number"
            name="number"
            placeholder="Enter your number"
          />
          {errors.number && touched.number && (
            <p className="error">{errors.number}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <div className="mt-6">
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >
          Save Profile
        </button>
      </div>
      </Form>
      
      {/* Toggle Password Section */}
      <div className="mt-4 cursor-pointer text-blue-600">
        <span onClick={() => setShowPasswordSection(!showPasswordSection)}>
          Update Password
        </span>
      </div>

      {/* Password Section */}
      {showPasswordSection && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                className="form-input rounded-md border-gray-300"
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Current Password"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="form-input rounded-md border-gray-300"
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form-input rounded-md border-gray-300"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
              Update Password
            </button>
          </form>
        </div>
      )}


<Toaster/>
    </div>
  );
};

export default EditProfile;
