import React, { useEffect, useState } from 'react';
import { Get_Doc,reject_Doctor } from '../../../utils/ConstUrls';
import { useNavigate, useParams } from 'react-router-dom';
import { adminInstance } from '../../../utils/axios';
import { FaCheckCircle } from 'react-icons/fa'; 
import { Toaster,toast } from 'react-hot-toast';
function DoctorListDetails() {
  const [doctor, setDoctor] = useState({});
  const adminToken = localStorage.getItem('adminToken');
  const params = useParams();
  const navigate = useNavigate();

  const getDoctorDetails = async () => {
    try {
      const response = await adminInstance.get(`${Get_Doc}/${params.doctorId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      console.log(response);
      if (response.data && response.data.doctor) {
        setDoctor(response.data.doctor);
      } else {
        setDoctor({});
      }
    } catch (error) {
      console.error(error);
    }
  };
    const handledelete = (id) => {
    swal({
      title: 'Are you sure want to Unverify Doc?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes, Unverify Doc!'],
      dangerMode: true,
    }).then((isConfirmed) => {
      if (isConfirmed) {
        deleteUser(id);
      }
    });
  };
    const deleteUser = (id) => {
    adminInstance
      .put(`${reject_Doctor}/${id}`, {}, { headers: { Authorization: `Bearer ${adminToken}` } })
      .then((response) => {
        toast.success("doctor has be unverified");
        navigate('/admin/doctorslist');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to reject the request.');
      });
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {doctor.fullName && (
        <div className="main">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {doctor.fullName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {doctor.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Mobile:</span> {doctor.number}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Specialization:</span> {doctor.specialization}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Experience:</span> {doctor.experience} years
          </p>
          <p className="mb-2">
            <span className="font-semibold">Medical Registration Number:</span> {doctor.MedicalregisterNo}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Date of Birth:</span> {doctor.dob}
          </p>

          <div className="space-x-4">
            {doctor.isVerified && (
              <div className="flex items-center text-green-500">
                <FaCheckCircle className="w-4 h-4 mr-2" />
                Verified
            <button 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-5"
              onClick={() => handledelete(doctor._id)}
            >
              UnVerify 
            </button>
              </div>
              
            )}
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  );
}

export default DoctorListDetails;
