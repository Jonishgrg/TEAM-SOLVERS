import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeContent from './HomeContent'
import MarketPrices from './MarketPrices'
import FarmingTechniques from './FarmingTechniques'
import WeatherForecast from './WeatherForecast'
import AskExperts from './AskExperts'
import PestDisease from './PestDisease'
import FinancialHelp from './FinancialHelp'
import LoginPage from './LoginPage'
import ProfileSection from './ProfileSection'
import ChatWidget from './ChatWidget'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const handleLogin = (username) => {
    setCurrentUser(username)
    setIsLoggedIn(true)
    navigateTo('profile')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    navigateTo('home')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeContent onNavigate={navigateTo} />
      case 'prices':
        return <MarketPrices />
      case 'techniques':
        return <FarmingTechniques />
      case 'weather':
        return <WeatherForecast />
      case 'experts':
        return <AskExperts />
      case 'pest':
        return <PestDisease />
      case 'financial':
        return <FinancialHelp />
      case 'profile':
        return <ProfileSection username={currentUser} onLogout={handleLogout} />
      default:
        return <HomeContent onNavigate={navigateTo} />
    }
  }

  return (
    <>
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {!isLoggedIn && currentPage === 'login' ? (
          <LoginPage onLogin={handleLogin} onBack={() => navigateTo('home')} />
        ) : (
          renderPage()
        )}
      </main>
      <ChatWidget />
      <Footer />
    </>
  )
}

export default App
