import { useState } from 'react'

export default function Header({ currentPage, onNavigate, isLoggedIn, currentUser, onLogout }) {
  const [showMenu, setShowMenu] = useState(false)

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'prices', label: 'Market Prices' },
    { id: 'techniques', label: 'Farming Tips' },
    { id: 'weather', label: 'Weather' },
    { id: 'experts', label: 'Ask Experts' },
    { id: 'pest', label: 'Pest & Disease' },
    { id: 'financial', label: 'Financial Help' },
  ]

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="https://via.placeholder.com/50" alt="Logo" />
          <h1>Agro-Connect</h1>
        </div>

        <nav className="nav">
          {pages.map(page => (
            <button
              key={page.id}
              className={`nav-btn ${currentPage === page.id ? 'active' : ''}`}
              onClick={() => onNavigate(page.id)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className="auth-buttons">
          {!isLoggedIn ? (
            <button className="btn-login" onClick={() => onNavigate('login')}>
              Login
            </button>
          ) : (
            <>
              <button className="btn-profile" onClick={() => onNavigate('profile')}>
                {currentUser}
              </button>
              <button className="btn-logout" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
