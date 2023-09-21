import { createBrowserRouter } from 'react-router-dom'
import User, { Doc, Admin } from '../App'
// ============users-Auth-mid=============
import AuthUser from '../protected/user/AuthUser'
import AuthorizeUser from '../protected/user/AthorizeUser'
// ============Users pages================//
import UserHome from '../pages/users/Home/userHome'
import UserLogin from '../pages/users/login/login'
import UserRegister from '../pages/users/register/register'
import ProfileCard from '../pages/users/profile/userProfile'
import EditUserProfile from '../pages/users/profile/editProfile'
import Email from '../pages/users/email-verification/email'
import ViewDoctor from '../pages/users/doctorDetails/ViewDoctor'
//============== doctors-pages==========================
import DoctorLogin from '../pages/Doctor/DoctorLogin'
import DoctorRegistration from '../pages/Doctor/doctorRegister'
import DoctorProfile from '../pages/Doctor/profile/doctorProfile'
import EditDocProfile from '../pages/Doctor/profile/editProfile'
// =============Admin-pages=============================
import Admindashboard from '../pages/admin/dashboard/admindashboard'
import AdminLogin from '../pages/admin/Login/adminLogin'
import UsersList from '../pages/admin/Users/usersList'
import DoctorRequest from '../pages/admin/doctor/doctorRequest'
import DoctorRequestDetails from '../pages/admin/doctor/doctorRequestDetails'
import DoctorList from '../pages/admin/doctor/doctorList'
import DoctorListDetails from '../pages/admin/doctor/doctorListDetails'
// ===========Admin-Auth-Mid===============================
import AdminAuth from '../protected/admin/AuthAdmin'
import AuthorizeAdmin from '../protected/admin/AthorizeAdmin'
// ==============doctor=Auth-mid=======================
import AuthorizeDoctor from '../protected/doctor/AuthorizeDoc'
import DoctorAuth from '../protected/doctor/AuthDoc'
// ================error Page=================
import NotFound from '../pages/NotFound'
import ServerErrorPage from '../pages/ServerErrorPage'




const AppRouter = createBrowserRouter([

    // ==============Users-Routes===========================
    {
        path: '/',
        element: <User />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <UserHome />
            },
            {
                path: '/profile',
                element: <ProfileCard />
            },
            {
                path:'/editprofile',
                element: <EditUserProfile />

            },
            {
                path:'/viewDoc/:doctorId',
                element:<ViewDoctor/>
            }
        ]
    },
    {
        path: '/user-login',
        element: [
            <AuthUser>
                <UserLogin />
            </AuthUser>
        ]
    },
    {
        path: '/user-register',
        element: <UserRegister />
    },
    {   
        path:'/verify-email/:verificationToken',
        element:<Email/>

    },
    {
        path:'/error',
        element:<ServerErrorPage/>
    },


    // ===========doctor-routes=====================
    {
        path: '/doctor',
        element: <Doc />,
        children: [
            {
                path: '/doctor',
                element: [
                 <AuthorizeDoctor>
                <DoctorProfile />
                </AuthorizeDoctor>
            ] 
            },
            {
                path: "/doctor/edit-profile/:doctorId",
                element: [
                <AuthorizeDoctor>
                    <EditDocProfile/>
                </AuthorizeDoctor>]
            }

        ]
    },
    {
        path: '/doctor-login',
        element: [
            <DoctorAuth>
        <DoctorLogin />
            </DoctorAuth>
    ]
    },
    {
        path: '/doctor-register',
        element: <DoctorRegistration />
    },
    // ================Admin========================
    {
        path: '/admin',
        element: [
            <AuthorizeAdmin>
                <Admin />
            </AuthorizeAdmin>
        ],
        children: [
            {
                path: '/admin',
                element: <Admindashboard />
            },
            {
                path: '/admin/usersList',
                element: [
                    <AuthorizeAdmin>
                        <UsersList />
                    </AuthorizeAdmin>
                ]

            },
            {
                path: '/admin/doctorsrequest',
                element: [
                    <AuthorizeAdmin>
                        <DoctorRequest />
                    </AuthorizeAdmin>
                ]
            },
            {
                path: '/admin/doctorrequestdetails/:doctorId',
                element: [
                    <AuthorizeAdmin>
                        <DoctorRequestDetails />
                    </AuthorizeAdmin>
                ]
            },
            {
                path: '/admin/doctorslist',
                element: [
                    <AuthorizeAdmin>
                        <DoctorList />
                    </AuthorizeAdmin>
                ]
            },
            {
                path: '/admin/doctorslistdetails/:doctorId',
                element: [
                    <AuthorizeAdmin>
                        <DoctorListDetails />
                    </AuthorizeAdmin>
                ]
            },
        ]
    },
    {
        path: '/admin-login',
        element: [
            <AdminAuth>
                <AdminLogin />
            </AdminAuth>
        ]

    }

])


export default AppRouter