import React, { useState, useRef, useEffect } from 'react';

const ChatMessenger = ({ setCurrentPage, userRole, currentUser }) => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Farmer Ahmed',
      role: 'farmer',
      lastMessage: 'What\'s the price of organic potatoes?',
      timestamp: '10:30 AM',
      unread: true,
      messages: [
        { id: 1, sender: 'Farmer Ahmed', text: 'Hi, do you have potatoes?', time: '10:15 AM' },
        { id: 2, sender: 'You', text: 'Yes, I have fresh potatoes', time: '10:20 AM' },
        { id: 3, sender: 'Farmer Ahmed', text: 'What\'s the price of organic potatoes?', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      name: 'Buyer Rajesh',
      role: 'buyer',
      lastMessage: 'Can you deliver tomorrow?',
      timestamp: '9:15 AM',
      unread: false,
      messages: []
    }
  ]);
  
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatRole, setNewChatRole] = useState('farmer');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConv?.messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const updatedConv = {
      ...selectedConv,
      messages: [
        ...selectedConv.messages,
        { 
          id: selectedConv.messages.length + 1, 
          sender: 'You', 
          text: messageText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      lastMessage: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSelectedConv(updatedConv);
    setConversations(conversations.map(c => c.id === selectedConv.id ? updatedConv : c));
    setMessageText('');
  };

  const handleNewChat = () => {
    if (!newChatName.trim()) return;

    const newChat = {
      id: conversations.length + 1,
      name: newChatName,
      role: newChatRole,
      lastMessage: 'No messages yet',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: false,
      messages: []
    };

    setConversations([...conversations, newChat]);
    setSelectedConv(newChat);
    setShowNewChat(false);
    setNewChatName('');
    setNewChatRole('farmer');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentPage('home')}
            className="hover:bg-green-800 p-2 rounded transition"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">💬 Messages</h1>
        </div>
      </div>

      <div className="flex flex-1 max-h-[calc(100vh-80px)]">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex gap-2">
            <button
              onClick={() => setShowNewChat(!showNewChat)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium"
            >
              + New Chat
            </button>
          </div>

          {showNewChat && (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <input
                type="text"
                placeholder="Name or contact"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={newChatRole}
                onChange={(e) => setNewChatRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleNewChat}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm font-medium"
                >
                  Start Chat
                </button>
                <button
                  onClick={() => setShowNewChat(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition hover:bg-gray-50 ${
                  selectedConv.id === conv.id ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                      {conv.unread && <span className="w-2 h-2 bg-green-600 rounded-full"></span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{conv.role === 'farmer' ? '🌾' : '🛒'} {conv.role}</p>
                    <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{conv.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex w-2/3 flex-col bg-white overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-900">{selectedConv.name}</h2>
                <p className="text-sm text-gray-500">{selectedConv.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg transition">📞</button>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition">ℹ️</button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedConv.messages && selectedConv.messages.length > 0 ? (
              selectedConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'You'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-300 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-green-100' : 'text-gray-600'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center">
                  Start a conversation with {selectedConv.name}
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View Message Detail */}
        <div className="flex md:hidden w-full flex-col bg-white overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-900">{selectedConv.name}</h2>
                <p className="text-sm text-gray-500">{selectedConv.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'}</p>
              </div>
              <button onClick={() => setSelectedConv(null)} className="text-xl hover:bg-gray-200 p-2 rounded">
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedConv.messages && selectedConv.messages.length > 0 ? (
              selectedConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'You'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-300 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-green-100' : 'text-gray-600'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center">No messages yet</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessenger;
