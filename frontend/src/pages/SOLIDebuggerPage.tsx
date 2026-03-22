import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './SOLIDebuggerPage.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SILENCE_RESPONSES = [
  "*Deafening silence*",
  "*Judgmental silence*",
  "*Supportive silence*",
  "*Philosophical silence*",
  "*Eroded silence*",
  "*Stoic silence*"
];

const SOLIDebuggerPage: React.FC = () => {
  const { rock } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "*rock noises*",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking/typing
    setTimeout(() => {
      const randomSilence = SILENCE_RESPONSES[Math.floor(Math.random() * SILENCE_RESPONSES.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomSilence,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="solid-debugger-wrapper">
      <div className="chat-container">
        <header className="chat-header">
          <div className="bot-info">
            <div className="bot-avatar">💎</div>
            <div>
              <h3>SOLIDebugger</h3>
              <span className="status">Always listening (literally)</span>
            </div>
          </div>
        </header>

        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              <div className="avatar">
                {msg.sender === 'bot' ? (
                  <div className="bot-img">🤖</div>
                ) : (
                  <div className="user-img">
                    {rock?.profilePictureUrl ? (
                      <img src={rock.profilePictureUrl} alt="User" />
                    ) : (
                      'U'
                    )}
                  </div>
                )}
              </div>
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-row bot typing">
              <div className="avatar">
                <div className="bot-img">🤖</div>
              </div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )
          }
          <div ref={messagesEndRef} />
        </div>

        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Describe your bug to the infinite silence..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" disabled={isTyping || !inputValue.trim()}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SOLIDebuggerPage;
