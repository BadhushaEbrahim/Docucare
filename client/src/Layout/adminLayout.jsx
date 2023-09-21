import React from 'react'
import { useState } from 'react';
import Logo from '../assets/logo3.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminLogout } from '../redux/adminSlice'
import { FaHospitalUser,FaUserAlt,FaUserMd } from 'react-icons/fa';
import  {AiFillHome} from 'react-icons/ai'


function adminLayout({ children }) {
   const navigate = useNavigate()
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dispatch = useDispatch()
   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   const adminLogout = () => {
      swal({
         title: "Are you sure want to log out?",
         icon: "warning",
         buttons: ["Cancel", "Yes, log out!"],
         dangerMode: true,
      }).then((isConfirmed) => {
         if (isConfirmed) {
            localStorage.removeItem("adminToken");
            navigate("/admin-login");
            dispatch(setAdminLogout());
         }
      });
   };
   return (
      <>
         <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gra-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start">
                     <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                     </button>
                     <a href="" className="flex ml-2 md:mr-24">
                        <img src={Logo} className="h-9 mr-6" alt="Logo" />
                     </a>
                  </div>

                  {/* right avathar */}
                  <div className="flex items-center justify-end">
                     <div className="flex items-start justify-start relative">
                        <h3 className="mr-4 text-xl text-gray-800 font-semibold">Welcome, Admin</h3>
                        <div className="relative">
                           <button onClick={toggleDropdown} className="focus:outline-none">
                              <img
                                 className="inline-block w-10 h-10 rounded-full ring-2 ring-primary cursor-pointer"
                                 src="https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png"
                                 alt="User Profile"
                              />
                           </button>
                           {isDropdownOpen && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                                 <ul className="py-2">
                                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={adminLogout}>Sign Out</li>
                                 </ul>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </nav>

         <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
         </div>


         <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
               <ul className="space-y-2 font-medium">
 
                  <li>
                     <a
                        onClick={() => navigate('/admin')}
                        className="flex items-center p-1 text-sm text-gray-700 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <AiFillHome className="text-grey-500 w-4 h-4 ml-2 dark:text-gray-400" />
                        <span className="ml-2 text-sm">Dashboard</span>
                     </a>
                  </li>
                  <li>
                     <a
                        onClick={() => navigate('/admin/usersList')}
                        className="flex items-center p-1 text-sm text-gray-700 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <FaUserAlt className="text-grey-500 w-4 h-4 ml-2 dark:text-gray-400" />
                        <span className="ml-2 text-sm">User List</span>
                     </a>
                  </li>
                  <li>
                     <a
                        onClick={() => navigate('/admin/doctorsrequest')}
                        className="flex items-center p-1 text-sm text-gray-700 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <FaHospitalUser className="text-grey-500 w-4 h-4 ml-2 dark:text-gray-400" />
                        <span className="ml-2 text-sm">Doctors Requests</span>
                     </a>
                  </li>

                  <li>
                     <a
                        onClick={() => navigate('/admin/doctorslist')}
                        className="flex items-center p-1 text-sm text-gray-700 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group"
                     >
                        <FaUserMd className="text-grey-500 w-4 h-4 ml-2 dark:text-gray-400" />
                        <span className="ml-2 text-sm">Doctors list</span>
                     </a>
                  </li>



               </ul>
            </div>
         </aside>
         <main >
            <div className="p-4 sm:ml-64">
               <div className="p-4  border-dashed rounded-lg dark:border-gray-700 mt-14">
                  {children}
               </div>
            </div>
         </main>
      </>
   )
}

export default adminLayout