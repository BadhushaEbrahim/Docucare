import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { user_get_docDetails } from '../../../utils/ConstUrls';
import Userinstance from '../../../utils/axios';

function ViewDoctor() {
  const [doctor, setDoctor] = useState([]);
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    getDoctorDetails();
  }, []);

  const getDoctorDetails = async () => {
    try {
      await Userinstance.get(`${user_get_docDetails}/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          setDoctor(response.data.docDetails);
        })
        .catch((error) => {
          console.log(error);
          navigate('/error');
        });
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  return (
    <section className="text-gray-700 body-font">
        <div  className="container px-5 py-10 mx-auto flex flex-wrap items-center justify-center">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden shadow-lg">
            <img
              alt="Doctor"
              className="object-cover object-center h-full w-full"
              src="https://dummyimage.com/400x400/000/fff"
            />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{doctor.fullName}</h1>
            <p className="text-lg text-gray-900 mb-4">{doctor.specialization}</p>
            <p className="text-lg text-gray-900 mb-4">{doctor.experience}</p>
            <p className="text-lg text-gray-900 mb-4">{doctor.number}</p>
            <div className="flex mt-6">
              <button className="px-8 py-3 text-white bg-indigo-600 border-0 rounded-full hover:bg-indigo-700 text-lg mr-4 transition duration-300 transform hover:scale-105">
                Book Appointment
              </button>
              <button className="px-8 py-3 text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white hover:bg-indigo-600 text-lg transition duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
    </section>
  );
}

export default ViewDoctor;
