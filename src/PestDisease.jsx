export default function PestDisease() {
  const solutions = [
    { pest: 'Aphids', solution: 'Use neem oil or insecticidal soap', severity: 'High' },
    { pest: 'Whiteflies', solution: 'Yellow sticky traps and organic sprays', severity: 'Medium' },
    { pest: 'Leaf Miners', solution: 'Remove infested leaves and use treatments', severity: 'Medium' },
    { pest: 'Spider Mites', solution: 'Increase humidity and use sulfur spray', severity: 'High' },
    { pest: 'Early Blight', solution: 'Remove lower leaves, apply fungicide', severity: 'High' },
    { pest: 'Powdery Mildew', solution: 'Baking soda spray or sulfur dust', severity: 'Medium' },
  ]

  return (
    <div className="pest-disease-page">
      <h1>Pest & Disease Management</h1>
      <p>Identify and treat common agricultural pests and diseases</p>

      <div className="solutions-grid">
        {solutions.map((item, idx) => (
          <div key={idx} className="solution-card">
            <h3>🐛 {item.pest}</h3>
            <p className="solution">{item.solution}</p>
            <p className="severity">Severity: <span className={item.severity.toLowerCase()}>{item.severity}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}
