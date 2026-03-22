import React from 'react';

const Footer: React.FC = () => {
  const footerLinks = ['STASIS POLICY', 'MINERAL RIGHTS', 'EROSION TERMS'];

  return (
    <footer className="w-full bg-white py-12 flex flex-col items-center justify-center font-sans border-t border-gray-50">
      
      {/* Links Navigation */}
      <nav className="flex space-x-12 mb-6">
        {footerLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Copyright Line */}
      <p className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-slate-400">
        © 4,000,000 BCE RockOn. MEASURED IN EONS.
      </p>
      
    </footer>
  );
};

export default Footer;