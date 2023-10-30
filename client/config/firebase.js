// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDDncsKBDLT_xWlDOP9ZFEIRMVVMlKM3Y8",
  authDomain: "docucare--login.firebaseapp.com",
  projectId: "docucare--login",
  storageBucket: "docucare--login.appspot.com",
  messagingSenderId: "55503630117",
  appId: "1:55503630117:web:b1850953213e8c5a1774cc",
  measurementId: "G-0Z0TK4QL5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth
const provider=new GoogleAuthProvider();

const auth=getAuth();

export const authWithGoogle= async()=>{

    let user =null;
    await signInWithPopup(auth,provider)
    .then((result)=>{
        user=result.user
    })
    .catch((err)=>{
        console.log(err);
    })
    return user
}

