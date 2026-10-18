'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Layers, Award } from 'lucide-react';

export default function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'ranking' | 'utilization'>('ranking');

  const clients = [
    { rank: 1, name: "Mahindra Logistics Auto Division", saved: "₹84.2 Lakhs", trips: 142, emptyReduction: "34%" },
    { rank: 2, name: "Reliance Retail West Distribution", saved: "₹62.8 Lakhs", trips: 118, emptyReduction: "31%" },
    { rank: 3, name: "Sun Pharma Cold-Chain Network", saved: "₹45.1 Lakhs", trips: 86, emptyReduction: "28%" },
    { rank: 4, name: "Arvind Textiles Logistics", saved: "₹38.7 Lakhs", trips: 79, emptyReduction: "27%" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0b1120] border-b border-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800 gap-2">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`font-mono text-xs font-bold px-4 py-2.5 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'ranking'
                ? 'border-rust text-rust bg-rust/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Award size={15} />
            <span>CLIENT SAVINGS RANKING</span>
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`font-mono text-xs font-bold px-4 py-2.5 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'heatmap'
                ? 'border-rust text-rust bg-rust/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Layers size={15} />
            <span>DEMAND HEATMAP</span>
          </button>

          <button
            onClick={() => setActiveTab('utilization')}
            className={`font-mono text-xs font-bold px-4 py-2.5 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'utilization'
                ? 'border-rust text-rust bg-rust/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 size={15} />
            <span>TRUCK UTILIZATION</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'ranking' && (
          <div className="bg-slate-900 border border-gray-800 rounded-md p-6 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="pb-3">RANK</th>
                  <th className="pb-3">ENTERPRISE CLIENT</th>
                  <th className="pb-3 text-right">CAPITAL SAVED</th>
                  <th className="pb-3 text-right">BACKHAUL TRIPS</th>
                  <th className="pb-3 text-right">DEADHEAD REDUCTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {clients.map(c => (
                  <tr key={c.rank} className="hover:bg-slate-800/40">
                    <td className="py-3 text-amber-400 font-bold">#{c.rank}</td>
                    <td className="py-3 text-white font-semibold">{c.name}</td>
                    <td className="py-3 text-right text-emerald-400 font-bold">{c.saved}</td>
                    <td className="py-3 text-right text-gray-300">{c.trips} trips</td>
                    <td className="py-3 text-right text-sky-400 font-bold">-{c.emptyReduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'heatmap' && (
          <div className="bg-slate-900 border border-gray-800 rounded-md p-8 text-center space-y-4 font-mono text-xs">
            <h4 className="text-white font-headline text-lg font-bold uppercase">Corridor Freight Demand Heatmap</h4>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real-time load demand index indicating highest deadhead re-balancing opportunities on NH-48 (Western corridor) and NH-44 (Central north-south spine).
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-[#060911] p-3 rounded border border-rust/40 text-rust font-bold">
                Mumbai-Pune: CRITICAL LOAD DENSITY (94%)
              </div>
              <div className="bg-[#060911] p-3 rounded border border-amber-500/40 text-amber-400 font-bold">
                Surat-Ahmedabad: HIGH DEMAND (82%)
              </div>
              <div className="bg-[#060911] p-3 rounded border border-sky-500/40 text-sky-400 font-bold">
                Pune-Nashik: BALANCED (68%)
              </div>
              <div className="bg-[#060911] p-3 rounded border border-emerald-500/40 text-emerald-400 font-bold">
                Hyderabad-Nagpur: OPTIMAL (74%)
              </div>
            </div>
          </div>
        )}

        {activeTab === 'utilization' && (
          <div className="bg-slate-900 border border-gray-800 rounded-md p-8 text-center space-y-4 font-mono text-xs">
            <h4 className="text-white font-headline text-lg font-bold uppercase">Commercial Fleet Asset Utilization</h4>
            <p className="text-gray-400 max-w-xl mx-auto">
              Network-wide rig operational utilization increased from 61.6% to 84.2% across participating transporter fleets through automated reverse freight matching.
            </p>
            <div className="flex justify-center items-center gap-8 pt-4">
              <div>
                <span className="text-gray-500 block text-[10px]">BEFORE BACKHAUL</span>
                <span className="text-2xl font-headline font-bold text-gray-400">61.6%</span>
              </div>
              <div className="text-rust text-xl font-bold">➔</div>
              <div>
                <span className="text-gray-500 block text-[10px]">CURRENT BACKHAUL NETWORK</span>
                <span className="text-3xl font-headline font-bold text-emerald-400">84.2%</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
