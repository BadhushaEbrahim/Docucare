import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from '../../../utils/axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/spinnerSlice';
import { User_Details } from '../../../utils/ConstUrls';
import SpinnerLoader from '../../../components/spinner/SpinnerLoader';

const ProfileCard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const decode = jwtDecode(token);
  const [UserDetails, setUserDetails] = useState('');
  const loading = useSelector((state) => state.spinner.loading); // Access loading state from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    dispatch(showLoading()); // Show the loader while fetching data
    try {
      const response = await axios.get(`${User_Details}/${decode.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(response.data.userDetails);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        navigate('/error');
      }
    } finally {
      dispatch(hideLoading()); // Hide the loader after data is fetched
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerLoader /> // Show the loader when loading is true
      ) : (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6 mt-6">
          <div className="p-4">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={UserDetails.profilePic}
              alt="Profile Picture"
            />
            <h1 className="text-2xl text-center font-semibold mt-2">{UserDetails.userName}</h1>
            <p className="text-gray-600 text-center">{UserDetails.date}</p>
            <p className="text-gray-600 text-center">{UserDetails.email}</p>
            <p className="text-gray-600 text-center">{UserDetails.number}</p>
          </div>
          <div className="p-4">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigate('/editprofile')}>
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
