import React, { useState, useRef, useEffect } from 'react';
import './ChatPage.css';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const SILENCE_RESPONSES = [
  '*Deafening silence*',
  '*Judgmental silence*',
  '*Supportive silence*',
  '*Philosophical silence*',
  '*Eroded silence*',
  '*Stoic silence*',
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "......",
    },
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

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    // Add User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SILENCE_RESPONSES.length);
      const randomSilence = SILENCE_RESPONSES[randomIndex];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: randomSilence,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        RockGPT
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`avatar ${msg.sender}`}>
              {/* Profile Picture Placeholder. Later replace with <img src={databaseUrl} /> */}
              {msg.sender === 'user' ? 'U' : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.5 1.5c.27 0 .54.01.81.031L21 2.519V3.5a12.5 12.5 0 01-11.492 12.455.5.5 0 00-.476.516V19.5a2.5 2.5 0 01-5 .019v-4.048A12.502 12.502 0 019.315 7.584zM6 15.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="message-content">
              {msg.sender === 'bot' && msg.text.startsWith('*') && msg.text.endsWith('*') ? (
                <p className="italics">{msg.text}</p>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
           <div className="message-wrapper bot">
            <div className="avatar bot">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                 <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.5 1.5c.27 0 .54.01.81.031L21 2.519V3.5a12.5 12.5 0 01-11.492 12.455.5.5 0 00-.476.516V19.5a2.5 2.5 0 01-5 .019v-4.048A12.502 12.502 0 019.315 7.584zM6 15.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
               </svg>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
         </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie un mesaj aici..."
            disabled={isTyping}
            autoFocus
          />
          <button 
            className="send-button" 
            onClick={handleSend} 
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
