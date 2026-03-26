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
import ChatMessenger from './ChatMessenger';
import FarmerDashboard from './FarmerDashboard';
import BuyerDashboard from './BuyerDashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'farmer' or 'buyer'
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginFormMode, setLoginFormMode] = useState(true); // true for login, false for register
  const [products, setProducts] = useState([]); // Global products state

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('userRole');
    if (storedUser && storedRole) {
      setCurrentUser(JSON.parse(storedUser));
      setUserRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

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

  // Add product globally
  const handleAddProduct = (newProduct) => {
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      quantity: parseFloat(newProduct.quantity),
      image: 'https://via.placeholder.com/200?text=' + newProduct.name,
      posted: 'just now',
      buyers: 0
    };
    setProducts([...products, product]);
    return product;
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user) => {
    const role = user?.role || 'farmer';
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentUser(user);
    setShowLoginModal(false);

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);

    // Keep user on home, not auto-dashboard (requested)
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return <HomeContent setCurrentPage={handleNavigate} />;
      case 'farmer-dashboard':
        return <FarmerDashboard setCurrentPage={handleNavigate} products={products} onAddProduct={handleAddProduct} currentUser={currentUser} />;
      case 'buyer-dashboard':
        return <BuyerDashboard setCurrentPage={handleNavigate} />;
      case 'chat':
        return <ChatMessenger setCurrentPage={handleNavigate} userRole={userRole} currentUser={currentUser} />;
      case 'market':
        return <MarketPrices setCurrentPage={handleNavigate} products={products} />;
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
        return isLoggedIn ? <ProfileSection setCurrentPage={handleNavigate} products={products} currentUser={currentUser} /> : <LoginPage onLogin={handleLogin} setCurrentPage={handleNavigate} />;
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
      
      </div>
      
      <Header 
        currentPage={currentPage} 
        setCurrentPage={handleNavigate} 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow overflow-y-auto">
        {renderContent()}
      </main>
      
      <Footer setCurrentPage={handleNavigate} />

      {/* Login Modal - Full Screen */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <button 
              onClick={() => {
                setShowLoginModal(false);
                setLoginFormMode(true);
              }}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
            <LoginPage onLogin={handleLogin} setCurrentPage={handleNavigate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;