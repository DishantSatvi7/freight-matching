import React from 'react';
import { Truck, Server, Cpu } from 'lucide-react';

export default function Footer() {
  const hubs = [
    { city: "Mumbai", code: "BOM" },
    { city: "Pune", code: "PNQ" },
    { city: "Nashik", code: "ISK" },
    { city: "Surat", code: "STV" },
    { city: "Ahmedabad", code: "AMD" },
    { city: "Indore", code: "IDR" },
    { city: "Nagpur", code: "NAG" },
    { city: "Hyderabad", code: "HYD" },
  ];

  return (
    <footer className="bg-[#060911] border-t border-gray-800 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-rust text-white p-1.5 rounded">
                <Truck size={16} />
              </div>
              <span className="font-headline text-xl font-bold tracking-wider text-white">BACKHAUL</span>
            </div>
            <p className="text-xs font-sans leading-relaxed text-gray-400">
              National logistics intelligence and empty-rig re-balancing platform converting unladen deadhead kilometers into high-velocity commercial freight corridors.
            </p>
            <div className="font-mono text-[11px] text-sky-400 font-medium">
              NEXT.JS APP ROUTER + EXPRESS REST MONOREPO
            </div>
          </div>

          {/* Monitored Hubs */}
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              Monitored Hubs (8 Hubs / 56 Corridors)
            </div>
            <ul className="grid grid-cols-2 gap-1.5 font-mono text-xs text-gray-400">
              {hubs.map(h => (
                <li key={h.city}>• {h.city} ({h.code})</li>
              ))}
            </ul>
          </div>

          {/* Core REST Endpoints */}
          <div className="space-y-2 font-mono text-xs">
            <div className="uppercase tracking-wider text-white font-semibold">
              Core REST Endpoints
            </div>
            <div className="space-y-1 text-gray-400">
              <div><code className="text-rust">GET /api/shipments/:id</code> • Live Tracker</div>
              <div><code className="text-rust">POST /api/shipments</code> • Book Consignment</div>
              <div><code className="text-rust">GET /api/corridors</code> • 56 High-Density Routes</div>
              <div><code className="text-rust">GET /api/corridors/fuel-prices</code> • Oil Feeds</div>
              <div><code className="text-rust">GET /api/health</code> • System Telemetry</div>
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-2 font-mono text-xs">
            <div className="uppercase tracking-wider text-white font-semibold">
              System Gateway
            </div>
            <div className="space-y-1.5 text-gray-400">
              <div>STATUS: <strong className="text-emerald-400">ONLINE // 200 OK</strong></div>
              <div>API GATEWAY: <span className="text-gray-300">http://localhost:5000/api</span></div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-2">
                <Cpu size={14} className="text-sky-400" />
                <span>IN-MEMORY HIGH-SPEED DATA ENGINE</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-500">
          <div>BACKHAUL LOGISTICS NETWORK // EVERY EMPTY MILE IS INVENTORY.</div>
          <div>ALL DISTANCES COMPUTED VIA HAVERSINE SPHERICAL PROJECTIONS</div>
        </div>

      </div>
    </footer>
  );
}
