import React, { useEffect, useState } from 'react';
import { FaUser, FaUserMd, FaMoneyBillAlt, FaCalendarAlt } from 'react-icons/fa';
import LineGraph from '../Graph/linegraph';
import { adminInstance } from '../../../utils/axios';
import { Get_count } from '../../../utils/ConstUrls';

function AdminDashboard() {

    const [counts, setCounts] = useState({
      doctorCount: 0,
      userCount: 0,
    });

    useEffect(() => {
      adminInstance
        .get(Get_count)
        .then((response) => {
          console.log(response);
          setCounts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching counts:', error);
        });
    }, []);
  


    return (
      <div className="container card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* User Card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl text-gray-800 font-semibold">
                  Users
                </h2>
                <p className="text-gray-500 text-sm">Total Users</p>
              </div>
              <div className="flex-shrink-0">
                <FaUser className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600" />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl text-green-600 font-bold mt-2">
              {counts.userCount}
            </p>
          </div>
  
          {/* Doctors Card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl text-gray-800 font-semibold">
                  Doctors
                </h2>
                <p className="text-gray-500 text-sm">Total Doctors</p>
              </div>
              <div className="flex-shrink-0">
                <FaUserMd className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600" />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl text-yellow-600 font-bold mt-2">
              {counts.doctorCount }
            </p>
          </div>
  
          {/* Payments Card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl text-gray-800 font-semibold">
                  Payments
                </h2>
                <p className="text-gray-500 text-sm">Total Payments</p>
              </div>
              <div className="flex-shrink-0">
                <FaMoneyBillAlt className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600" />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl text-red-600 font-bold mt-2">
              0000
            </p>
          </div>
  
          {/* Appointments Card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl text-gray-800 font-semibold">
                  Appointments
                </h2>
                <p className="text-gray-500 text-sm">Total Appointments</p>
              </div>
              <div className="flex-shrink-0">
                <FaCalendarAlt className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600" />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl text-blue-600 font-bold mt-2">
              0000
            </p>
          </div>
        </div>
  
        {/* Line Graph Card */}
        <div className="flex justify-center items-center mt-4 ">
          <LineGraph />
        </div>
      </div>
    );
  }
  


export default AdminDashboard;
