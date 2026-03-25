export default function FarmingTechniques() {
  const techniques = [
    { title: 'Crop Rotation', description: 'Rotate crops to improve soil health and reduce pests' },
    { title: 'Drip Irrigation', description: 'Use drip systems to save water and increase yields' },
    { title: 'Organic Composting', description: 'Make natural fertilizer from organic waste' },
    { title: 'Mulching', description: 'Conserve soil moisture with mulch layers' },
    { title: 'Pest Management', description: 'Integrated pest management techniques' },
    { title: 'Soil Testing', description: 'Test soil regularly for nutrient levels' },
  ]

  return (
    <div className="farming-techniques-page">
      <h1>Farming Techniques</h1>
      <p>Learn modern agricultural practices to improve your yield</p>

      <div className="techniques-grid">
        {techniques.map((tech, idx) => (
          <div key={idx} className="technique-card">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <button className="btn-primary">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  )
}
