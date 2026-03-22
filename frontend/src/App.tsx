import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LoungePage from './pages/LoungePage';
import SeeThroughEyes from './components/eyes/Eyes';
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
        


        {/* ========================================== */}
        {/* Routes WITH Header & Footer wrapped inside */}
        {/* ========================================== */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/lounge" element={<LoungePage />} />
          <Route path="/eyes" element={<SeeThroughEyes />} />
          <Route path="/tindrock" element={<div className="text-center mt-20 text-2xl font-bold text-[#0B132B]">Tindrock Coming Soon</div>} />
        </Route>

        {/* Catch-all route at the very end to bounce invalid URLs to landing */}
        <Route path="*" element={<Navigate to="/landing" replace />} />

      </Routes>
    </div>
  );
};

export default App;