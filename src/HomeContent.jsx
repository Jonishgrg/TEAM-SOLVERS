export default function HomeContent({ onNavigate }) {
  const features = [
    { icon: '📊', title: 'Market Prices', description: 'Real-time prices from Kalimati Market' },
    { icon: '🌱', title: 'Farming Tips', description: 'Expert agricultural techniques and guides' },
    { icon: '🌦️', title: 'Weather', description: 'Local weather forecasts and alerts' },
    { icon: '🔬', title: 'Plant ID', description: 'Identify plants and crops easily' },
    { icon: '🐛', title: 'Pest Control', description: 'Solutions for pests and diseases' },
    { icon: '💳', title: 'Financial Help', description: 'Loans and financial assistance programs' },
  ]

  return (
    <div className="home-content">
      <section className="hero">
        <div className="hero-text">
          <h2>What we do</h2>
          <p>Agro-Connect is a digital platform designed to make agricultural trading simple, transparent, and accessible for farmers and buyers. The main goal is to reduce the dependency of farmers on middlemen and help them directly connect with potential buyers.</p>
          <button className="btn-lg" onClick={() => onNavigate('prices')}>Learn More</button>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/400x300" alt="Agriculture" />
          <p>Connecting Farmers Directly to Fair Markets</p>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.title} className="feature-card">
              <h3>{feature.icon} {feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
