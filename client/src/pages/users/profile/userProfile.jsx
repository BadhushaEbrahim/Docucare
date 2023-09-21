import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from '../../../utils/axios';
import { useState,useEffect } from 'react';
import {User_Details} from '../../../utils/ConstUrls'

const ProfileCard = () => {
    const navigate=useNavigate();
    const token =localStorage.getItem("userToken")
    const decode=jwtDecode(token)
    const [UserDetails, setUserDetails] = useState("")
   
    useEffect(() => {
        getUserDetails();
      }, []);

  
      const getUserDetails = async () => {
        await axios
          .get(`${User_Details}/${decode.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response)
            setUserDetails(response.data.userDetails);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status===500) {
              navigate('/error')
            }
          });
      };
    
    
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6 mt-6">
      <div className="p-4">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360&t=st=1694166086~exp=1694166686~hmac=df857f22d4d44959529c9b23e4a06142bf0c708c136051632b7f517cbc7d7d13"
          alt="Profile Picture"
        />
        <h1 className="text-2xl text-center font-semibold mt-2">{UserDetails.userName}</h1>
        <p className="text-gray-600 text-center">{UserDetails.date}</p>
        <p className="text-gray-600 text-center">{UserDetails.email}</p>
        <p className="text-gray-600 text-center">{UserDetails.number}</p>
      </div>
      <div className="p-4">
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>navigate('/editprofile')}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
