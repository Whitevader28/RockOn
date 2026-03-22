import React, { useState } from 'react';
import { BarChart2, User } from 'lucide-react';

const NAV_ITEMS = ['DASHBOARD', 'METRICS', 'LOUNGE', 'TINDROCK'];

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('DASHBOARD');

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 font-sans">
      
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-[#0B132B] tracking-tight">
          RockOn
        </h1>
      </div>

      <nav className="flex space-x-8">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`text-sm font-bold pb-2 border-b-2 transition-all duration-200 ${
                isActive
                  ? 'border-[#00C48C] text-[#00C48C]' // The active teal color
                  : 'border-transparent text-[#5B6B8A] hover:text-[#0B132B]' // The inactive slate color
              }`}
            >
              {item}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center space-x-6 text-[#5B6B8A]">
        <button 
          className="hover:text-[#0B132B] transition-colors" 
          aria-label="View Metrics"
        >
          <BarChart2 className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button 
          className="hover:text-[#0B132B] transition-colors" 
          aria-label="User Profile"
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

    </header>
  );
};

export default Header;