export default function PricingPage() {
  const plans = [
    { name: 'Free', price: 0, features: ['Basic pricing info', 'Limited forecasts'] },
    { name: 'Pro', price: 299, features: ['All features', 'Expert access', 'Priority support'] },
  ]

  return (
    <div className="pricing-page">
      <h1>Pricing Plans</h1>
      <div className="pricing-grid">
        {plans.map((plan, idx) => (
          <div key={idx} className="pricing-card">
            <h2>{plan.name}</h2>
            <p className="price">₹ {plan.price}/month</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="btn-primary">Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
  )
}
