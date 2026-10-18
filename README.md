# Freight Matching Platform // BACKHAUL AI Network & Shipment Tracker

A high-velocity freight rebalancing and consignment tracking platform built as a clean Monorepo comprising a **Next.js 14 App Router frontend** and a **Node.js / Express TypeScript backend**.

---

## 🏗 Monorepo Architecture

```
freight-matching/
├── .github/
│   └── workflows/
│       ├── frontend.yml      # CI/CD: Next.js type-check & build
│       └── backend.yml       # CI/CD: Node/Express type-check & build
├── frontend/                 # Next.js App Router application
│   ├── public/
│   ├── src/
│   │   ├── app/              # Layout, page & global theme styles
│   │   ├── components/       # ShipmentTracker, CorridorIntelligence, etc.
│   │   ├── lib/              # API client with fallback tolerance
│   │   └── types/            # Shared TypeScript shipment interfaces
│   ├── .env.local            # Local development environment (gitignored)
│   ├── .env.example          # Committed template (safe, no secrets)
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                  # Node.js / Express TypeScript API
│   ├── src/
│   │   ├── controllers/      # ShipmentController, CorridorController
│   │   ├── middleware/       # Global error handler
│   │   ├── models/           # Shipment, Milestone, Corridor models
│   │   ├── routes/           # REST endpoints for tracking & corridors
│   │   ├── services/         # ShipmentService (booking, status lifecycle)
│   │   └── index.ts          # Server entry point
│   ├── .env                  # Local server environment (gitignored)
│   ├── .env.example          # Committed template (safe, no secrets)
│   ├── tsconfig.json
│   └── package.json
├── .gitignore                # Root catch-all protecting secrets & build artifacts
├── README.md
└── package.json              # Root npm workspaces orchestrator
```

---

## 📦 Shipment Tracker Capabilities

### Backend Endpoints
- `GET /api/shipments` — Retrieve list of all registered consignments.
- `GET /api/shipments/:trackingId` — Real-time telemetry lookup, milestone timestamps, driver info, and vehicle coordinates.
- `POST /api/shipments` — Book unladen return haulage, compute backhaul discount (25-30%), and generate unique tracking ID (`BKH-XXXX-XXX`).
- `PATCH /api/shipments/:trackingId/status` — Advance milestone progression (`BOOKED` ➔ `DISPATCHED` ➔ `IN_TRANSIT` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`).

### Frontend Features
- **Booking & Discount Calculator:** Computes client backhaul rates, estimated spot market savings, and ETA.
- **Real-Time Telemetry Bar:** Dynamic progression percentage, active checkpoint, and remaining travel time.
- **Milestone Stepper:** Step-by-step visual tracker with timestamps, status badges, and carrier notes.
- **Transporter Verification:** Driver details, vehicle registration numbers, and transporter trust ratings.
- **Simulation Control:** Quick action button to simulate transporter milestone updates in real-time.

---

## 🚀 Quick Start (Development)

### 1. Install Dependencies
Run from the monorepo root:
```bash
npm install
```

### 2. Start Both Applications Concurrently
```bash
npm run dev
```
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

### 3. Individual Service Commands
```bash
# Frontend only
npm run dev --workspace=frontend
npm run build --workspace=frontend

# Backend only
npm run dev --workspace=backend
npm run build --workspace=backend
```

---

## 🔒 Environment Variables

Verify that all secrets remain outside git tracking:
- Frontend: Copy `frontend/.env.example` to `frontend/.env.local`
- Backend: Copy `backend/.env.example` to `backend/.env`

Both `.env` and `.env.local` are protected by `.gitignore`.
