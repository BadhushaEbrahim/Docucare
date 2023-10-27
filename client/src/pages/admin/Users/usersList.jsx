import React, { useEffect, useState } from 'react';
import { User_list, Block_User, UnBlock_User } from '../../../utils/ConstUrls';
import { adminInstance } from '../../../utils/axios';
import swal from 'sweetalert';
import { toast, Toaster } from 'react-hot-toast';

function UsersList() {
    const [usersList, setUsersList] = useState([]);
    const [blockUser, setBlockUser] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState('');
    const adminToken = localStorage.getItem("adminToken");

    const getUserDetails = async () => {
        try {
            const response = await adminInstance.get(User_list, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setUsersList(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const BlockUser = async (id, userName) => {
        setSelectedUsername(userName); 
        swal({
            title: `Are you sure you want to block ${userName}?`,
            icon: "warning",
            buttons: ["Cancel", "Yes, Block!"],
            dangerMode: true,
        }).then(async (isConfirmed) => {
            if (isConfirmed) {
                try {
                    const response = await adminInstance.put(`${Block_User}/${id}`, {}, {
                        headers: { Authorization: `Bearer ${adminToken}` }
                    });
                    if (response.data.success) {
                        setBlockUser(true);
                        toast.error(response.data.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const unblockUser = async (id, userName) => {
        setSelectedUsername(userName); 
        swal({
            title: `Are you sure you want to unblock ${userName}?`,
            icon: "warning",
            buttons: ["Cancel", "Yes, Unblock!"],
            dangerMode: true,
        }).then(async (isConfirmed) => {
            if (isConfirmed) {
                try {
                    const response = await adminInstance.put(`${UnBlock_User}/${id}`, {}, {
                        headers: { Authorization: `Bearer ${adminToken}` }
                    });
                    if (response.data.success) {
                        setBlockUser(false);
                        toast.success(response.data.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    useEffect(() => {
        getUserDetails();
    }, [blockUser]);

    return (
        <div>
            <h1 className="text-3xl font-semibold text-customGreen ml-1">Users List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user, index) => (
                            <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover-bg-gray-600">
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
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Blocked
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Active
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBlocked ? (
                                        <button onClick={() => unblockUser(user._id, user.userName)} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                            Unblock
                                        </button>
                                    ) : (
                                        <button onClick={() => BlockUser(user._id,user.userName)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                            Block
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
}

export default UsersList;
