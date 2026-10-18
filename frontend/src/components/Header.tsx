'use client';

import React from 'react';
import { Truck, Sun, Moon, Activity } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const navItems = [
    { label: "CORRIDOR INTELLIGENCE", href: "#corridor-intelligence" },
    { label: "SHIPMENTS & TRACKING", href: "#shipments-module" },
    { label: "TRUCK-SHIPMENT MATCHING", href: "#truck-matching" },
    { label: "RETURN FLEET", href: "#ranked-trucks" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#060911]/95 backdrop-blur border-b border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-rust text-white p-2 rounded">
            <Truck size={20} />
          </div>
          <div>
            <div className="font-headline text-2xl font-bold tracking-wider text-white leading-none">
              BACKHAUL
            </div>
            <div className="font-mono text-[10px] text-gray-400 tracking-wider mt-0.5">
              NATIONAL FREIGHT & CORRIDOR INTELLIGENCE
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs font-semibold tracking-wider text-gray-400 hover:text-rust transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions & Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-gray-400 border-r border-gray-800 pr-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>56 Corridors Active</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-slate-900 border border-gray-800 hover:border-rust text-gray-300 hover:text-white transition flex items-center gap-1.5 font-mono text-xs cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-gray-300" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
