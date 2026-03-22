import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Header />
        
        <main className="flex-grow p-8 md:p-12 lg:p-16">
          <Routes>
            {/* Default route goes to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Placeholders for future pages */}
            <Route path="/metrics" element={<div className="text-center mt-20">Metrics Page Coming Soon</div>} />
            <Route path="/lounge" element={<div className="text-center mt-20">Lounge Coming Soon</div>} />
            <Route path="/tindrock" element={<div className="text-center mt-20">Tindrock Coming Soon</div>} />
          </Routes>
        </main>

        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;