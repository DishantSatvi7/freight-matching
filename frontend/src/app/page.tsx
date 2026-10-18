'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CorridorIntelligence from '../components/CorridorIntelligence';
import ShipmentTracker from '../components/ShipmentTracker';
import TruckMatching from '../components/TruckMatching';
import ReturnFleet from '../components/ReturnFleet';
import AnalyticsTabs from '../components/AnalyticsTabs';
import Footer from '../components/Footer';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'light') {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-gray-100 transition-colors">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-1">
        <CorridorIntelligence />
        <ShipmentTracker />
        <TruckMatching />
        <ReturnFleet />
        <AnalyticsTabs />
      </main>
      <Footer />
    </div>
  );
}
