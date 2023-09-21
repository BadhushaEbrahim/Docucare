import React from 'react';

function ForgotPassword() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-600 to-purple-400">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
          Forgot Password
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address to reset your password.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md border focus:ring focus:ring-purple-300 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <button className="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 transition duration-300">
            Reset Password
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-700">
          Remember your password?{' '}
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
