import React, { useState, useEffect } from 'react';
import { Get_DocDetails, Update_Doc_Profile, update_Doc_profile_password } from '../../../utils/ConstUrls';
import { doctorInstance } from '../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { update_Doc_ProfileImage } from '../../../utils/ConstUrls';
import { toast, Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import { showLoading, hideLoading } from '../../../redux/spinnerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordSchema } from '../../../schemas';
import SpinnerLoader from '../../../components/spinner/SpinnerLoader';

// Your doctorDetailsUpdateSchema definition
import { doctorDetailsUpdateSchema } from '../../../schemas';

function EditDocProfile() {
  const [profileData, setProfileData] = useState({
    fullName: '',
    specialization: '',
    email: '',
    number: '',
    dob: '',
    experience: '',
    profilePic: '',
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const doctorToken = localStorage.getItem('doctorToken');
  const decode = jwtDecode(doctorToken);
  const [profilePicture, setProfilePicture] = useState(null);
  const loading = useSelector((state) => state.spinner.loading);
  const dispatch = useDispatch();
  const [ButtonLoading, setButtonLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  useEffect(() => {
    getDocDetails();
  }, [updateSuccess]);

  const getDocDetails = async () => {
    try {
      const response = await doctorInstance.get(`${Get_DocDetails}/${params.doctorId}`, {
        headers: { Authorization: `Bearer ${doctorToken}` },
      });
      setProfileData(response.data.doctorDetails);
    } catch (err) {
      console.error(err);
    }
  };

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

  const { touched, errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fullName: profileData.fullName,
      experience: profileData.experience,
      number: profileData.number,
    },
    enableReinitialize: true,
    validationSchema: doctorDetailsUpdateSchema,
    onSubmit: async (values, actions) => {
      dispatch(showLoading())
      try {
        const response = await doctorInstance.put(
          `${Update_Doc_Profile}/${decode.id}`,
          values,
          {
            headers: { Authorization: `Bearer ${doctorToken}` },
          }
        );
        if (response.data) {
          dispatch(hideLoading())
          setUpdateSuccess(true);
          toast.success('Profile updated successfully');
        } else {
          toast.error('Oops, something went wrong');
        }
      } catch (err) {
        navigate('/error');
      }
      actions.resetForm();
    },
  });

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!profilePicture) {
      return toast.error('Please select an image');
    }
    const formData = new FormData();
    formData.append('image', profilePicture);
    setButtonLoading(true);
    try {
      await doctorInstance.put(`${update_Doc_ProfileImage}/${decode.id}`, formData, {
        headers: { Authorization: `Bearer ${doctorToken}` },
      });
      setButtonLoading(false);
      toast.success('Image updated successfully');
      setUpdateSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error('Oops, something went wrong');
    }
  };


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
          const response = await doctorInstance.put(
            `${update_Doc_profile_password}/${decode.id}`,
            values,
            {
              headers: { Authorization: `Bearer ${doctorToken}` },
            }
          );
          console.log(response);
          if (response.data) {
            toast.success('Password updated successfully');
          } else {
            toast.error('Oops, something went wrong');
          }
        } catch (err) {
          toast.error('Oops, something went wrong');
        }
        actions.resetForm();
  
    },
  });
  


  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h2>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div>
          <form onSubmit={handleImageSubmit}>
            <div className="flex items-center justify-center mr-20 pr-10 mb-8">
              <div className="relative pr-15">
                <img
                  src={profileData.profilePic}
                  id="imagePreview"
                  className="w-36 h-36 rounded-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => document.getElementById('profileImage').click()}
                />
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-bg-opacity duration-300 ease-in-out"
                >
                  <i className="fas fa-camera text-white"></i>
                  <input
                    accept="image/*"
                    type="file"
                    name="file"
                    id="profileImage"
                    onChange={handleImagePreview}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              {ButtonLoading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 hover-bg-blue-800 focus-outline-none focus-ring-4 focus-ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800 ml-5"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50.5908 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  uploading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover-bg-blue-800 focus-outline-none focus-ring-4 focus-ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800 ml-5"
                >
                  Upload
                </button>
              )}
            </div>
          </form>

          <form className="mb-8" onSubmit={handleSubmit}>
            {/* Profile Information */}
            <div className="grid grid-cols-1 sm-grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                  Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-style"
                  required
                />
                {touched.fullName && errors.fullName ? (
                  <div className="text-red-500 text-sm">{errors.fullName}</div>
                ) : null}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone:
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-style"
                  required
                />
                {touched.number && errors.number ? (
                  <div className="text-red-500 text-sm">{errors.number}</div>
                ) : null}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                  Experience:
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-style"
                  required
                />
                {touched.experience && errors.experience ? (
                  <div className="text-red-500 text-sm">{errors.experience}</div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 mt-2 hover-bg-blue-700 text-white font-medium py-2 px-4 rounded-full hover-shadow-lg transition duration-300 ease-in-out"
            >
              Update Profile
            </button>
          </form>

          {/* Password Update */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Change Password</h2>
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
                className="input-style"
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
                onBlur={form2HandleBlur}
                className="input-style"
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
      <Toaster />
    </div>
  );
}

export default EditDocProfile;
