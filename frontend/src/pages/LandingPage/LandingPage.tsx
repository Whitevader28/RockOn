import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/LandingPage/backround';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueName: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Invalid code. Please try again.');
      }

      const data = await response.json();

      // Save the rock's details in localStorage or context
      localStorage.setItem('rock', JSON.stringify(data));

      // Navigate to the dashboard or metrics page
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleQrScan = () => {
    // Placeholder for QR scanning functionality
    alert('QR Code scanning coming soon!');
  };

  return (
    <Background>
      <div className="landing-card">
        <div className="image-placeholder">
          <img src="/CoolRock.png" alt="Cool Rock" />
        </div>

        <div className="text-input-wrapper">
          <input
            id="landing-text-input"
            className="text-input"
            type="text"
            placeholder="Enter code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger login on Enter key press
          />
        </div>

        <div className="or-divider">
          <div className="line" />
          <span className="or-text">OR</span>
          <div className="line" />
        </div>

        <button
          id="qr-scan-button"
          className="qr-button"
          onClick={handleQrScan}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" />
            <rect x="18" y="14" width="3" height="3" />
            <rect x="14" y="18" width="3" height="3" />
            <rect x="18" y="18" width="3" height="3" />
          </svg>
          Scan QR Code
        </button>

        <button
          id="enter-button"
          className="qr-button" // Reuse the same styling as the QR button
          onClick={handleLogin}
        >
          Enter
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>
    </Background>
  );
};

export default LandingPage;
