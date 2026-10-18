'use client';

import React from 'react';
import { ShieldCheck, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function ReturnFleet() {
  const fleet = [
    {
      id: "flt-1",
      carrier: "Apex Cargo Carriers",
      vehicleNumber: "MH-12-PQ-4412",
      truckType: "HCV 32ft Multi-Axle",
      capacity: "24 Tons",
      currentCity: "Pune (Chakan)",
      headingTo: "Mumbai (JNPT)",
      status: "READY FOR RETURN LOAD",
      driver: "Vikram Rane",
      phone: "+91 94220 19023",
      rating: 4.9,
      verified: true,
    },
    {
      id: "flt-2",
      carrier: "FastTrack Logistics",
      vehicleNumber: "MH-04-EK-9182",
      truckType: "HCV 32ft Container",
      capacity: "22 Tons",
      currentCity: "Mumbai (Navi Mumbai)",
      headingTo: "Pune (Bhosari)",
      status: "IN TRANSIT",
      driver: "Sanjay Patil",
      phone: "+91 98201 44521",
      rating: 4.8,
      verified: true,
    },
    {
      id: "flt-3",
      carrier: "Gujarat Freightways",
      vehicleNumber: "GJ-05-AU-3140",
      truckType: "MCV 24ft Closed Body",
      capacity: "16 Tons",
      currentCity: "Surat (GIDC)",
      headingTo: "Ahmedabad (Narol)",
      status: "READY FOR RETURN LOAD",
      driver: "Dinesh Patel",
      phone: "+91 97140 88203",
      rating: 4.7,
      verified: true,
    },
    {
      id: "flt-4",
      carrier: "TransNational Haulers",
      vehicleNumber: "TS-08-UA-7019",
      truckType: "HCV 32ft Multi-Axle",
      capacity: "28 Tons",
      currentCity: "Hyderabad (Medchal)",
      headingTo: "Nagpur (MIHAN)",
      status: "DISPATCHED",
      driver: "Ramulu Goud",
      phone: "+91 99890 32194",
      rating: 4.8,
      verified: true,
    },
  ];

  return (
    <section id="ranked-trucks" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#060911] border-b border-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rust font-mono text-xs font-semibold tracking-wider uppercase mb-1">
              <ShieldCheck size={16} />
              <span>Transporter Verification & Fleet Availability</span>
            </div>
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight text-white">
              Backhaul Verified Return Fleet
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">
              Commercial transporters verified via Vahan, GSTIN, and active Fastag toll telemetry.
            </p>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fleet.map(item => (
            <div key={item.id} className="bg-slate-900 border border-gray-800 rounded p-5 space-y-4 shadow hover:border-gray-700 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-950/60 border border-sky-400 text-sky-400 font-bold">
                    {item.vehicleNumber}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs font-semibold">
                    <CheckCircle size={13} />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <h3 className="font-headline text-lg font-bold text-white uppercase">{item.carrier}</h3>
                <span className="font-mono text-xs text-gray-400 block">{item.truckType} • {item.capacity}</span>

                <div className="bg-[#060911] border border-gray-800 rounded p-3 mt-3 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-[10px]">CURRENT HUB</span>
                    <span className="text-gray-200">{item.currentCity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-[10px]">RETURNING TO</span>
                    <span className="text-amber-400 font-semibold">{item.headingTo}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-800">
                    <span className="text-gray-500 text-[10px]">DRIVER</span>
                    <span className="text-gray-300">{item.driver}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-mono text-xs pt-2">
                  <span className="text-gray-500">RATING</span>
                  <span className="text-amber-400 font-bold">{item.rating} / 5.0</span>
                </div>
                <a
                  href="#shipments-module"
                  className="mt-3 w-full bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase py-2 rounded text-center block transition cursor-pointer"
                >
                  ASSIGN CARGO
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
