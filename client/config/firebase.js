// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"

const apiKey = import.meta.env.VITE_API_KEy
const messagingSenderId =import.meta.env.VITE_MESSAGE_ID
const appId =import.meta.env.VITE_APIID

const firebaseConfig = {
  apiKey:apiKey ,
  authDomain: "docucare--login.firebaseapp.com",
  projectId: "docucare--login",
  storageBucket: "docucare--login.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
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

