import React, { useState } from 'react';

const UnsuccessfulLoginPopup = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${show ? 'visible' : 'invisible'}`}>
      <div className="bg-black p-8 rounded shadow-md max-w-md">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <h1 className="text-white text-2xl font-bold mb-4">Unsuccessful Login</h1>
        <p className="text-white mb-4">The username or password is incorrect.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UnsuccessfulLoginPopup;
