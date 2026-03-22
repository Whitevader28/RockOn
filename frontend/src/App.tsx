import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Metrics from './components/metrics/Metrics';

// 1. Create a Layout component to wrap pages that NEED a header and footer
const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow p-8 md:p-12 lg:p-16">
        <Outlet /> {/* This is where /metrics, /lounge, etc. will render */}
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    // Keep the main wrapper here so the background color applies to all pages
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Routes>
        {/* ========================================== */}
        {/* Routes WITHOUT Header & Footer             */}
        {/* ========================================== */}
        <Route index element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Catch-all route to bounce invalid URLs to landing */}
        <Route path="*" element={<Navigate to="/landing" replace />} />


        {/* ========================================== */}
        {/* Routes WITH Header & Footer wrapped inside */}
        {/* ========================================== */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Pagina de Metrics integrată aici */}
          <Route path="/metrics" element={<Metrics />} />
          
          <Route path="/lounge" element={<div className="text-center mt-20">Lounge Coming Soon</div>} />
          <Route path="/tindrock" element={<div className="text-center mt-20">Tindrock Coming Soon</div>} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;