import { Router, Request, Response } from 'express';

const router = Router();

const HUBS = [
  { city: "Mumbai", code: "BOM", state: "Maharashtra", lat: 19.076, lng: 72.8777 },
  { city: "Pune", code: "PNQ", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
  { city: "Nashik", code: "ISK", state: "Maharashtra", lat: 19.9975, lng: 73.7898 },
  { city: "Surat", code: "STV", state: "Gujarat", lat: 21.1702, lng: 72.8311 },
  { city: "Ahmedabad", code: "AMD", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
  { city: "Indore", code: "IDR", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { city: "Nagpur", code: "NAG", state: "Maharashtra", lat: 21.1458, lng: 79.0882 },
  { city: "Hyderabad", code: "HYD", state: "Telangana", lat: 17.385, lng: 78.4867 },
];

const CORRIDORS = [
  {
    id: "cor-1",
    code: "NH-48",
    name: "Mumbai – Pune Expressway & NH-48",
    origin: "Mumbai",
    destination: "Pune",
    distanceKm: 152,
    emptyRunningPct: 38.4,
    deadheadTrucksDay: 1420,
    fuelPrice: 97.83,
    tollAverage: 385,
    annualFuelWastedCr: 48.2,
    primaryCommodities: ["Automobile Parts", "Engineering Goods", "Chemicals"],
  },
  {
    id: "cor-2",
    code: "NH-48-GJ",
    name: "Surat – Ahmedabad Western Express",
    origin: "Surat",
    destination: "Ahmedabad",
    distanceKm: 263,
    emptyRunningPct: 41.2,
    deadheadTrucksDay: 2150,
    fuelPrice: 92.45,
    tollAverage: 510,
    annualFuelWastedCr: 72.6,
    primaryCommodities: ["Textiles & Fabrics", "Chemicals", "Diamonds & Jewelry"],
  },
  {
    id: "cor-3",
    code: "NH-60",
    name: "Pune – Nashik Industrial Corridor",
    origin: "Pune",
    destination: "Nashik",
    distanceKm: 212,
    emptyRunningPct: 35.8,
    deadheadTrucksDay: 980,
    fuelPrice: 96.12,
    tollAverage: 290,
    annualFuelWastedCr: 31.4,
    primaryCommodities: ["Pharmaceuticals", "Agricultural Produce", "Auto Forgings"],
  },
  {
    id: "cor-4",
    code: "NH-44",
    name: "Hyderabad – Nagpur North-South Spine",
    origin: "Hyderabad",
    destination: "Nagpur",
    distanceKm: 504,
    emptyRunningPct: 44.5,
    deadheadTrucksDay: 1840,
    fuelPrice: 98.24,
    tollAverage: 920,
    annualFuelWastedCr: 114.8,
    primaryCommodities: ["Steel & Coils", "Cement", "Electronics & Pharma"],
  },
];

const FUEL_PRICES: Record<string, { retail_price: string; retail_price_num: number; note: string }> = {
  Mumbai: { retail_price: "₹97.83/L", retail_price_num: 97.83, note: "Mumbai, Oct 2026" },
  Pune: { retail_price: "₹96.12/L", retail_price_num: 96.12, note: "Pune, Oct 2026" },
  Nashik: { retail_price: "₹96.48/L", retail_price_num: 96.48, note: "Nashik, Oct 2026" },
  Surat: { retail_price: "₹92.45/L", retail_price_num: 92.45, note: "Surat, Oct 2026" },
  Ahmedabad: { retail_price: "₹92.38/L", retail_price_num: 92.38, note: "Ahmedabad, Oct 2026" },
  Indore: { retail_price: "₹95.10/L", retail_price_num: 95.10, note: "Indore, Oct 2026" },
  Nagpur: { retail_price: "₹97.20/L", retail_price_num: 97.20, note: "Nagpur, Oct 2026" },
  Hyderabad: { retail_price: "₹98.24/L", retail_price_num: 98.24, note: "Hyderabad, Oct 2026" },
};

router.get('/hubs', (req: Request, res: Response) => {
  res.json({ success: true, count: HUBS.length, data: HUBS });
});

router.get('/', (req: Request, res: Response) => {
  res.json({ success: true, count: CORRIDORS.length, data: CORRIDORS });
});

router.get('/fuel-prices', (req: Request, res: Response) => {
  res.json({ success: true, timestamp: new Date().toISOString(), data: FUEL_PRICES });
});

export default router;
