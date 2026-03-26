import React, { useState, useEffect } from 'react';

const ProfileSection = ({ setCurrentPage, products = [], currentUser: propCurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(propCurrentUser || null);
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    farmSize: '',
    bio: ''
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setFormData(prev => ({
        ...prev,
        fullName: user.username || ''
      }));
    }
    
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save profile data to localStorage
    const updatedUser = {
      ...currentUser,
      ...formData
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const isLoggedIn = !!currentUser;

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login First</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {userRole === 'farmer' ? '🌾' : '🛒'} My Profile
            </h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              ←
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
            {/* Left Section - Profile Picture & Basic Info */}
            <div className="md:w-1/3 bg-gradient-to-b from-green-600 to-green-500 text-white p-6 flex flex-col items-center justify-center min-h-96">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg bg-white flex items-center justify-center text-5xl">
                {userRole === 'farmer' ? '🌾' : '🛒'}
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-1">
                {formData.fullName || 'User'}
              </h2>
              
              <p className="text-green-100 text-sm mb-4 text-center">
                {userRole === 'farmer' ? 'Farmer/Seller' : 'Buyer/Vendor'}
              </p>

              <div className="w-full space-y-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-white text-green-600 font-bold py-2.5 px-4 rounded-lg hover:bg-green-50 transition active:scale-95"
                >
                  {isEditing ? '✕ Cancel' : '✎ Edit Profile'}
                </button>
                
                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-yellow-400 text-gray-800 font-bold py-2.5 px-4 rounded-lg hover:bg-yellow-500 transition active:scale-95"
                  >
                    💾 Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Right Section - Profile Details */}
            <div className="md:w-2/3 p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-6">
                {isEditing ? 'Edit Your Details' : 'Profile Information'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-bold text-gray-700 mb-4 pb-2 border-b-2 border-green-200">
                    📋 Personal Details
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData.fullName || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData.email || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData.phone || 'Not specified'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Farming/Business Information */}
                <div>
                  <h4 className="font-bold text-gray-700 mb-4 pb-2 border-b-2 border-green-200">
                    {userRole === 'farmer' ? '🌾 Farm Details' : '🛒 Business Info'}
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, Region"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData.location || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {userRole === 'farmer' ? 'Farm Size (bigha)' : 'Business Type'}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="farmSize"
                          value={formData.farmSize}
                          onChange={handleInputChange}
                          placeholder={userRole === 'farmer' ? '5.5' : 'Vendor, Distributor'}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData.farmSize || 'Not specified'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself..."
                          rows="2"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {formData.bio || 'No bio added'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-bold text-gray-700 mb-4">🔐 Account Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-600">Username</p>
                    <p className="font-bold text-gray-800">{currentUser.username}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Account Type</p>
                    <p className="font-bold text-gray-800">
                      {userRole === 'farmer' ? '🌾 Farmer/Seller' : '🛒 Buyer/Vendor'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrentPage('chat')}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  💬 Messages
                </button>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition font-medium text-sm"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Listed Products Section */}
          {userRole === 'farmer' && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-700">
                  🌾 Your Listed Products ({products.length})
                </h2>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm"
                >
                  + Add New Product
                </button>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">You haven't listed any products yet</p>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    List Your First Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map(product => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 hover:shadow-md transition">
                      <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {product.image && product.image.startsWith('http') ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-5xl">🌾</div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-gray-800 text-sm mb-1 truncate">{product.name}</h4>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-600 font-bold text-sm">Rs {product.price}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {product.category || 'Produce'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs mb-2">
                          Qty: {product.quantity} {product.unit}
                        </p>
                        <p className="text-gray-500 text-xs mb-3">{product.posted}</p>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600 transition">
                            Edit
                          </button>
                          <button className="flex-1 bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600 transition">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ProfileSection;