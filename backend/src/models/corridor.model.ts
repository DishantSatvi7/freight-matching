export interface Corridor {
  id: string;
  code: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  emptyRunningPct: number;
  deadheadTrucksDay: number;
  fuelPrice: number;
  tollAverage: number;
  annualFuelWastedCr: number;
  primaryCommodities: string[];
}

export interface Hub {
  city: string;
  code: string;
  state: string;
  lat: number;
  lng: number;
}
