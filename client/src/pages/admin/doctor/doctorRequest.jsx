import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Doctor_requests } from '../../../utils/ConstUrls';
import { adminInstance } from '../../../utils/axios';

function DoctorRequest() {
  const navigate = useNavigate();
  const [doctorReq, setDoctorReq] = useState([]);
  const adminToken = localStorage.getItem('adminToken');

  const getDoctorsReq = async () => {
    try {
      const response = await adminInstance.get(Doctor_requests, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      console.log(response);
      setDoctorReq(response.data); // Update the state with response data
    } catch (err) {
      console.log(err);
    }
  };
   
  const viewMore=(id)=>{
    navigate(`/admin/doctorrequestdetails/${id}`)
  }

  useEffect(() => {
    getDoctorsReq();
  }, []);

  return (
    <>
    <h1 className="text-3xl font-semibold text-customGreen ml-1">Doctors Requests</h1>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
      </div>
          {doctorReq&&doctorReq.length>0 ?(
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                     <tr>
                     <th scope="col" className="px-6 py-3">
                       Name
                     </th>
                     <th scope="col" className="px-6 py-3">
                       Email
                     </th>
                     <th scope="col" className="px-6 py-3">
                       Contact
                     </th>
                     <th scope="col" className="px-6 py-3">
                       Specialization
                     </th>
                     <th scope="col" className="px-6 py-3">
                       Action
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   {doctorReq.map((doctor, index) => (
                     <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                       <td className="px-6 py-4">{doctor.fullName}</td>
                       <td className="px-6 py-4">{doctor.email}</td>
                       <td className="px-6 py-4">{doctor.number}</td>
                       <td className="px-6 py-4">{doctor.specialization}</td>
                       <td className="px-6 py-4">
                         <button
                           onClick={()=>viewMore(doctor._id)}
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                         >
                           View More
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
                 </table>
          ):(
            <div className="flex flex-col items-center justify-center p-8">
        
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            <h1 className="text-xl font-semibold text-gray-700 mt-4">
              No Doctors Found
            </h1>
            <p className="text-gray-500">
              There are no doctor requests to display at the moment.
            </p>
          </div>
        )}
                    
 
     
    </div>
    </>
  );
}

export default DoctorRequest;
