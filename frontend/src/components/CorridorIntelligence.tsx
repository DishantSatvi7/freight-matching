'use client';

import React, { useState } from 'react';
import { Compass, TrendingDown, Fuel, DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function CorridorIntelligence() {
  const [selectedCorridor, setSelectedCorridor] = useState("cor-1");

  const kpis = [
    { label: "DEADHEAD EMPTY RUNNING", value: "38.4%", note: "MoRTH / NHAI freight baseline", color: "text-rust" },
    { label: "AVG CLIENT BACKHAUL SAVINGS", value: "26.5%", note: "Discount vs spot rates", color: "text-emerald-400" },
    { label: "MONITORED CORRIDORS", value: "56", note: "Across 8 Tier-1 freight hubs", color: "text-sky-400" },
    { label: "ANNUALIZED FUEL SAVED", value: "₹265 Cr", note: "Network fuel recovery", color: "text-amber-400" },
  ];

  const corridors = [
    {
      id: "cor-1",
      code: "NH-48",
      name: "Mumbai – Pune Expressway",
      origin: "Mumbai",
      destination: "Pune",
      distance: "152 km",
      emptyPct: "38.4%",
      deadheadTrucks: "1,420 rigs/day",
      fuelPrice: "₹97.83/L",
      tollAvg: "₹385",
      annualWaste: "₹48.2 Cr",
      commodities: "Automobile Parts, Engineering Goods, Petrochem",
    },
    {
      id: "cor-2",
      code: "NH-48-GJ",
      name: "Surat – Ahmedabad Western Spine",
      origin: "Surat",
      destination: "Ahmedabad",
      distance: "263 km",
      emptyPct: "41.2%",
      deadheadTrucks: "2,150 rigs/day",
      fuelPrice: "₹92.45/L",
      tollAvg: "₹510",
      annualWaste: "₹72.6 Cr",
      commodities: "Textiles, Chemicals, Gems & Polishing",
    },
    {
      id: "cor-3",
      code: "NH-60",
      name: "Pune – Nashik Industrial Link",
      origin: "Pune",
      destination: "Nashik",
      distance: "212 km",
      emptyPct: "35.8%",
      deadheadTrucks: "980 rigs/day",
      fuelPrice: "₹96.12/L",
      tollAvg: "₹290",
      annualWaste: "₹31.4 Cr",
      commodities: "Pharma, Auto Forgings, Fresh Produce",
    },
    {
      id: "cor-4",
      code: "NH-44",
      name: "Hyderabad – Nagpur North-South Corridor",
      origin: "Hyderabad",
      destination: "Nagpur",
      distance: "504 km",
      emptyPct: "44.5%",
      deadheadTrucks: "1,840 rigs/day",
      fuelPrice: "₹98.24/L",
      tollAvg: "₹920",
      annualWaste: "₹114.8 Cr",
      commodities: "Heavy Structural Steel, Cement, Cold-Chain",
    },
  ];

  const active = corridors.find(c => c.id === selectedCorridor) || corridors[0];

  return (
    <section id="corridor-intelligence" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#060911] border-b border-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rust font-mono text-xs font-semibold tracking-wider uppercase mb-1">
              <Compass size={16} />
              <span>National Freight Corridor Telemetry</span>
            </div>
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight text-white">
              Corridor Intelligence & Deadhead Analysis
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">
              Live freight data models computing return leg fuel waste and empty running density across primary interstate arteries.
            </p>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(k => (
            <div key={k.label} className="bg-slate-900 border border-gray-800 rounded p-5 space-y-2">
              <span className="font-mono text-xs text-gray-400 block font-semibold">{k.label}</span>
              <div className={`font-headline text-3xl font-bold ${k.color}`}>{k.value}</div>
              <div className="font-mono text-[11px] text-gray-500">{k.note}</div>
            </div>
          ))}
        </div>

        {/* Selected Corridor Spotlight */}
        <div className="bg-slate-900 border border-gray-800 rounded-md p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-rust/20 border border-rust text-rust font-bold">
                  {active.code}
                </span>
                <h3 className="font-headline text-xl font-bold text-white uppercase">{active.name}</h3>
              </div>
              <p className="font-mono text-xs text-gray-400 mt-1">
                {active.origin} ➔ {active.destination} ({active.distance}) • Deadhead Empty Index: <strong className="text-rust">{active.emptyPct}</strong>
              </p>
            </div>

            <a
              href="#shipments-module"
              className="bg-rust hover:bg-rust-hover transition text-white px-4 py-2 rounded font-mono text-xs font-bold uppercase flex items-center gap-2 shadow cursor-pointer self-start sm:self-auto"
            >
              <span>POST SHIPMENT ON CORRIDOR</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Corridor Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-[#060911] p-3 rounded border border-gray-800">
              <span className="text-gray-500 block text-[10px]">DAILY DEADHEAD RIGS</span>
              <span className="text-white font-bold text-sm">{active.deadheadTrucks}</span>
            </div>
            <div className="bg-[#060911] p-3 rounded border border-gray-800">
              <span className="text-gray-500 block text-[10px]">PUMP DIESEL RATE</span>
              <span className="text-sky-400 font-bold text-sm">{active.fuelPrice}</span>
            </div>
            <div className="bg-[#060911] p-3 rounded border border-gray-800">
              <span className="text-gray-500 block text-[10px]">FASTAG TOLL AVERAGE</span>
              <span className="text-amber-400 font-bold text-sm">{active.tollAvg}</span>
            </div>
            <div className="bg-[#060911] p-3 rounded border border-gray-800">
              <span className="text-gray-500 block text-[10px]">ANNUALIZED FUEL WASTED</span>
              <span className="text-rust font-bold text-sm">{active.annualWaste}</span>
            </div>
          </div>

          {/* Quick Corridor Selection Tabs */}
          <div className="flex gap-2 flex-wrap pt-2">
            <span className="font-mono text-xs text-gray-500 self-center mr-2">Select Corridor:</span>
            {corridors.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCorridor(c.id)}
                className={`font-mono text-xs px-3 py-1.5 rounded border transition cursor-pointer ${
                  selectedCorridor === c.id
                    ? 'bg-rust border-rust text-white font-bold'
                    : 'bg-slate-800 border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                {c.origin} – {c.destination}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
