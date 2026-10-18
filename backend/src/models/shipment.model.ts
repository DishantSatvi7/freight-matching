export type ShipmentStatus = 
  | 'BOOKED' 
  | 'DISPATCHED' 
  | 'IN_TRANSIT' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED';

export type TruckType = 'HCV' | 'MCV' | 'LCV';

export interface Milestone {
  id: string;
  status: ShipmentStatus;
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  notes?: string;
}

export interface CarrierInfo {
  name: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  carrierRating: number;
  currentLat?: number;
  currentLng?: number;
}

export interface Shipment {
  id: string;
  trackingId: string;
  commodity: string;
  size: string;
  weightTons: number;
  origin: string;
  destination: string;
  truckType: TruckType;
  shipmentCost: number;
  marketRate: number;
  savingsAmount: number;
  savingsPct: number;
  status: ShipmentStatus;
  progressPct: number;
  currentCheckpoint: string;
  eta: string;
  bookedAt: string;
  deliveredAt?: string;
  carrier: CarrierInfo;
  milestones: Milestone[];
}

export interface CreateShipmentInput {
  origin: string;
  destination: string;
  commodity: string;
  truckType: TruckType;
  size: string;
  weightTons: number;
}
