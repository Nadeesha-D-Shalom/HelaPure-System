import React, { useState, useEffect, useRef } from 'react';
import './LiveChat.css';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! Welcome to HelaPure. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thank you for your message! Our support team will get back to you shortly.",
        "I understand your concern. Let me help you with that.",
        "That's a great question! Here's what I can tell you...",
        "I'm here to help! Could you provide more details?",
        "Thank you for contacting HelaPure. We appreciate your business!",
        "I'll connect you with our specialist team for better assistance."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: randomResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "Track my order",
    "Return policy",
    "Product information",
    "Payment issues",
    "Shipping questions"
  ];

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="live-chat">
      {!isOpen ? (
        <button 
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
        >
          💬 Chat with us
        </button>
      ) : (
        <div className={`chat-widget ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">👨‍💼</div>
              <div className="chat-header-text">
                <h4>HelaPure Support</h4>
                <span className="status online">Online</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button 
                className="minimize-btn"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? '📈' : '📉'}
              </button>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.type}`}
                  >
                    <div className="message-content">
                      <div className="message-text">{message.message}</div>
                      <div className="message-time">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message bot">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-form">
                <div className="chat-input-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                  />
                  <button 
                    type="submit" 
                    className="send-btn"
                    disabled={!newMessage.trim()}
                  >
                    📤
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChat;
