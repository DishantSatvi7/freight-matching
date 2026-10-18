-- ============================================================
-- Phase 2: PostGIS & Cloud PostgreSQL Schema Migration
-- ============================================================

-- Step 1 — Enable Extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2 — Create users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL CHECK (role IN ('shipper', 'trucker', 'admin')),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Step 3 — Create trucks Table
CREATE TABLE IF NOT EXISTS trucks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trucker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  registration_no VARCHAR(50) UNIQUE NOT NULL,
  truck_type VARCHAR(50) NOT NULL CHECK (truck_type IN ('flatbed', 'refrigerated', 'tanker', 'container', 'curtain_side')),
  capacity_tons DECIMAL(8,2) NOT NULL CHECK (capacity_tons > 0),
  is_available BOOLEAN DEFAULT true,
  -- PostGIS geometry: current truck location (longitude, latitude, SRID 4326 = WGS84)
  current_location GEOMETRY(Point, 4326),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trucks_trucker_id ON trucks(trucker_id);
CREATE INDEX IF NOT EXISTS idx_trucks_is_available ON trucks(is_available);
-- Spatial index for proximity queries
CREATE INDEX IF NOT EXISTS idx_trucks_location_gist ON trucks USING GIST(current_location);

-- Step 4 — Create trips Table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  truck_id UUID NOT NULL REFERENCES trucks(id) ON DELETE CASCADE,
  trucker_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'cancelled')),
  -- PostGIS geometry: full route as a LineString
  route_path GEOMETRY(LineString, 4326),
  -- Origin and destination as named points
  origin_point GEOMETRY(Point, 4326) NOT NULL,
  dest_point GEOMETRY(Point, 4326) NOT NULL,
  origin_name VARCHAR(255) NOT NULL,
  dest_name VARCHAR(255) NOT NULL,
  departure_time TIMESTAMPTZ NOT NULL,
  arrival_time TIMESTAMPTZ,
  distance_km DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trips_truck_id ON trips(truck_id);
CREATE INDEX IF NOT EXISTS idx_trips_trucker_id ON trips(trucker_id);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_origin_gist ON trips USING GIST(origin_point);
CREATE INDEX IF NOT EXISTS idx_trips_dest_gist ON trips USING GIST(dest_point);
CREATE INDEX IF NOT EXISTS idx_trips_route_gist ON trips USING GIST(route_path);

-- Step 5 — Create shipments Table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipper_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  weight_tons DECIMAL(8,2) NOT NULL CHECK (weight_tons > 0),
  cargo_type VARCHAR(50) NOT NULL,
  pickup_point GEOMETRY(Point, 4326) NOT NULL,
  delivery_point GEOMETRY(Point, 4326) NOT NULL,
  pickup_address VARCHAR(500) NOT NULL,
  delivery_address VARCHAR(500) NOT NULL,
  pickup_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'in_transit', 'delivered', 'cancelled')),
  budget_usd DECIMAL(10,2),
  tracking_id VARCHAR(50) UNIQUE,
  current_checkpoint VARCHAR(255),
  progress_pct INTEGER DEFAULT 0,
  eta VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shipments_shipper_id ON shipments(shipper_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_id ON shipments(tracking_id);
CREATE INDEX IF NOT EXISTS idx_shipments_pickup_gist ON shipments USING GIST(pickup_point);
CREATE INDEX IF NOT EXISTS idx_shipments_delivery_gist ON shipments USING GIST(delivery_point);

-- Step 6 — Create bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  trucker_id UUID NOT NULL REFERENCES users(id),
  shipper_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled', 'completed')),
  agreed_price DECIMAL(10,2),
  notes TEXT,
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Prevent duplicate bookings
  UNIQUE(shipment_id, trip_id)
);

CREATE INDEX IF NOT EXISTS idx_bookings_shipment_id ON bookings(shipment_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trucker_id ON bookings(trucker_id);
CREATE INDEX IF NOT EXISTS idx_bookings_shipper_id ON bookings(shipper_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Step 7 — Auto-update updated_at trigger (apply to all tables)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_trucks_updated_at ON trucks;
CREATE TRIGGER trg_trucks_updated_at
BEFORE UPDATE ON trucks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_trips_updated_at ON trips;
CREATE TRIGGER trg_trips_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_shipments_updated_at ON shipments;
CREATE TRIGGER trg_shipments_updated_at
BEFORE UPDATE ON shipments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON bookings;
CREATE TRIGGER trg_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
