import React from "react";

const HomeContent = ({ setCurrentPage }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-gradient-to-b from-green-50 to-transparent py-8 px-6 rounded-2xl">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold text-green-900 mb-6">About Us</h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Sajilo Krishi is a digital platform designed to make agricultural 
            trading simple, transparent, and accessible for farmers and buyers. 
            The main goal of the platform is to reduce the dependency of farmers 
            on middlemen and help them directly connect with potential buyers.
          </p>
          <button onClick={() => setCurrentPage('blank')} className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2">
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-full overflow-hidden" style={{ width: '400px', height: '400px' }}>
              <img
                src="/favicon/logo.png"
                alt="Sajilo Krishi Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2 font-bold text-lg">
            Connecting Farmers Directly to Fair Markets
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-12 mb-16 shadow-lg border-t-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-12">
          Our Impact & Engagement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center border-l-4 border-green-600 hover:shadow-md transition-all">
            <div className="text-5xl font-bold text-green-700 mb-3">0</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Active Farmers</p>
            <p className="text-gray-600 text-sm">Connected to the platform</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center border-l-4 border-blue-600 hover:shadow-md transition-all">
            <div className="text-5xl font-bold text-blue-700 mb-3">0</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Transactions</p>
            <p className="text-gray-600 text-sm">Direct farmer-buyer deals</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 text-center border-l-4 border-amber-600 hover:shadow-md transition-all">
            <div className="text-5xl font-bold text-amber-700 mb-3">0</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Trade Value</p>
            <p className="text-gray-600 text-sm">Processed through platform</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 text-center border-l-4 border-red-600 hover:shadow-md transition-all">
            <div className="text-5xl font-bold text-red-700 mb-3">0</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Middlemen Cut</p>
            <p className="text-gray-600 text-sm">Fair prices achieved</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-2xl p-12 shadow-lg border-t-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-12">
          Our Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <button onClick={() => setCurrentPage('blank')} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border-l-4 border-green-600 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500">
            <div className="text-4xl mb-3">🏢</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Agricultural Organizations</p>
            <p className="text-gray-600 text-sm">Supporting sustainable farming practices</p>
          </button>

          <button onClick={() => setCurrentPage('blank')} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border-l-4 border-green-600 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500">
            <div className="text-4xl mb-3">🏦</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Financial Partners</p>
            <p className="text-gray-600 text-sm">Providing loan support to farmers</p>
          </button>

          <button onClick={() => setCurrentPage('blank')} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border-l-4 border-green-600 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500">
            <div className="text-4xl mb-3">🚚</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Logistics Partners</p>
            <p className="text-gray-600 text-sm">Efficient supply chain management</p>
          </button>

          <button onClick={() => setCurrentPage('blank')} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border-l-4 border-green-600 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-gray-800 text-lg font-semibold mb-2">Educational Partners</p>
            <p className="text-gray-600 text-sm">Training and skill development</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
