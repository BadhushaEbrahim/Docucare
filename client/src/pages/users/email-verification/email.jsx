import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserInstance from '../../../utils/axios'; // Import your Axios instance for user-related requests
import { Verify_UserEmail } from '../../../utils/ConstUrls';

function EmailVerification() {
  const { verificationToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('pending');

  useEffect(() => {
    // Make an API request to verify the email using the token
    UserInstance.get(`${Verify_UserEmail}/${verificationToken}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setVerificationStatus('success'); // Email verified successfully
        } else if (response.status === 401) {
          setVerificationStatus('Verified'); // Email already verified
        } else {
          setVerificationStatus('error'); // Email verification failed
        }
      })
      .catch((error) => {
        console.error(error);
        setVerificationStatus('error'); // Handle network error
      });
  }, [verificationToken]);

  return (
    <div className="container mx-auto mt-10">
      {verificationStatus === 'pending' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Verifying Email...</p>
          <p>Please wait while we verify your email.</p>
        </div>
      )}

      {verificationStatus === 'success' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Email Verified Successfully!</p>
          <p className="text-green-600">You can now log in to your account.</p>
          <Link to="/user-login" className="text-blue-600">
            Log In
          </Link>
        </div>
      )}

      {verificationStatus === 'error' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Email Verification Failed</p>
          <p className="text-red-600">
            There was an issue verifying your email. Please check the verification link or try again later.
          </p>
          <p>If you continue to face issues, please contact support.</p>
        </div>
      )}

      {verificationStatus === 'Verified' && (
        <div className="text-center">
          <p className="text-2xl font-semibold">Already Verified</p>
          <p className="text-green-600">You can now log in to your account.</p>
          <Link to="/user-login" className="text-blue-600">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmailVerification;
