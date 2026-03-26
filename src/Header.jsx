import React, { useState } from 'react';

const Header = ({ currentPage, setCurrentPage, isLoggedIn, userRole, onLogout, onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-cream-100 text-green-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 gap-4">
          <div className="flex-shrink-0 max-w-xs">
            <h1 className="logo" onClick={() => window.location.reload()}>
              <img 
                src="/favicon/text-logo.png" 
                alt="Logo" 
                style={{ height: 'auto', width: '220px', cursor: 'pointer' }} 
                title="Click to refresh"
              />
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 flex-grow justify-center">
            <a 
              href="#" 
              className={`text-sm font-medium transition-all hover:text-green-600 active:scale-95 cursor-pointer ${currentPage === 'home' ? 'font-bold border-b-2 border-green-600 text-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('home');}}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium transition-all hover:text-green-600 active:scale-95 cursor-pointer ${currentPage === 'market' ? 'font-bold border-b-2 border-green-600 text-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('market');}}
            >
              Market Prices
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium transition-all hover:text-green-600 active:scale-95 cursor-pointer ${currentPage === 'techniques' ? 'font-bold border-b-2 border-green-600 text-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('techniques');}}
            >
              Seasonal Farming
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium transition-all hover:text-green-600 active:scale-95 cursor-pointer ${currentPage === 'ask' ? 'font-bold border-b-2 border-green-600 text-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('ask');}}
            >
              Ask
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium transition-all hover:text-green-600 active:scale-95 cursor-pointer ${currentPage === 'weather' ? 'font-bold border-b-2 border-green-600 text-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('weather');}}
            >
              Weather
            </a>
            <a 
              href="#" 
              className={`text-sm font-medium transition-all hover:text-green-600 active:scale-95 cursor-pointer ${currentPage === 'financial' ? 'font-bold border-b-2 border-green-600 text-green-600 pb-1' : ''}`}
              onClick={(e) => {e.preventDefault(); setCurrentPage('financial');}}
            >
              Financial Help
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Sign In / Profile Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  className="p-2 rounded-full text-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 active:scale-90 cursor-pointer"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  👤
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm font-bold text-green-600 border-b border-gray-100">
                        {userRole === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'}
                      </div>
                      {userRole === 'farmer' ? (
                        <>
                          <a 
                            href="#" 
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors cursor-pointer active:bg-green-100 ${currentPage === 'farmer-dashboard' ? 'bg-green-50 font-bold' : ''}`}
                            onClick={(e) => {
                              e.preventDefault(); 
                              setCurrentPage('farmer-dashboard');
                              setShowProfileMenu(false);
                            }}
                          >
                            📦 My Dashboard
                          </a>
                          <a 
                            href="#" 
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors cursor-pointer active:bg-green-100 ${currentPage === 'chat' ? 'bg-green-50 font-bold' : ''}`}
                            onClick={(e) => {
                              e.preventDefault(); 
                              setCurrentPage('chat');
                              setShowProfileMenu(false);
                            }}
                          >
                            💬 Messages
                          </a>
                        </>
                      ) : (
                        <>
                          <a 
                            href="#" 
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer active:bg-blue-100 ${currentPage === 'buyer-dashboard' ? 'bg-blue-50 font-bold' : ''}`}
                            onClick={(e) => {
                              e.preventDefault(); 
                              setCurrentPage('buyer-dashboard');
                              setShowProfileMenu(false);
                            }}
                          >
                            🛒 Browse Products
                          </a>
                          <a 
                            href="#" 
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer active:bg-blue-100 ${currentPage === 'chat' ? 'bg-blue-50 font-bold' : ''}`}
                            onClick={(e) => {
                              e.preventDefault(); 
                              setCurrentPage('chat');
                              setShowProfileMenu(false);
                            }}
                          >
                            💬 Messages
                          </a>
                        </>
                      )}
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors cursor-pointer active:bg-green-100"
                        onClick={(e) => {
                          e.preventDefault(); 
                          setCurrentPage('profile');
                          setShowProfileMenu(false);
                        }}
                      >
                        👤 My Profile
                      </a>
                      <div className="border-t border-gray-100"></div>
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer active:bg-red-100"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                      >
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={onLoginClick}
              >
                Sign In
              </button>
            )}
            
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 active:scale-90 cursor-pointer rounded-lg"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-300">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#" 
                className={currentPage === 'home' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('home'); setIsMobileMenuOpen(false);}}
              >
                Home
              </a>
              {isLoggedIn && (
                <>
                  {userRole === 'farmer' ? (
                    <>
                      <a 
                        href="#" 
                        className={currentPage === 'farmer-dashboard' ? 'font-bold text-green-600' : 'text-green-600 font-medium'}
                        onClick={(e) => {e.preventDefault(); setCurrentPage('farmer-dashboard'); setIsMobileMenuOpen(false);}}
                      >
                        📦 My Dashboard
                      </a>
                      <a 
                        href="#" 
                        className={currentPage === 'chat' ? 'font-bold text-green-600' : 'text-green-600 font-medium'}
                        onClick={(e) => {e.preventDefault(); setCurrentPage('chat'); setIsMobileMenuOpen(false);}}
                      >
                        💬 Messages
                      </a>
                    </>
                  ) : (
                    <>
                      <a 
                        href="#" 
                        className={currentPage === 'buyer-dashboard' ? 'font-bold text-blue-600' : 'text-blue-600 font-medium'}
                        onClick={(e) => {e.preventDefault(); setCurrentPage('buyer-dashboard'); setIsMobileMenuOpen(false);}}
                      >
                        🛒 Browse Products
                      </a>
                      <a 
                        href="#" 
                        className={currentPage === 'chat' ? 'font-bold text-blue-600' : 'text-blue-600 font-medium'}
                        onClick={(e) => {e.preventDefault(); setCurrentPage('chat'); setIsMobileMenuOpen(false);}}
                      >
                        💬 Messages
                      </a>
                    </>
                  )}
                  <div className="border-t border-gray-200"></div>
                </>
              )}
              <a 
                href="#" 
                className={currentPage === 'market' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('market'); setIsMobileMenuOpen(false);}}
              >
                Market Prices
              </a>
              <a 
                href="#" 
                className={currentPage === 'techniques' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('techniques'); setIsMobileMenuOpen(false);}}
              >
                Seasonal Farming
              </a>
              <a 
                href="#" 
                className={currentPage === 'ask' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('ask'); setIsMobileMenuOpen(false);}}
              >
                Ask
              </a>
              <a 
                href="#" 
                className={currentPage === 'weather' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('weather'); setIsMobileMenuOpen(false);}}
              >
                Weather
              </a>
              <a 
                href="#" 
                className={currentPage === 'identify' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('identify'); setIsMobileMenuOpen(false);}}
              >
                Plant ID
              </a>
              <a 
                href="#" 
                className={currentPage === 'financial' ? 'font-bold' : ''}
                onClick={(e) => {e.preventDefault(); setCurrentPage('financial'); setIsMobileMenuOpen(false);}}
              >
                Financial Help
              </a>
              {isLoggedIn ? (
                <a 
                  href="#" 
                  className={currentPage === 'profile' ? 'font-bold' : ''}
                  onClick={(e) => {e.preventDefault(); setCurrentPage('profile'); setIsMobileMenuOpen(false);}}
                >
                  My Profile
                </a>
              ) : (
                <a 
                  href="#" 
                  className="text-green-600 font-medium"
                  onClick={(e) => {e.preventDefault(); onLoginClick(); setIsMobileMenuOpen(false);}}
                >
                  Sign In
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;