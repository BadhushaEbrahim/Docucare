import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { useParams, Link } from 'react-router-dom';
import { forget_password_verification } from '../../../utils/ConstUrls';
import { useNavigate } from 'react-router-dom';

function ForgetPasswordVerifying() {
  const {verificationToken} = useParams();
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const navigate=useNavigate()
  const Baseurl=import.meta.env.VITE_BaseUserUrl

  useEffect(() => {
    axios.get(`${forget_password_verification}/${verificationToken}`)
      .then((response) => {
        console.log(response);
        const id=response.data.userId
        if (response.status === 200) {
            setVerificationStatus('success');
            setTimeout(() => {
              const resetPasswordUrl = new URL(`/ResetPasword/${id}`, window.location.origin);
              navigate(resetPasswordUrl.pathname);
            }, 1000)
        } else if (response.status === 404) {
          setVerificationStatus('error');
        } else {
          setVerificationStatus('Verified');
        }
      })
      .catch((error) => {
        console.error(error);
        setVerificationStatus('error');
      });
  }, [verificationToken]);

  return (
    <div className="container mx-auto mt-10">
      {verificationStatus === 'pending' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Verifying Your Account...</p>
          <p>Please wait while we verify your Account.</p>
        </div>
      )}

      {verificationStatus === 'success' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Account Verified Successfully!</p>      
        </div>
      )}

      {verificationStatus === 'error' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Acount Verification Failed</p>
          <p className="text-red-600">
            There was an issue verifying your Account. Please check the verification link or try again later.
          </p>
          <p>If you continue to face issues, please contact support.</p>
          <Link to="/user-login" className="text-blue-600">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}

export default ForgetPasswordVerifying;
