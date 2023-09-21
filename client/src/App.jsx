import React from 'react'
import {Outlet} from 'react-router-dom'
// =====================layouts===============================
import DoctorLoyout from './Layout/doctorLoyout'
import UsersLayout from './Layout/UsersLayout'
import AdminLayout from './Layout/adminLayout'


export default function user() {
  return (
    <div>
      <UsersLayout>
      <Outlet/>
      </UsersLayout>
      
    </div>
  )
}

export function Doc(){
   return(
    <DoctorLoyout>
       <Outlet/>
    </DoctorLoyout>
     
   )
}



export function Admin(){
   return(
    <AdminLayout>
      <Outlet/>
    </AdminLayout>
   )
}




