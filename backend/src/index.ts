import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shipmentRoutes from './routes/shipment.routes';
import corridorRoutes from './routes/corridor.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck & Root
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    service: 'Freight Matching & Shipment Tracker API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/corridors', corridorRoutes);

// Error handling
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[BACKHAUL SERVER] Freight API & Shipment Tracker listening on http://localhost:${PORT}`);
    console.log(`[BACKHAUL SERVER] Tracking endpoint: http://localhost:${PORT}/api/shipments/:trackingId`);
  });
}

export default app;
