import React, { useState, useEffect } from 'react';
import { RiFileEditFill } from 'react-icons/ri';
import { Get_DocDetails } from '../../../utils/ConstUrls';
import { doctorInstance } from '../../../utils/axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function DoctorProfile() {
  const [DoctorDetails, setDoctorDetails] = useState({});
  const navigate = useNavigate();
  const doctorToken = localStorage.getItem('doctorToken');
  const decode = jwtDecode(doctorToken);

  useEffect(() => {
    getDocDetails();
  }, []);

  const getDocDetails = async () => {
    try {
      const response = await doctorInstance.get(`${Get_DocDetails}/${decode.id}`, {
        headers: { Authorization: `Bearer ${doctorToken}` },
      });
      setDoctorDetails(response.data.doctorDetails);
    } catch (err) {
      navigate('/error');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">{DoctorDetails.fullName}</h2>
          <a href="#" className="text-blue-500 hover:underline hover:text-blue-700" onClick={()=>navigate(`/doctor/edit-profile/${DoctorDetails._id}`)}>
            <i className="fas fa-pencil-alt mr-2"></i>
            <RiFileEditFill />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="md:col-span-1">
            <img
              className="rounded-full w-48 h-48 object-cover object-center mx-auto"
              src="https://img.freepik.com/free-photo/doctor-work_144627-40498.jpg?w=360&t=st=1693907865~exp=1693908465~hmac=e648fa4650db18e2b81c7f8f268e0a5533850790c2b69119142d91d70993907f"
              alt="Doctor's Photo"
            />
          </div>
          <div className="md:col-span-1">
            <ul className="text-lg text-gray-700 list-disc pl-5">
              <li>
                <strong>Specialization:</strong> {DoctorDetails.specialization}
              </li>
              <li>
                <strong>Email:</strong> {DoctorDetails.email}
              </li>
              <li>
                <strong>Phone:</strong> {DoctorDetails.number}
              </li>
              <li>
                <strong>DOB:</strong> {DoctorDetails.dob}
              </li>
              <li>
                <strong>Experience:</strong> {DoctorDetails.experience}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
