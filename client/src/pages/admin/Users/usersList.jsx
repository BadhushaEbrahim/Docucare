import React, { useEffect, useState } from 'react'
import { User_list,Block_User,UnBlock_User } from '../../../utils/ConstUrls'
import { adminInstance } from '../../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { toast,Toaster } from 'react-hot-toast'

function usersList() {
    const navigate = useNavigate()
    const [UsersList, setUsersList] = useState([])
    const [blockUser, setblockUser] = useState(false)
    const adminToken = localStorage.getItem("adminToken")
    const getUserDetails = async () => {
        try {
            const response = await adminInstance.get(User_list, {
                headers: { Authorization: `Bearer ${adminToken}` }
            })
            console.log(response);
            setUsersList(response.data); // Update the state with response data
        } catch (error) {
            console.error("Error fetching user details:", error);

        }
    };
    const BlockUser = async (id) => {
        try {
          const response = await adminInstance.put(`${Block_User}/${id}`,{},{
            headers: { Authorization: `Bearer ${adminToken}`}
          });
          console.log(response);
          if (response.data.success) {
            setblockUser(true); 
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
    const unBlockUser = async (id) => {
        try {
          const response = await adminInstance.put(`${UnBlock_User}/${id}`,{},{
            headers: { Authorization: `Bearer ${adminToken}`}
          });
          if (response.data.success) {
            setblockUser(false); 
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      
    useEffect(() => {
        getUserDetails();
    }, [blockUser]);


    return (
        <>
        <h1 class="text-3xl font-semibold text-customGreen ml-1">Users List</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">Search</label>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Contact
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {UsersList.map((user, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">
                                {user.userName}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.number}
                            </td>
                            <td className="px-6 py-4">

                                {user.isBlocked ? (
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Blocked
                                    </div>
                                ) : (
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Active
                                    </div>
                                )}
                            </td>
                            <td className='px-6 py-4'>
                                {user.isBlocked ?(
                                    <button onClick={()=>unBlockUser(user._id)} class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    unBlock
                                  </button>
                                ):(
                                <button onClick={()=>BlockUser(user._id)} class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Block
                                </button>
                                )}                    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Toaster/>
        </div>
        </>
    )
}

export default usersList