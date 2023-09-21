import React from "react";
import UsersLayout from "../../Layout/UsersLayout";
import SpinnerLoader from "../../components/spinner/ApinnerLoader";

const UserLoader=()=>{
    return(
        <UsersLayout>
        <SpinnerLoader/>
        </UsersLayout>
    )
}

export default UserLoader