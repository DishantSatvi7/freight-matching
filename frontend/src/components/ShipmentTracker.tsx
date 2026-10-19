'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  MapPin,
  ShieldCheck,
  Phone,
  RefreshCw,
  Navigation,
} from 'lucide-react';
import { Shipment, CreateShipmentInput, ShipmentStatus } from '../types/shipment';
import { shipmentApi } from '../lib/api';

const CITIES = ["Mumbai", "Pune", "Nashik", "Surat", "Ahmedabad", "Indore", "Nagpur", "Hyderabad"];
const COMMODITIES = ["Automobile", "Textiles", "Pharma", "Steel", "Chemicals", "Electronics", "FMCG"];
const SIZES = [
  "32ft Multi-Axle Container (64 CBM)",
  "24ft Closed Body (42 CBM)",
  "20ft Standard Container (33 CBM)",
  "14ft Closed Cargo Bay (22 CBM)",
  "Full Trailer Bed (Custom Pallets)",
];

const INITIAL_FALLBACK: Shipment[] = [
  {
    id: "shp-1",
    trackingId: "BKH-9842-BOM",
    commodity: "Automobile Components",
    size: "32ft Multi-Axle Container (64 CBM)",
    weightTons: 18,
    origin: "Mumbai",
    destination: "Pune",
    truckType: "HCV",
    shipmentCost: 10450,
    marketRate: 14200,
    savingsAmount: 3750,
    savingsPct: 26,
    status: "IN_TRANSIT",
    progressPct: 65,
    currentCheckpoint: "Navi Mumbai Expressway KM 42",
    eta: "2.1 hrs",
    bookedAt: "28 Oct 2026, 04:30 PM",
    carrier: {
      name: "FastTrack Logistics",
      vehicleNumber: "MH-04-EK-9182",
      driverName: "Sanjay Patil",
      driverPhone: "+91 98201 44521",
      carrierRating: 4.8,
      currentLat: 18.9812,
      currentLng: 73.1254,
    },
    milestones: [
      { id: "m-1", status: "BOOKED", title: "Consignment Confirmed", location: "JNPT Freight Terminal", timestamp: "10:30 IST", completed: true, current: false },
      { id: "m-2", status: "DISPATCHED", title: "Loaded & Weighed", location: "JNPT Dock 3", timestamp: "11:45 IST", completed: true, current: false },
      { id: "m-3", status: "IN TRANSIT", title: "Cruising on Expressway", location: "Khalapur Toll KM 38", timestamp: "13:10 IST", completed: false, current: true, notes: "Speed: 62 km/h" },
      { id: "m-4", status: "DELIVERED", title: "Chakan Hub Delivery", location: "Pune Auto Cluster", timestamp: "Pending", completed: false, current: false },
    ],
  },
  {
    id: "shp-2",
    trackingId: "BKH-7120-STV",
    commodity: "Textiles",
    size: "24ft Closed Body (42 CBM)",
    weightTons: 12,
    origin: "Surat",
    destination: "Ahmedabad",
    truckType: "MCV",
    shipmentCost: 11200,
    marketRate: 15400,
    savingsAmount: 4200,
    savingsPct: 27,
    status: "BOOKED",
    progressPct: 20,
    currentCheckpoint: "Surat GIDC Logistics Terminal Dock 4",
    eta: "5.2 hrs",
    bookedAt: "28 Oct 2026, 08:15 PM",
    carrier: {
      name: "Gujarat Freightways",
      vehicleNumber: "GJ-05-AU-3140",
      driverName: "Dinesh Patel",
      driverPhone: "+91 97140 88203",
      carrierRating: 4.7,
      currentLat: 21.1702,
      currentLng: 72.8311,
    },
    milestones: [
      { id: "m-1", status: "BOOKED", title: "Consignment Booked", location: "Surat Ring Road Depot", timestamp: "13:15 IST", completed: true, current: true },
      { id: "m-2", status: "DISPATCHED", title: "Dispatched from Origin", location: "Surat GIDC Terminal", timestamp: "Pending", completed: false, current: false },
      { id: "m-3", status: "IN TRANSIT", title: "NH-48 Transit", location: "Vadodara Bypass", timestamp: "Pending", completed: false, current: false },
      { id: "m-4", status: "DELIVERED", title: "Destination Hub", location: "Ahmedabad Narol Hub", timestamp: "Pending", completed: false, current: false },
    ],
  },
  {
    id: "shp-3",
    trackingId: "BKH-6350-PNQ",
    commodity: "Pharma",
    size: "20ft Standard Container (33 CBM)",
    weightTons: 9,
    origin: "Pune",
    destination: "Nashik",
    truckType: "LCV",
    shipmentCost: 8900,
    marketRate: 11900,
    savingsAmount: 3000,
    savingsPct: 25,
    status: "DELIVERED",
    progressPct: 100,
    currentCheckpoint: "Nashik MIDC Ambad Delivery Dock - Signed ePOD",
    eta: "Delivered",
    bookedAt: "27 Oct 2026, 11:00 AM",
    deliveredAt: "28 Oct 2026, 03:45 PM",
    carrier: {
      name: "Apex Cargo Carriers",
      vehicleNumber: "MH-12-PQ-4412",
      driverName: "Vikram Rane",
      driverPhone: "+91 94220 19023",
      carrierRating: 4.9,
    },
    milestones: [
      { id: "m-1", status: "BOOKED", title: "Booked & Assigned", location: "Pune Bhosari", timestamp: "11:00 IST", completed: true, current: false },
      { id: "m-2", status: "DISPATCHED", title: "Dispatched", location: "Pune Gate 2", timestamp: "13:00 IST", completed: true, current: false },
      { id: "m-3", status: "IN TRANSIT", title: "Sangamner Pass", location: "NH-60 KM 118", timestamp: "18:20 IST", completed: true, current: false },
      { id: "m-4", status: "DELIVERED", title: "ePOD Signed", location: "Nashik Ambad", timestamp: "09:45 IST", completed: true, current: false },
    ],
  },
];

export default function ShipmentTracker() {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_FALLBACK);
  const [origin, setOrigin] = useState("Mumbai");
  const [destination, setDestination] = useState("Pune");
  const [commodity, setCommodity] = useState("Automobile");
  const [truckType, setTruckType] = useState<"HCV" | "MCV" | "LCV">("HCV");
  const [size, setSize] = useState(SIZES[0]);
  const [weightTons, setWeightTons] = useState(16);

  const [searchTrackingId, setSearchTrackingId] = useState("");
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(INITIAL_FALLBACK[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justBookedId, setJustBookedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic cost estimates for the booking preview
  const estimatedDistance = origin === destination ? 50 : 160;
  const ratePerKm = truckType === "HCV" ? 42 : truckType === "MCV" ? 30 : 22;
  const estMarketCost = Math.round(estimatedDistance * ratePerKm * (weightTons / 10 + 0.8));
  const estBackhaulCost = Math.round(estMarketCost * 0.74);
  const estSavings = estMarketCost - estBackhaulCost;
  const estEtaHours = `${(estimatedDistance / 45).toFixed(1)} hrs`;

  // Fetch from backend on load
  useEffect(() => {
    async function loadData() {
      const data = await shipmentApi.getAll();
      if (data && data.length > 0) {
        setShipments(data);
        setActiveShipment(data[0]);
      }
    }
    loadData();
  }, []);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const query = searchTrackingId.trim().toUpperCase();
    if (!query) return;

    setIsLoading(true);
    // Try backend first
    const backendResult = await shipmentApi.getByTrackingId(query);
    if (backendResult) {
      setActiveShipment(backendResult);
      setIsLoading(false);
      return;
    }

    // Try local memory fallback
    const match = shipments.find(s => s.trackingId.toUpperCase() === query);
    if (match) {
      setActiveShipment(match);
    } else {
      setErrorMessage(`No consignment registered with tracking ID: ${query}`);
    }
    setIsLoading(false);
  };

  const handleBookShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const input: CreateShipmentInput = {
      origin,
      destination,
      commodity,
      truckType,
      size,
      weightTons,
    };

    const newShipment = await shipmentApi.createShipment(input);
    if (newShipment) {
      setShipments(prev => [newShipment, ...prev]);
      setActiveShipment(newShipment);
      setJustBookedId(newShipment.trackingId);
      setSearchTrackingId(newShipment.trackingId);
    } else {
      // Local fallback creation
      const localId = `BKH-${Math.floor(1000 + Math.random() * 9000)}-${origin.substring(0, 3).toUpperCase()}`;
      const localShipment: Shipment = {
        id: `shp-${Date.now()}`,
        trackingId: localId,
        origin,
        destination,
        commodity,
        truckType,
        size,
        weightTons,
        shipmentCost: estBackhaulCost,
        marketRate: estMarketCost,
        savingsAmount: estSavings,
        savingsPct: 26,
        status: "BOOKED",
        progressPct: 20,
        currentCheckpoint: `${origin} Freight Terminal Gate 1`,
        eta: estEtaHours,
        bookedAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }),
        carrier: {
          name: "Backhaul Verified Fleet",
          vehicleNumber: `MH-${Math.floor(10 + Math.random() * 89)}-TX-4401`,
          driverName: "Ramesh Sharma",
          driverPhone: "+91 98200 55102",
          carrierRating: 4.8,
        },
        milestones: [
          { id: "m1", status: "BOOKED", title: "Consignment Booked", location: `${origin} Terminal`, timestamp: "Just now", completed: true, current: true },
          { id: "m2", status: "DISPATCHED", title: "Gate Cleared", location: `${origin} Exit Dock`, timestamp: "Pending", completed: false, current: false },
          { id: "m3", status: "IN TRANSIT", title: `Corridor Route to ${destination}`, location: "Express Highway", timestamp: "Pending", completed: false, current: false },
          { id: "m4", status: "DELIVERED", title: `Delivery at ${destination}`, location: `${destination} Warehouse`, timestamp: "Pending", completed: false, current: false },
        ],
      };
      setShipments(prev => [localShipment, ...prev]);
      setActiveShipment(localShipment);
      setJustBookedId(localId);
      setSearchTrackingId(localId);
    }
    setIsLoading(false);
  };

  const handleAdvanceMilestone = async () => {
    if (!activeShipment) return;
    const stages: ShipmentStatus[] = ["BOOKED", "DISPATCHED", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"];
    const currIndex = stages.indexOf(activeShipment.status);
    const nextStatus = stages[Math.min(currIndex + 1, stages.length - 1)];
    if (nextStatus === activeShipment.status) return;

    const updated = await shipmentApi.updateStatus(activeShipment.trackingId, nextStatus);
    if (updated) {
      setActiveShipment(updated);
      setShipments(prev => prev.map(s => s.trackingId === updated.trackingId ? updated : s));
    } else {
      // Local progression
      const localUpdated: Shipment = {
        ...activeShipment,
        status: nextStatus,
        progressPct: nextStatus === 'DELIVERED' ? 100 : activeShipment.progressPct + 25,
        currentCheckpoint: nextStatus === 'DELIVERED' ? `${activeShipment.destination} Hub - POD Signed` : `En route ${activeShipment.destination}`,
      };
      setActiveShipment(localUpdated);
      setShipments(prev => prev.map(s => s.trackingId === localUpdated.trackingId ? localUpdated : s));
    }
  };

  return (
    <section id="shipments-module" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0b1120] text-gray-100 border-b border-gray-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rust font-mono text-xs font-semibold tracking-wider uppercase mb-1">
              <Package size={16} />
              <span>Commercial Freight Operations</span>
            </div>
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight text-white">
              Shipment Booking & Live Milestone Tracker
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">
              Dispatch commercial freight onto unladen return rigs with cryptographic tracking IDs & real-time milestone telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 border border-gray-800 px-3 py-1.5 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">Tracking Engine: Online</span>
          </div>
        </div>

        {/* Two-Column Grid: Booking Form (Left) & Live Tracker (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Book Shipment */}
          <div className="lg:col-span-5 bg-slate-900 border border-gray-800 rounded-md p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5 border-b border-gray-800/80 pb-4">
                <div className="p-2 rounded bg-rust/10 text-rust">
                  <Truck size={20} />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold uppercase text-white">Book Empty-Leg Shipment</h3>
                  <span className="font-mono text-xs text-gray-400">Lock discounted carrier backhaul rates</span>
                </div>
              </div>

              <form onSubmit={handleBookShipment} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-1 font-medium">ORIGIN</label>
                    <select
                      value={origin}
                      onChange={e => setOrigin(e.target.value)}
                      className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
                    >
                      {CITIES.map(c => (
                        <option key={c} value={c} disabled={c === destination}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-1 font-medium">DESTINATION</label>
                    <select
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
                    >
                      {CITIES.map(c => (
                        <option key={c} value={c} disabled={c === origin}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-1 font-medium">COMMODITY</label>
                    <select
                      value={commodity}
                      onChange={e => setCommodity(e.target.value)}
                      className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
                    >
                      {COMMODITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-1 font-medium">TRUCK CATEGORY</label>
                    <select
                      value={truckType}
                      onChange={e => setTruckType(e.target.value as any)}
                      className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
                    >
                      <option value="HCV">HCV (16–35T Heavy)</option>
                      <option value="MCV">MCV (8–16T Medium)</option>
                      <option value="LCV">LCV (3.5–7.5T Light)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block font-mono text-xs text-gray-400 mb-1 font-medium">CONTAINER SIZE</label>
                    <select
                      value={size}
                      onChange={e => setSize(e.target.value)}
                      className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-xs font-mono focus:border-rust outline-none truncate"
                    >
                      {SIZES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-400 mb-1 font-medium">WEIGHT (TONS)</label>
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={weightTons}
                      onChange={e => setWeightTons(Number(e.target.value))}
                      className="w-full bg-[#060911] border border-gray-700 text-white rounded px-3 py-2 text-sm font-mono focus:border-rust outline-none"
                    />
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-[#060911] border border-gray-800 rounded p-4 space-y-2 mt-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">CLIENT BACKHAUL RATE:</span>
                    <span className="text-xl font-headline font-bold text-sky-400">₹{estBackhaulCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">SAVINGS VS SPOT MARKET:</span>
                    <span className="text-emerald-400 font-bold">Saves ₹{estSavings.toLocaleString('en-IN')} (26%)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-t border-gray-800 pt-2">
                    <span className="text-gray-400">ESTIMATED TRANSIT ETA:</span>
                    <span className="text-amber-400 font-semibold">{estEtaHours}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 bg-rust hover:bg-rust-hover transition-colors text-white font-mono font-bold text-xs uppercase py-3 px-4 rounded flex items-center justify-center gap-2 shadow-lg shadow-rust/20 cursor-pointer"
                >
                  <Package size={15} />
                  <span>BOOK SHIPMENT & GENERATE TRACKING ID</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>

            {justBookedId && (
              <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/60 rounded flex items-center justify-between text-xs font-mono text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Booked! Tracking ID: <strong>{justBookedId}</strong></span>
                </div>
                <button
                  onClick={() => handleCopy(justBookedId)}
                  className="flex items-center gap-1 text-emerald-400 hover:text-white font-bold ml-2 cursor-pointer"
                >
                  {copiedId === justBookedId ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedId === justBookedId ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Shipment Tracker */}
          <div className="lg:col-span-7 bg-slate-900 border border-gray-800 rounded-md p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Tracker Search Bar */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-sky-500/10 text-sky-400">
                    <Search size={20} />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold uppercase text-white">Live Consignment Tracker</h3>
                    <span className="font-mono text-xs text-gray-400">Real-time status, GPS checkpoints & ePOD verification</span>
                  </div>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. BKH-9842-BOM)..."
                    value={searchTrackingId}
                    onChange={e => setSearchTrackingId(e.target.value)}
                    className="flex-1 bg-[#060911] border border-gray-700 text-white rounded px-4 py-2.5 font-mono text-xs focus:border-sky-400 outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 transition text-white px-5 py-2.5 rounded font-mono font-bold text-xs uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Search size={14} />
                    <span>Track</span>
                  </button>
                </form>

                {/* Quick Lookup Chips */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Quick Lookup:</span>
                  {shipments.slice(0, 4).map(s => (
                    <button
                      key={s.trackingId}
                      type="button"
                      onClick={() => {
                        setSearchTrackingId(s.trackingId);
                        setActiveShipment(s);
                        setErrorMessage(null);
                      }}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 border border-gray-700 transition cursor-pointer"
                    >
                      {s.trackingId}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rust/10 border border-rust/60 text-rust rounded font-mono text-xs flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Active Shipment Telemetry Display */}
              {activeShipment && (
                <div className="bg-[#060911] border border-gray-800 rounded-md p-5 space-y-6">
                  
                  {/* Top Bar of Active Card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline text-2xl font-bold text-white tracking-wide">
                          {activeShipment.trackingId}
                        </span>
                        <button
                          onClick={() => handleCopy(activeShipment.trackingId)}
                          className="text-gray-400 hover:text-white transition p-1 cursor-pointer"
                          title="Copy Tracking ID"
                        >
                          {copiedId === activeShipment.trackingId ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                        </button>
                      </div>
                      <span className="font-mono text-xs text-gray-400">
                        {activeShipment.origin} ➔ {activeShipment.destination} • {activeShipment.commodity} ({activeShipment.weightTons}T)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                          activeShipment.status === 'DELIVERED'
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                            : activeShipment.status === 'IN TRANSIT'
                            ? 'bg-sky-950/60 border-sky-400 text-sky-400'
                            : 'bg-amber-950/60 border-amber-500 text-amber-400'
                        }`}
                      >
                        {activeShipment.status}
                      </span>
                      <button
                        onClick={handleAdvanceMilestone}
                        className="text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-gray-300 border border-gray-700 px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition"
                        title="Simulate Transporter Milestone Update"
                      >
                        <RefreshCw size={11} />
                        <span>Simulate Next Stage</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & ETA */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <MapPin size={13} className="text-rust" />
                        <span>Current Checkpoint: <strong className="text-gray-200">{activeShipment.currentCheckpoint}</strong></span>
                      </span>
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Clock size={13} />
                        <span>ETA: {activeShipment.eta}</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rust via-sky-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${activeShipment.progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones Stepper */}
                  <div className="space-y-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">
                      Corridor Milestone Progression
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeShipment.milestones.map((m, idx) => (
                        <div
                          key={m.id || idx}
                          className={`p-3 rounded border font-mono text-xs transition-all ${
                            m.completed
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-gray-200'
                              : m.current
                              ? 'bg-sky-950/30 border-sky-400 text-white ring-1 ring-sky-400/30'
                              : 'bg-slate-900/50 border-gray-800/80 text-gray-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold flex items-center gap-1.5">
                              {m.completed ? (
                                <CheckCircle2 size={14} className="text-emerald-400" />
                              ) : (
                                <span className={`w-2 h-2 rounded-full ${m.current ? 'bg-sky-400 animate-ping' : 'bg-gray-600'}`} />
                              )}
                              <span>{m.title}</span>
                            </span>
                            <span className="text-[10px] text-gray-400">{m.timestamp}</span>
                          </div>
                          <div className="text-[11px] text-gray-400 pl-4">{m.location}</div>
                          {m.notes && <div className="text-[10px] text-sky-400/90 pl-4 mt-1 font-sans">{m.notes}</div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carrier & Transporter Details */}
                  <div className="bg-slate-900/80 border border-gray-800 rounded p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-gray-500 block">CARRIER</span>
                      <span className="text-gray-200 font-semibold">{activeShipment.carrier.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">ASSIGNED RIG</span>
                      <span className="text-sky-400 font-semibold">{activeShipment.carrier.vehicleNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">DRIVER / CONTACT</span>
                      <span className="text-gray-200 flex items-center gap-1">
                        <Phone size={11} className="text-emerald-400" />
                        <span>{activeShipment.carrier.driverPhone}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">TRANSPORTER TRUST</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <ShieldCheck size={13} />
                        <span>{activeShipment.carrier.carrierRating} / 5.0</span>
                      </span>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Footer Telemetry */}
            <div className="mt-4 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5">
                <Navigation size={13} className="text-sky-400" />
                <span>Geofencing Active on NH-48 / NH-60 / NH-44</span>
              </span>
              <span>All checkpoints time-stamped via GPS gateway</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
