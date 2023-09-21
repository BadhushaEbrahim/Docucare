import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import {setAdminLogin} from '../../redux/adminSlice'

export default function AuthorizeAdmin({children}){
    const token =localStorage.getItem("adminToken")
    if(!token){
       
        return <Navigate to={'/admin-login'}/>
    }
    store.dispatch(
        setAdminLogin({
            adminToken:token
        })
    );
    return children
}
