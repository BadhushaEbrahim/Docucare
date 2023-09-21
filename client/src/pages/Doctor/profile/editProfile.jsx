import React, { useState, useEffect } from 'react';
import { Get_DocDetails } from '../../../utils/ConstUrls';
import { doctorInstance } from '../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

function EditDocProfile() {
  const [profileData, setProfileData] = useState({
    fullName: '',
    specialization: '',
    email: '',
    number: '',
    dob: '',
    experience: '',
    profilePic: '', // Assuming you have this property for a profile picture
  });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const doctorToken = localStorage.getItem('doctorToken');
  const params = useParams();

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

const {touched,errors,values,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:({
        fullName:profileData.fullName,
        email:profileData.email,
        experience:profileData.experience,
        number:profileData.number
    })
})




  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h2>

        <div>
          {/* Profile Picture */}
          <div className="flex items-center justify-center mr-20 pr-10 mb-8">
            <div className="relative pr-15 mr-20">
              <img
               src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360&t=st=1694166086~exp=1694166686~hmac=df857f22d4d44959529c9b23e4a06142bf0c708c136051632b7f517cbc7d7d13"
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => document.getElementById('profilePic').click()}
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-bg-opacity duration-300 ease-in-out"
              >
                <i className="fas fa-camera text-white"></i>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <form  className="mb-8" onSubmit={handleSubmit} >
            {/* Profile Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-style"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={profileData.email}
                  className="input-style"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone:
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={profileData.number}
                  className="input-style"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={profileData.dob}
                  className="input-style"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                  Experience:
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={profileData.experience}
                  className="input-style"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full hover:shadow-lg transition duration-300 ease-in-out"
            >
              Update Profile
            </button>
          </form>

          {/* Password Update */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Change Password</h2>
          <form className="mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                Current Password:
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
     
                className="input-style"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="input-style"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmNewPassword"
              >
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="input-style"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full hover:shadow-lg transition duration-300 ease-in-out"
            >
              Change Password
            </button>
          </form>
        </div>
    </div>
  );
}

export default EditDocProfile;
