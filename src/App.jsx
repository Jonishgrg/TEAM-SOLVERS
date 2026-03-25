import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Header from './Header';
import Footer from './Footer';
import HomeContent from './HomeContent';
import MarketPrices from './MarketPrices';
import SeasonalFarming from './SeasonalFarming';
import AskExperts from './AskExperts';
import WeatherForecast from './WeatherForecast';
import PlantIdentification from './PlantIdentification';
import FinancialHelp from './FinancialHelp';
import ProfileSection from './ProfileSection';
import LoadingScreen from './LoadingScreen';
import PricingPage from './PricingPage';
import BlankPage from './BlankPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [loginFormMode, setLoginFormMode] = useState(true); // true for login, false for register

  // Handle page navigation with history tracking
  const handleNavigate = (page) => {
    if (page !== currentPage) {
      setPreviousPage(currentPage);
    }
    setCurrentPage(page);
  };

  // Go back to previous page
  const goBack = () => {
    setCurrentPage(previousPage);
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    
    // Show ad popup 5 seconds after login
    setTimeout(() => {
      setShowAd(true);
    }, 5000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return <HomeContent setCurrentPage={handleNavigate} />;
      case 'market':
        return <MarketPrices setCurrentPage={handleNavigate} />;
      case 'techniques':
        return <SeasonalFarming setCurrentPage={handleNavigate} />;
      case 'ask':
        return <AskExperts setCurrentPage={handleNavigate} />;
      case 'weather':
        return <WeatherForecast setCurrentPage={handleNavigate} />;
      case 'identify':
        return <PlantIdentification setCurrentPage={handleNavigate} />;
      case 'financial':
        return <FinancialHelp setCurrentPage={handleNavigate} />;
      case 'profile':
        return isLoggedIn ? <ProfileSection setCurrentPage={handleNavigate} /> : <LoginPage onLogin={handleLogin} setCurrentPage={handleNavigate} />;
      case 'blank':
        return <BlankPage goBack={goBack} />;
      default:
        return <HomeContent setCurrentPage={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isLoading && <LoadingScreen />}
      
      {/* Header Banner */}
      <div className="bg-green-700 text-white py-2 text-center text-sm">
        Financial help this nav redirects to the page where Government Schemes & Agricultural Loan Assistance
      </div>
      
      <Header 
        currentPage={currentPage} 
        setCurrentPage={handleNavigate} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow overflow-y-auto">
        {renderContent()}
      </main>
      
      <Footer setCurrentPage={handleNavigate} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">
                  {loginFormMode ? 'Sign In' : 'Create Account'}
                </h2>
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginFormMode(true);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                {loginFormMode 
                  ? 'Sign in to access premium features and personalized content.'
                  : 'Create an account to get started with Team Solver'
                }
              </p>
              <LoginForm 
                onLogin={handleLogin}
                initialMode={loginFormMode}
                onModeChange={setLoginFormMode}
              />
            </div>
          </div>
        </div>
      )}

      {/* Advertisement Popup */}
      {showAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full overflow-hidden relative">
            <button 
              onClick={() => setShowAd(false)}
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="p-2">
              <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 text-center">
                <h3 className="text-xl font-bold">SPECIAL OFFER</h3>
                <p>For Nepali Farmers</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src="/api/placeholder/300/150" alt="Agricultural Equipment" className="rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  30% OFF Modern Farming Equipment
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Exclusive discount on drip irrigation systems and agricultural tools! Available for all Team Solver premium members.
                </p>
                <div className="flex flex-col space-y-2">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700">
                    Learn More
                  </button>
                  <button 
                    className="text-green-600 hover:text-green-800 py-2 px-4 font-medium"
                    onClick={() => setShowAd(false)}
                  >
                    No Thanks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Login Form Component
const LoginForm = ({ onLogin, initialMode = true, onModeChange }) => {
  const [isLoginMode, setIsLoginMode] = useState(initialMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  useEffect(() => {
    setIsLoginMode(initialMode);
  }, [initialMode]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Simulate authentication
    setTimeout(() => {
      if (username === 'Happyfarmer' && password === 'teamSrk') {
        setSuccess('Login successful!');
        setTimeout(() => onLogin(), 500);
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!fullName || !email || !phone || !username || !password || !farmSize) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setSuccess('Registration successful! Switching to sign in...');
      setTimeout(() => {
        setIsLoginMode(true);
        if (onModeChange) onModeChange(true);
        setFullName('');
        setEmail('');
        setPhone('');
        setUsername('');
        setPassword('');
        setFarmSize('');
        setSuccess('');
      }, 1500);
      setIsLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    const newMode = !isLoginMode;
    setIsLoginMode(newMode);
    if (onModeChange) onModeChange(newMode);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setEmail('');
    setFullName('');
    setPhone('');
    setFarmSize('');
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
          {success}
        </div>
      )}

      {isLoginMode ? (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-password">Password</label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-10"
                placeholder="Enter your password"
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
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-green-600 hover:text-green-800">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition active:scale-95 flex items-center justify-center text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
          
          <div className="mt-6 text-center border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-green-600 hover:text-green-800 font-bold transition hover:underline"
              >
                Register Now
              </button>
            </p>
          </div>
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-center text-xs text-blue-800">
              <span className="font-bold">Demo:</span> Sajilo Krishi / Team Solver
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="reg-phone">Phone</label>
            <input
              id="reg-phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="reg-farmSize">Farm Size (hectares)</label>
            <input
              id="reg-farmSize"
              type="number"
              placeholder="Enter farm size"
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="reg-username">Username</label>
            <input
              id="reg-username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="reg-password">Password</label>
            <div className="relative">
              <input
                id="reg-password"
                type={showRegPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-10"
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
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition active:scale-95 flex items-center justify-center text-sm mb-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="mt-4 text-center border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-green-600 hover:text-green-800 font-bold transition hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;