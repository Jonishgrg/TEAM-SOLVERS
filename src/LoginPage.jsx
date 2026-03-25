import { useState } from 'react'

export default function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      onLogin(email.split('@')[0])
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to Agro-Connect</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <button onClick={onBack} className="btn-secondary">Back to Home</button>
      </div>
    </div>
  )
}
