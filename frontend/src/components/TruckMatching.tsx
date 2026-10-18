'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const CITIES = ["Mumbai", "Pune", "Nashik", "Surat", "Ahmedabad", "Indore", "Nagpur", "Hyderabad"];

export default function TruckMatching() {
  const [matchOrigin, setMatchOrigin] = useState("Pune");
  const [matchDestination, setMatchDestination] = useState("Mumbai");
  const [matchWeight, setMatchWeight] = useState(14);
  const [isMatching, setIsMatching] = useState(false);
  const [matchedTrucks, setMatchedTrucks] = useState<any[]>([
    {
      id: "trk-81",
      carrier: "Apex Cargo Carriers",
      vehicleNumber: "MH-12-PQ-4412",
      truckType: "HCV (32ft Multi-Axle)",
      capacityTons: 20,
      fitScore: 98,
      emptyRoute: "Pune ➔ Mumbai",
      availableFrom: "Ready Now (JNPT Returning)",
      discountRate: "₹10,200",
      spotRate: "₹14,500",
      savings: "₹4,300 (30%)",
      driverName: "Vikram Rane",
      rating: 4.9,
    },
    {
      id: "trk-44",
      carrier: "Gujarat Freightways",
      vehicleNumber: "GJ-05-AU-3140",
      truckType: "MCV (24ft Container)",
      capacityTons: 16,
      fitScore: 92,
      emptyRoute: "Pune ➔ Mumbai",
      availableFrom: "Available in 1.5 hrs",
      discountRate: "₹11,400",
      spotRate: "₹15,000",
      savings: "₹3,600 (24%)",
      driverName: "Dinesh Patel",
      rating: 4.7,
    },
  ]);

  const handleRunMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
    }, 400);
  };

  return (
    <section id="truck-matching" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0b1120] border-b border-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rust font-mono text-xs font-semibold tracking-wider uppercase mb-1">
              <Zap size={16} />
              <span>Algorithmic Load-to-Rig Pairing</span>
            </div>
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight text-white">
              Truck-Shipment Matching Engine
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">
              Automated heuristics matching shipper payload requirements against verified unladen return carriers in real-time.
            </p>
          </div>
        </div>

        {/* Matching Controls */}
        <div className="bg-slate-900 border border-gray-800 rounded-md p-6">
          <form onSubmit={handleRunMatch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block font-mono text-xs text-gray-400 mb-1 font-semibold">PICKUP HUB</label>
              <select
                value={matchOrigin}
                onChange={e => setMatchOrigin(e.target.value)}
                className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
              >
                {CITIES.map(c => (
                  <option key={c} value={c} disabled={c === matchDestination}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-gray-400 mb-1 font-semibold">DELIVERY HUB</label>
              <select
                value={matchDestination}
                onChange={e => setMatchDestination(e.target.value)}
                className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
              >
                {CITIES.map(c => (
                  <option key={c} value={c} disabled={c === matchOrigin}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-gray-400 mb-1 font-semibold">REQUIRED TONNAGE</label>
              <input
                type="number"
                min="1"
                max="40"
                value={matchWeight}
                onChange={e => setMatchWeight(Number(e.target.value))}
                className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isMatching}
                className="w-full bg-rust hover:bg-rust-hover transition text-white font-mono font-bold text-xs uppercase py-2.5 px-4 rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Cpu size={15} />
                <span>{isMatching ? "Computing Matches..." : "Run Heuristic"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Matched Carriers Table */}
        <div className="space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Top Matched Empty-Return Units ({matchOrigin} ➔ {matchDestination})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedTrucks.map(truck => (
              <div key={truck.id} className="bg-slate-900 border border-gray-800 rounded p-5 space-y-4 shadow-lg hover:border-gray-700 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline text-lg font-bold text-white">{truck.carrier}</span>
                      <span className="font-mono text-[10px] bg-emerald-950/60 border border-emerald-500/80 text-emerald-400 px-2 py-0.5 rounded font-bold">
                        {truck.fitScore}% FIT
                      </span>
                    </div>
                    <span className="font-mono text-xs text-sky-400">{truck.vehicleNumber} • {truck.truckType}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[10px] text-gray-400 block">BACKHAUL RATE</span>
                    <span className="font-headline text-xl font-bold text-emerald-400">{truck.discountRate}</span>
                    <span className="font-mono text-[10px] text-gray-500 block line-through">Spot: {truck.spotRate}</span>
                  </div>
                </div>

                <div className="bg-[#060911] border border-gray-800 rounded p-3 grid grid-cols-3 gap-2 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block">AVAILABLE</span>
                    <span className="text-gray-200">{truck.availableFrom}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">SAVINGS</span>
                    <span className="text-emerald-400 font-semibold">{truck.savings}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">CARRIER RATING</span>
                    <span className="text-amber-400 font-semibold">{truck.rating} ★</span>
                  </div>
                </div>

                <a
                  href="#shipments-module"
                  className="w-full bg-slate-800 hover:bg-slate-700 transition border border-gray-700 text-white font-mono text-xs font-bold uppercase py-2 px-3 rounded flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>LOCK THIS RIG & DISPATCH</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
