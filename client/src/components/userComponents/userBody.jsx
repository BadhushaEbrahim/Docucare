
import React, { useEffect, useState } from 'react';
import Userinstance from '../../utils/axios';
import { user_get_doc } from '../../utils/ConstUrls';
import { useNavigate } from 'react-router-dom';

function UserBody() {
  const [docDetails, setDocDetails] = useState([]);
  const navigate=useNavigate()
  const userToken=localStorage.getItem('userToken')

  const getDoc = async () => {
    try {
      const response = await Userinstance.get(user_get_doc,{
        headers:{Authorization:`Bearer ${userToken}`}
      });
      console.log(Headers);
      console.log(response);
      const doctorData = response.data.docters
      setDocDetails(doctorData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-2 pt-10 pb-10">
      {docDetails&& docDetails.length > 0 ? (
        docDetails.map((doc, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
             <a>
            <img
              className="rounded-t-lg"
              src="https://img.freepik.com/premium-psd/doctor-with-his-arms-crossed-white-background_1368-22255.jpg?w=360"
              alt=""
            />
          </a>
          <div className="p-5">
            <a >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {doc.fullName}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {doc.specialization}
            </p>
            <a
              onClick={()=>navigate(`/viewDoc/${doc._id}`)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              view more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          </div>
        ))
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
}

export default UserBody;

