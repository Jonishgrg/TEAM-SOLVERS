import { useState } from 'react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks for your message! Our team will respond soon.', sender: 'bot' }])
      }, 500)
    }
  }

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Chat with us</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
