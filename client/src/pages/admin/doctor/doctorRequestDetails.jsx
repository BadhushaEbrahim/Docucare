import React, { useEffect, useState } from 'react';
import { Get_Doc, Verifiy_Doctor, reject_Doctor } from '../../../utils/ConstUrls';
import { useNavigate, useParams } from 'react-router-dom';
import { adminInstance } from '../../../utils/axios';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';

function DoctorRequestDetails() {
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

  const handleApprove = (id) => {
    swal({
      title: 'Are you sure want to approve this request?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes, Approve Doc!'],
      dangerMode: true,
    }).then((isConfirmed) => {
      if (isConfirmed) {
        approve(id);
      }
    });
  };

  const handleReject = (id) => {
    swal({
      title: 'Are you sure want to reject this request?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes, Reject Doc!'],
      dangerMode: true,
    }).then((isConfirmed) => {
      if (isConfirmed) {
        reject(id);
      }
    });
  };

  const approve = (id) => {
    adminInstance
      .put(`${Verifiy_Doctor}/${id}`, {}, { headers: { Authorization: `Bearer ${adminToken}` } })
      .then((response) => {
        toast.success(response.data.message);
        navigate('/admin/doctorsrequest');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to approve the request.');
      });
  };

  const reject = (id) => {
    adminInstance
      .put(`${reject_Doctor}/${id}`, {}, { headers: { Authorization: `Bearer ${adminToken}` } })
      .then((response) => {
        toast.success(response.data.message);
        navigate('/admin/doctorsrequest');
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
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => handleApprove(doctor._id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => handleReject(doctor._id)}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorRequestDetails;
