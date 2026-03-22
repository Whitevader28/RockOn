import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BarChart2, User } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'DASHBOARD', path: '/dashboard' },
  { name: 'METRICS', path: '/metrics' },
  { name: 'LOUNGE', path: '/lounge' },
  { name: 'SEE THROUGH THE ROCK', path: '/eyes' },
  { name: 'TINDROCK', path: '/tindrock' }
];

const Header: React.FC = () => {
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
        <button className="hover:text-[#0B132B] transition-colors" aria-label="User Profile">
          <User className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default Header;