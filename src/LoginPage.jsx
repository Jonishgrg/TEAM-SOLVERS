import React, { useState } from 'react';

const LoginPage = ({ onLogin, setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [newsItems] = useState([
    {
      id: 1,
      title: "Global Initiative Aims to Reduce Agricultural Carbon Footprint by 30% by 2030",
      summary: "World leaders and agricultural organizations join forces to combat climate change through sustainable farming practices.",
      date: "March 5, 2025"
    },
    {
      id: 2,
      title: "Drought-Resistant Crop Varieties Show Promising Results Across Asian Markets",
      summary: "New genetically modified seeds have shown 40% higher yields in water-stressed conditions compared to traditional varieties.",
      date: "March 3, 2025"
    },
    {
      id: 3,
      title: "Nepal's Agricultural Exports Grow by 15% Despite Global Market Challenges",
      summary: "Strategic investments in farming technology and market access have strengthened Nepal's position in regional agricultural trade.",
      date: "March 1, 2025"
    }
  ]);

  const quickLinks = [
    { id: 1, title: '📊 Market Prices', category: 'market', description: 'Real-time crop prices' },
    { id: 2, title: '🌾 Seasonal Farming', category: 'techniques', description: 'Planting techniques' },
    { id: 3, title: '💬 Ask Experts', category: 'ask', description: 'Expert guidance' },
    { id: 4, title: '🌦️ Weather', category: 'weather', description: 'Forecasts & alerts' },
    { id: 7, title: '💰 Financial Help', category: 'financial', description: 'Government schemes' },
    { id: 8, title: '👤 My Profile', category: 'profile', description: 'Account settings' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Simulate authentication delay
    setTimeout(() => {
      if (username === 'Happyfarmer' && password === 'Team Solver') {
        // Successful login
        if (onLogin) {
          onLogin();
        } else {
          // For standalone use or demo
          setSuccessMsg('Login successful! Redirecting...');
          setTimeout(() => window.location.href = "/home", 1000);
        }
      } else {
        // Failed login
        setErrorMsg('Invalid username or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Validate form
    if (!fullName || !email || !phone || !username || !password || !farmSize) {
      setErrorMsg('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate registration delay
    setTimeout(() => {
      setSuccessMsg('Registration successful! Please sign in with your credentials.');
      setTimeout(() => {
        setIsLogin(true);
        setFullName('');
        setEmail('');
        setPhone('');
        setUsername('');
        setPassword('');
        setFarmSize('');
      }, 2000);
      setIsLoading(false);
    }, 1500);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setSuccessMsg('');
    setUsername('');
    setPassword('');
    setEmail('');
    setFullName('');
    setPhone('');
    setFarmSize('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              <h1 className="text-xl sm:text-2xl font-bold">Team Solver</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Login/Register Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4 flex justify-center">
                  <img src="/api/placeholder/100/100" alt="AgriTech Logo" className="h-16 sm:h-20 w-16 sm:w-20 rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">
                  {isLogin ? 'Welcome Back' : 'Join Team Solver'}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  {isLogin ? 'Sign in to connect with Nepal\'s farming community' : 'Create an account to get started'}
                </p>
              </div>

              {/* Messages */}
              {errorMsg && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
                  {successMsg}
                </div>
              )}

              {/* Login Form */}
              {isLogin ? (
                <form onSubmit={handleLogin}>
                  <div className="mb-5 sm:mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      required
                    />
                  </div>
                  
                  <div className="mb-5 sm:mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-.672 3.157-1.757 4.243A6 6 0 0121 12a6 6 0 00-6-6 6 6 0 00-4.243 1.757M9 1l3 3m0 0l3-3m-3 3v8" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-0">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-xs sm:text-sm text-green-600 hover:text-green-800 font-medium">
                      Forgot password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-green-700 transition active:scale-95 flex items-center justify-center text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister}>
                  <div className="mb-4 sm:mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      required
                    />
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      required
                    />
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      required
                    />
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="farmSize">
                      Farm Size (hectares)
                    </label>
                    <input
                      id="farmSize"
                      type="number"
                      placeholder="Enter your farm size"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      required
                    />
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regUsername">
                      Username
                    </label>
                    <input
                      id="regUsername"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regPassword">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="regPassword"
                        type={showRegPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showRegPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-.672 3.157-1.757 4.243A6 6 0 0121 12a6 6 0 00-6-6 6 6 0 00-4.243 1.757M9 1l3 3m0 0l3-3m-3 3v8" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-green-700 transition active:scale-95 flex items-center justify-center text-sm sm:text-base mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              )}
              
              {/* Toggle Form */}
              <div className="mt-6 sm:mt-8 text-center border-t border-gray-200 pt-6">
                <p className="text-gray-600 text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={toggleForm}
                    className="text-green-600 hover:text-green-800 font-bold transition hover:underline"
                  >
                    {isLogin ? 'Register Now' : 'Sign In'}
                  </button>
                </p>
              </div>
              
              {/* Demo Credentials */}
              {isLogin && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-center text-xs sm:text-sm text-blue-800">
                    <span className="font-bold">Demo Credentials:</span><br/>
                    Username: <span className="font-medium">Happyfarmer</span><br/>
                    Password: <span className="font-medium">teamsolver</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* News & Quick Links Section */}
        <div className="w-full md:w-1/2 bg-green-50 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            {/* Quick Links */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {quickLinks.map(link => (
                  <div
                    key={link.id}
                    onClick={() => setCurrentPage && setCurrentPage(link.category)}
                    className="bg-white rounded-lg shadow-sm p-3 sm:p-4 text-center hover:shadow-md transition cursor-pointer hover:bg-green-50 transform hover:scale-105"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">{link.title.split(' ')[0]}</div>
                    <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-1 line-clamp-2">
                      {link.title.substring(2)}
                    </h3>
                    <p className="text-xs text-gray-500 hidden sm:block">{link.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* News Section */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Global Farming News</h2>
              <p className="text-gray-600 text-sm mb-4">Stay updated with the latest agricultural trends and innovations</p>
              
              <div className="space-y-4">
                {newsItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="p-4">
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2">{item.title}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2">{item.summary}</p>
                      <a href="#" className="mt-2 inline-block text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium transition">
                        Read more →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Announcement */}
            <div className="bg-green-100 rounded-lg p-4 sm:p-6">
              <h3 className="font-bold text-green-800 mb-2 text-sm sm:text-base">Announcing Team Solver 2.0</h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Our new version includes direct government subsidy connections, 
                marketplace integration, and AI-powered plant identification. 
                {isLogin ? ' Explore these exciting features now!' : ' Log in to explore these exciting features!'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-3 sm:py-4 text-center">
        <p className="text-xs sm:text-sm text-gray-400">&copy; 2025 Team Solver. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;