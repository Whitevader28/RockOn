import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import Background from '../../components/LandingPage/backround';

const LandingPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
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

  return (
    <Background>
      {/* Inline style for the custom Google Font and the Card Fade-In Animation. 
        This keeps the component 100% single-file without needing tailwind.config.js edits.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .animate-card-fade-in {
          animation: cardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* QR Code Scanner Modal */}
      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-card-fade-in">
          <div className="relative w-full max-w-[380px] bg-white/[0.12] backdrop-blur-[24px] rounded-[24px] border border-white/[0.18] p-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-white font-medium font-['Inter']">Scan QR Code</h3>
              <button
                onClick={() => setIsScanning(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                ✕ Close
              </button>
            </div>
            <div className="rounded-[16px] overflow-hidden border border-white/20">
              <Scanner
                onScan={(result) => {
                  // The new API returns an array of results. We grab the rawValue of the first one.
                  if (result && result.length > 0) {
                    setInputValue(result[0].rawValue);
                    setIsScanning(false);
                  }
                }}
                onError={(error) => console.error(error?.message)}
                // Optional: You can customize the UI components of the scanner here
                components={{
                  audio: false, // Set to true if you want a beep sound on successful scan
                  finder: true,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Glassmorphism Card */}
      <div 
        className="w-[380px] max-w-[92vw] bg-white/[0.12] backdrop-blur-[24px] rounded-[24px] border border-white/[0.18] px-[32px] py-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col items-center gap-[24px] z-10 animate-card-fade-in font-['Inter'] max-[420px]:px-[22px] max-[420px]:py-[28px] max-[420px]:gap-[20px]"
      >
        
        {/* Image Placeholder */}
        <div className="group relative w-[160px] h-[160px] rounded-[20px] bg-white/[0.12] border-[1.5px] border-white/[0.28] flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:border-white/[0.4] hover:bg-white/[0.14] hover:scale-[1.02] max-[420px]:w-[130px] max-[420px]:h-[130px]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] transition-opacity duration-300 pointer-events-none" />
          <img src="/CoolRock.png" alt="Cool Rock" className="w-full h-full object-cover block" />
        </div>

        {/* Text Input */}
        <div className="w-full">
          <input
            id="landing-text-input"
            className="w-full px-[18px] py-[14px] border-[1.5px] border-white/[0.15] rounded-[14px] bg-white/[0.07] text-white text-[15px] font-normal outline-none transition-all duration-300 box-border placeholder:text-white/[0.82] placeholder:font-medium focus:border-white/[0.4] focus:bg-white/[0.12] focus:ring-[3px] focus:ring-white/[0.06]"
            type="text"
            placeholder="Enter code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* OR Divider */}
        <div className="flex items-center w-full gap-[16px]">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <span className="text-[13px] font-semibold text-white/[0.9] tracking-[2px] uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            OR
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        {/* Scan QR Button */}
        <button
          id="qr-scan-button"
          className="group relative w-full px-[24px] py-[14px] border-[1.5px] border-white/[0.18] rounded-[14px] bg-gradient-to-br from-[#3b818366] to-[#fad08940] text-white text-[15px] font-medium cursor-pointer flex items-center justify-center gap-[10px] transition-all duration-300 overflow-hidden hover:border-white/[0.35] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          onClick={() => setIsScanning(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] fill-none stroke-white stroke-[1.5] flex-shrink-0">
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

        {/* Enter Button */}
        <button
          id="enter-button"
          className="group relative w-full px-[24px] py-[14px] border-[1.5px] border-white/[0.18] rounded-[14px] bg-gradient-to-br from-[#3b818366] to-[#fad08940] text-white text-[15px] font-medium cursor-pointer flex items-center justify-center gap-[10px] transition-all duration-300 overflow-hidden hover:border-white/[0.35] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          onClick={handleLogin}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
          Enter
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-[#ff6b6b] text-[13px] font-medium mt-[-10px] text-center w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {error}
          </p>
        )}
      </div>
    </Background>
  );
};

export default LandingPage;