import React, { useEffect, useState } from 'react';
import { Update_User_Details, User_Details, Update_User_image, User_Profile_Password } from '../../../utils/ConstUrls';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import axios from '../../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { userDetailsUpdateSchema } from '../../../schemas';
import SpinnerLoader from '../../../components/spinner/SpinnerLoader';
import { showLoading, hideLoading } from '../../../redux/spinnerSlice';
import {changePasswordSchema} from '../../../schemas/index'

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    number: '',
    profilePic: '',
    password: ''
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const hasPassword=userDetails.password;
  const [state, setstate] = useState('');
  const token = localStorage.getItem('userToken');
  const decode = jwtDecode(token);
  const navigate = useNavigate();
  const loading = useSelector((state) => state.spinner.loading);
  const dispatch = useDispatch();

  //Image preview handler
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('imagePreview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values, actions) => {
    try {
      dispatch(showLoading());
      const userDetailsResponse = await axios.put(`${Update_User_Details}/${decode.id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(userDetailsResponse.data);
      setstate(userDetailsResponse.data)
      toast.success('Updated successfully');
    } catch (error) {
      console.error(error);
      navigate('/error');
    } finally {
      dispatch(hideLoading());
    }
  };

  const getUserDetails = async () => {
    try {
      const userDetailsResponse = await axios.get(`${User_Details}/${decode.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(userDetailsResponse.data.userDetails);
      console.log(userDetailsResponse.data.userDetails);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        navigate('/error');
      }
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!profilePicture) {
      return toast.error('Please select an image');
    }
    const formData = new FormData();
    formData.append('image', profilePicture);
    try {
      await axios.put(`${Update_User_image}/${decode.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Image updated successfully');
      setstate(Date.now());
    } catch (err) {
      console.error(err);
      toast.error('Oops, something went wrong');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [state]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      userName: userDetails.userName,
      email: userDetails.email,
      number: userDetails.number,
    },
    enableReinitialize: true,
    validationSchema: userDetailsUpdateSchema,
    onSubmit,
  });

  const {
    values: form2Values,
    errors: form2Errors,
    touched: form2Touched,
    handleChange: form2HandleChange,
    handleBlur: form2HandleBlur,
    handleSubmit: form2HandleSubmit,
  } = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, actions) => {
        try {
          console.log("update password");
          console.log(values);
          
          const response = await axios.put(
            `${User_Profile_Password}/${decode.id}`,
            values,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          console.log(response,'resss');
          if (response.data) {
            toast.success('Password updated successfully');
          } else {
            console.log("haiii");
            toast.error('Oops, something went wrong');
          }
        } catch (err) {
          console.log(err);
          toast.error('Oops, something went wrong');
        }
        actions.resetForm();
  
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mb-5">
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
          <form onSubmit={handleImageSubmit}>
            <div className="flex items-center justify-center mb-8">
              <div className="relative mr-4">
                <label
                  htmlFor="profileImage"
                  className="block w-36 h-36 rounded-full overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <img
                    id="imagePreview"
                    src={userDetails.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onClick={() => document.getElementById('profileImage').click()}
                  />
                  <input
                    accept="image/*"
                    type="file"
                    name="file"
                    id="profileImage"
                    onChange={handleImagePreview}
                    style={{ display: 'none' }}

                  />
                </label>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-bg-opacity duration-300 ease-in-out"
                >
                  <i className="fas fa-camera text-white"></i>
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload
              </button>
            </div>
          </form>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                Name
              </label>
              <input
                className="form-input rounded-md border-gray-300"
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter Your name"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && touched.userName && <p className="error">{errors.userName}</p>}
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
              {errors.email && touched.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
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
              {errors.number && touched.number && <p className="error">{errors.number}</p>}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Save Profile
              </button>
            </div>
          </form>
         {hasPassword&&(
            <div className="mt-4 cursor-pointer text-blue-600">
            <span onClick={() => setShowPasswordSection(!showPasswordSection)}>Update Password</span>
          </div>
         )} 
        

          {showPasswordSection && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form className="mb-8" onSubmit={form2HandleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new Password"
                value={form2Values.newPassword}
                onChange={form2HandleChange}
                onBlur={form2HandleBlur}
                className="form-input rounded-md border-gray-300"

                required
              />
              {form2Errors.newPassword && form2Touched.newPassword && (
                <p className="error">{form2Errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={form2Values.confirmNewPassword}
                onChange={form2HandleChange}
                className="form-input rounded-md border-gray-300"
                onBlur={form2HandleBlur}
                required
              />
              {form2Errors.confirmNewPassword && form2Touched.confirmNewPassword && (
                <p className="error">{form2Errors.confirmNewPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full hover-shadow-lg transition duration-300 ease-in-out"
            >
              Change Password
            </button>
          </form>
            </div>
          )}
        </>
      )}
      <Toaster />
    </div>
  );
};

export default EditProfile;
