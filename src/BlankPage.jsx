import React from 'react';

const BlankPage = ({ goBack }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-gray-600 text-lg mb-8">This feature is under development.</p>
        <button 
          onClick={goBack}
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default BlankPage;
