import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element to be accessible to screen readers

const CustomLogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-container bg-white w-80 mx-auto rounded-lg shadow-lg"
      overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center backdrop-blur-lg backdrop-brightness-125"
    >
      <div className="modal-content p-6 rounded-lg bg-gradient-to-r from-customGreen to-customBlue text-gray-900 relative">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
        <p className="text-gray-700 mb-8">
          Are you sure you want to log out from your account? This action cannot
          be undone.
        </p>
        <div className="modal-buttons flex justify-end space-x-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-red-300"
            onClick={() => {
              onConfirm();
              onRequestClose();
            }}
          >
            Yes, Logout
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-gray-300"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomLogoutModal;
