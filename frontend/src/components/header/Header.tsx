import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BarChart2, User } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'DASHBOARD', path: '/dashboard' },
  { name: 'METRICS', path: '/metrics' },
  { name: 'LOUNGE', path: '/lounge' },
  { name: 'SOLIDebugger', path: '/solid-debugger' },
  { name: 'SEE THROUGH THE ROCK', path: '/eyes' },
  { name: 'TINDROCK', path: '/tindrock' }
];

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 font-sans">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-[#0B132B] tracking-tight">
          RockOn
        </h1>
      </div>

      <nav className="flex space-x-8">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-bold pb-2 border-b-2 transition-all duration-200 ${
                isActive
                  ? 'border-[#00C48C] text-[#00C48C]'
                  : 'border-transparent text-[#5B6B8A] hover:text-[#0B132B]'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center space-x-6 text-[#5B6B8A]">
        <Link to="/metrics" className="hover:text-[#0B132B] transition-colors" aria-label="View Metrics">
          <BarChart2 className="w-5 h-5" strokeWidth={1.5} />
        </Link>

        {/* Isolated relative wrapper so dropdown doesn't shift siblings */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="hover:text-[#0B132B] transition-colors"
            aria-label="User Profile"
          >
            <User className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md z-50">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-sm text-[#0B132B] hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    window.location.href = '/dashboard';
                  }}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 text-sm text-[#0B132B] hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    localStorage.removeItem('rock');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;