import { Shipment, CreateShipmentInput, ShipmentStatus, Milestone } from '../models/shipment.model';

// Seeded shipments aligned with Backhaul's live network
const INITIAL_SHIPMENTS: Shipment[] = [
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
    bookedAt: "2026-10-18T10:30:00.000Z",
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
      {
        id: "m-1",
        status: "BOOKED",
        title: "Consignment Confirmed & Truck Reserved",
        location: "JNPT Freight Yard, Navi Mumbai",
        timestamp: "2026-10-18 10:30 IST",
        completed: true,
        current: false,
        notes: "Assigned empty return HCV unit MH-04-EK-9182.",
      },
      {
        id: "m-2",
        status: "DISPATCHED",
        title: "Loaded & Gate-Out Security Scanned",
        location: "JNPT Central Bay Dock 3",
        timestamp: "2026-10-18 11:45 IST",
        completed: true,
        current: false,
        notes: "Gross weight 28.4T verified on weighbridge.",
      },
      {
        id: "m-3",
        status: "IN_TRANSIT",
        title: "Cruising on Mumbai-Pune Expressway",
        location: "Khalapur Toll KM 38",
        timestamp: "2026-10-18 13:10 IST",
        completed: false,
        current: true,
        notes: "Speed telemetry normal at 62 km/h.",
      },
      {
        id: "m-4",
        status: "OUT_FOR_DELIVERY",
        title: "Final Approach / Industrial Hub Entry",
        location: "Chakan Industrial Zone Ph-2",
        timestamp: "Expected 15:45 IST",
        completed: false,
        current: false,
      },
      {
        id: "m-5",
        status: "DELIVERED",
        title: "Consignee Signature & ePOD Upload",
        location: "Pune Auto Cluster Hub Dock B",
        timestamp: "Pending",
        completed: false,
        current: false,
      },
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
    bookedAt: "2026-10-18T13:15:00.000Z",
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
      {
        id: "m-1",
        status: "BOOKED",
        title: "Consignment Booked & Assigned",
        location: "Surat Ring Road GIDC Depot",
        timestamp: "2026-10-18 13:15 IST",
        completed: true,
        current: true,
        notes: "Loading slated for 14:00 IST.",
      },
      {
        id: "m-2",
        status: "DISPATCHED",
        title: "Dispatched from Origin",
        location: "Surat GIDC Terminal",
        timestamp: "Expected 14:30 IST",
        completed: false,
        current: false,
      },
      {
        id: "m-3",
        status: "IN_TRANSIT",
        title: "En Route NH-48 Vadodara Bypass",
        location: "Vadodara Express Highway",
        timestamp: "Expected 16:30 IST",
        completed: false,
        current: false,
      },
      {
        id: "m-4",
        status: "DELIVERED",
        title: "Delivered to Ahmedabad Hub",
        location: "Narol Industrial Estate, Ahmedabad",
        timestamp: "Expected 18:30 IST",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: "shp-3",
    trackingId: "BKH-6350-PNQ",
    commodity: "Pharmaceuticals",
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
    bookedAt: "2026-10-17T11:00:00.000Z",
    deliveredAt: "2026-10-18T09:45:00.000Z",
    carrier: {
      name: "Apex Cargo Carriers",
      vehicleNumber: "MH-12-PQ-4412",
      driverName: "Vikram Rane",
      driverPhone: "+91 94220 19023",
      carrierRating: 4.9,
      currentLat: 19.9975,
      currentLng: 73.7898,
    },
    milestones: [
      {
        id: "m-1",
        status: "BOOKED",
        title: "Order Placed & Cold Chain HCV Assigned",
        location: "Pune Bhosari MIDC Depot",
        timestamp: "2026-10-17 11:00 IST",
        completed: true,
        current: false,
      },
      {
        id: "m-2",
        status: "DISPATCHED",
        title: "Cold Seal Inspected & Dispatched",
        location: "Pune Bhosari Gate 2",
        timestamp: "2026-10-17 13:00 IST",
        completed: true,
        current: false,
      },
      {
        id: "m-3",
        status: "IN_TRANSIT",
        title: "Crossed Sangamner Pass Checkpoint",
        location: "NH-60 KM 118",
        timestamp: "2026-10-17 18:20 IST",
        completed: true,
        current: false,
      },
      {
        id: "m-4",
        status: "DELIVERED",
        title: "Delivered & Digital ePOD Validated",
        location: "Nashik Ambad Industrial Dock",
        timestamp: "2026-10-18 09:45 IST",
        completed: true,
        current: false,
        notes: "Recipient confirmed intact seal #BC-8891.",
      },
    ],
  },
  {
    id: "shp-4",
    trackingId: "BKH-5421-HYD",
    commodity: "Steel & Forgings",
    size: "32ft Multi-Axle Container (64 CBM)",
    weightTons: 24,
    origin: "Hyderabad",
    destination: "Nagpur",
    truckType: "HCV",
    shipmentCost: 26800,
    marketRate: 35500,
    savingsAmount: 8700,
    savingsPct: 25,
    status: "IN_TRANSIT",
    progressPct: 45,
    currentCheckpoint: "NH-44 Adilabad Bypass Toll Plaza",
    eta: "6.5 hrs",
    bookedAt: "2026-10-18T07:20:00.000Z",
    carrier: {
      name: "TransNational Haulers",
      vehicleNumber: "TS-08-UA-7019",
      driverName: "Ramulu Goud",
      driverPhone: "+91 99890 32194",
      carrierRating: 4.8,
      currentLat: 19.6641,
      currentLng: 78.5320,
    },
    milestones: [
      {
        id: "m-1",
        status: "BOOKED",
        title: "Shipment Registered",
        location: "Hyderabad Sanathnagar Logistics Park",
        timestamp: "2026-10-18 07:20 IST",
        completed: true,
        current: false,
      },
      {
        id: "m-2",
        status: "DISPATCHED",
        title: "Trailer Hitched and Gate Cleared",
        location: "Medchal Outer Ring Road",
        timestamp: "2026-10-18 09:00 IST",
        completed: true,
        current: false,
      },
      {
        id: "m-3",
        status: "IN_TRANSIT",
        title: "Approaching Adilabad Telangana-MH Border",
        location: "NH-44 Toll Plaza KM 288",
        timestamp: "2026-10-18 12:45 IST",
        completed: false,
        current: true,
      },
      {
        id: "m-4",
        status: "DELIVERED",
        title: "Delivery at Nagpur Logistics City",
        location: "MIHAN Industrial Corridor, Nagpur",
        timestamp: "Expected 19:30 IST",
        completed: false,
        current: false,
      },
    ],
  },
];

class ShipmentService {
  private shipments: Shipment[] = [...INITIAL_SHIPMENTS];

  public getAllShipments(): Shipment[] {
    return this.shipments;
  }

  public getShipmentByTrackingId(trackingId: string): Shipment | null {
    const cleanId = trackingId.trim().toUpperCase();
    return this.shipments.find(s => s.trackingId.toUpperCase() === cleanId) || null;
  }

  public createShipment(input: CreateShipmentInput): Shipment {
    // Generate clean unique tracking ID like BKH-8273-BOM
    const cityCodes: Record<string, string> = {
      Mumbai: "BOM",
      Pune: "PNQ",
      Nashik: "ISK",
      Surat: "STV",
      Ahmedabad: "AMD",
      Indore: "IDR",
      Nagpur: "NAG",
      Hyderabad: "HYD",
    };
    const code = cityCodes[input.origin] || input.origin.substring(0, 3).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `BKH-${randomDigits}-${code}`;

    // Standard baseline distance heuristic
    const baseDistances: Record<string, number> = {
      "Mumbai-Pune": 150,
      "Pune-Mumbai": 150,
      "Surat-Ahmedabad": 260,
      "Ahmedabad-Surat": 260,
      "Pune-Nashik": 210,
      "Nashik-Pune": 210,
      "Hyderabad-Nagpur": 500,
      "Nagpur-Hyderabad": 500,
      "Mumbai-Surat": 280,
      "Surat-Mumbai": 280,
    };
    const routeKey = `${input.origin}-${input.destination}`;
    const distanceKm = baseDistances[routeKey] || 320;

    // Rate calculations
    const ratePerKm = input.truckType === 'HCV' ? 42 : input.truckType === 'MCV' ? 30 : 22;
    const marketRate = Math.round(distanceKm * ratePerKm * (input.weightTons / 10 + 0.8));
    const savingsPct = 25 + Math.floor(Math.random() * 6); // 25-30% backhaul discount
    const shipmentCost = Math.round(marketRate * (1 - savingsPct / 100));
    const savingsAmount = marketRate - shipmentCost;
    const etaHours = `${(distanceKm / 45).toFixed(1)} hrs`;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const carriers = [
      { name: "TransNational Haulers", phone: "+91 98201 11223", rating: 4.8 },
      { name: "Apex Cargo Carriers", phone: "+91 97140 44556", rating: 4.9 },
      { name: "Gujarat Freightways", phone: "+91 94220 77889", rating: 4.7 },
      { name: "FastTrack Logistics", phone: "+91 98890 99001", rating: 4.8 },
    ];
    const assignedCarrier = carriers[Math.floor(Math.random() * carriers.length)];
    const vehicleNumber = `${input.origin === "Mumbai" || input.origin === "Pune" || input.origin === "Nashik" ? "MH" : input.origin === "Surat" || input.origin === "Ahmedabad" ? "GJ" : "TS"}-${Math.floor(10 + Math.random() * 89)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(1000 + Math.random() * 8999)}`;

    const newShipment: Shipment = {
      id: `shp-${Date.now()}`,
      trackingId,
      commodity: input.commodity,
      size: input.size,
      weightTons: Number(input.weightTons),
      origin: input.origin,
      destination: input.destination,
      truckType: input.truckType,
      shipmentCost,
      marketRate,
      savingsAmount,
      savingsPct,
      status: "BOOKED",
      progressPct: 15,
      currentCheckpoint: `${input.origin} Logistics Terminal Dock ${Math.floor(1 + Math.random() * 9)}`,
      eta: etaHours,
      bookedAt: now.toISOString(),
      carrier: {
        name: assignedCarrier.name,
        vehicleNumber,
        driverName: "Driver Assigned",
        driverPhone: assignedCarrier.phone,
        carrierRating: assignedCarrier.rating,
      },
      milestones: [
        {
          id: `m-1-${Date.now()}`,
          status: "BOOKED",
          title: "Consignment Booked & Backhaul Unit Locked",
          location: `${input.origin} Freight Hub`,
          timestamp: formattedDate,
          completed: true,
          current: true,
          notes: `Vehicle ${vehicleNumber} allocated for return haul to ${input.destination}.`,
        },
        {
          id: `m-2-${Date.now()}`,
          status: "DISPATCHED",
          title: "Loading & Gate Clearance",
          location: `${input.origin} Hub Dock`,
          timestamp: "Pending",
          completed: false,
          current: false,
        },
        {
          id: `m-3-${Date.now()}`,
          status: "IN_TRANSIT",
          title: `Transit Along Corridor to ${input.destination}`,
          location: `Highway Checkpoint En Route`,
          timestamp: "Pending",
          completed: false,
          current: false,
        },
        {
          id: `m-4-${Date.now()}`,
          status: "DELIVERED",
          title: `Delivery & Sign-off at Destination`,
          location: `${input.destination} Terminal`,
          timestamp: "Pending",
          completed: false,
          current: false,
        },
      ],
    };

    this.shipments.unshift(newShipment);
    return newShipment;
  }

  public updateStatus(trackingId: string, status: ShipmentStatus, checkpoint?: string): Shipment | null {
    const shipment = this.getShipmentByTrackingId(trackingId);
    if (!shipment) return null;

    shipment.status = status;
    if (checkpoint) {
      shipment.currentCheckpoint = checkpoint;
    }

    const statusWeights: Record<ShipmentStatus, number> = {
      BOOKED: 20,
      DISPATCHED: 40,
      IN_TRANSIT: 70,
      OUT_FOR_DELIVERY: 90,
      DELIVERED: 100,
    };
    shipment.progressPct = statusWeights[status];

    if (status === 'DELIVERED') {
      shipment.deliveredAt = new Date().toISOString();
      shipment.eta = 'Delivered';
    }

    // Update milestone state
    shipment.milestones.forEach(m => {
      if (m.status === status) {
        m.completed = true;
        m.current = true;
        m.timestamp = new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (statusWeights[m.status] < statusWeights[status]) {
        m.completed = true;
        m.current = false;
      } else {
        m.completed = false;
        m.current = false;
      }
    });

    return shipment;
  }
}

export const shipmentService = new ShipmentService();
