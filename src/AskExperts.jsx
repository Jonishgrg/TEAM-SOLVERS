import { useState } from 'react'

export default function AskExperts() {
  const [formData, setFormData] = useState({ name: '', email: '', question: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Question submitted:', formData)
    setFormData({ name: '', email: '', question: '' })
    alert('Your question has been sent!')
  }

  const experts = [
    { name: 'Dr. Ram Kumar', specialty: 'Soil Science' },
    { name: 'Sita Sharma', specialty: 'Crop Management' },
    { name: 'Hari Poudel', specialty: 'Pest Control' },
    { name: 'Maya Joshi', specialty: 'Organic Farming' },
  ]

  return (
    <div className="ask-experts-page">
      <h1>Ask Our Experts</h1>
      <p>Get advice from agricultural experts</p>

      <div className="experts-container">
        <div className="expert-form">
          <h2>Send Your Question</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Your Question..."
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              rows="5"
              required
            ></textarea>
            <button type="submit" className="btn-primary">Send Question</button>
          </form>
        </div>

        <div className="experts-list">
          <h2>Our Experts</h2>
          {experts.map((expert, idx) => (
            <div key={idx} className="expert-card">
              <h3>{expert.name}</h3>
              <p>{expert.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
