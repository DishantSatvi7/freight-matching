import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import shipmentRoutes from './routes/shipment.routes';
import corridorRoutes from './routes/corridor.routes';

// ─────────────────────────────────────────────
// 1. Load environment variables
// ─────────────────────────────────────────────
dotenv.config();
const app = express();

// ─────────────────────────────────────────────
// 2. Dynamic PORT binding (critical for Render/Railway)
// ─────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '5000', 10);

// ─────────────────────────────────────────────
// 3. Security middleware
// ─────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(compression());
app.set('trust proxy', 1); // required when behind Render/Railway reverse proxy

// ─────────────────────────────────────────────
// 4. CORS — environment-aware, multi-origin
// ─────────────────────────────────────────────
const buildAllowedOrigins = (): (string | RegExp)[] => {
  const origins: (string | RegExp)[] = [];

  // Always allow localhost in development
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost:3000');
    origins.push('http://localhost:3001');
  }

  // Parse comma-separated ALLOWED_ORIGINS env var
  const envOrigins = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '';
  envOrigins
    .split(',')
    .map(o => o.trim())
    .filter(Boolean)
    .forEach(o => origins.push(o));

  // Add backhaul default deployed URL if not present
  if (!origins.includes('https://backhaul2.netlify.app')) {
    origins.push('https://backhaul2.netlify.app');
  }

  return origins;
};

const allowedOrigins = buildAllowedOrigins();

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin header)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowed =>
      typeof allowed === 'string'
        ? allowed === origin
        : (allowed as RegExp).test(origin)
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  credentials: true, // allow cookies / Authorization headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  maxAge: 86400, // preflight cache: 24 hours
}));

// ─────────────────────────────────────────────
// 5. Rate limiting (global)
// ─────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // strict limit on login/register
  message: { error: 'Too many auth attempts, please wait 15 minutes.' },
});

app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);

// ─────────────────────────────────────────────
// 6. Body parsers
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─────────────────────────────────────────────
// 7. Database pool (shared across routes)
// ─────────────────────────────────────────────
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false,
  max: 10, // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// ─────────────────────────────────────────────
// 8. /health endpoint — verified by Render, Railway, and monitoring tools
// ─────────────────────────────────────────────
app.get('/health', async (_req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    let dbConnected = false;
    let dbLatencyMs = 0;
    let serverTime: any = null;
    let pgVersion: any = null;
    let postgisVersion: any = null;

    if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('postgresql://')) {
      const dbResult = await db.query(
        'SELECT NOW() AS db_time, version() AS pg_version'
      );
      dbLatencyMs = Date.now() - startTime;

      const postgisResult = await db.query(
        'SELECT PostGIS_Version() AS postgis_version'
      );

      dbConnected = true;
      serverTime = dbResult.rows[0]?.db_time;
      pgVersion = dbResult.rows[0]?.pg_version?.split(' ')[1] || '15.4';
      postgisVersion = postgisResult.rows[0]?.postgis_version?.split(' ')[0] || '3.3.2';
    }

    return res.status(200).json({
      status: 'healthy',
      service: 'freight-matching-api',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      database: {
        connected: dbConnected,
        latency_ms: dbLatencyMs,
        server_time: serverTime,
        pg_version: pgVersion,
        postgis_version: postgisVersion,
      },
    });
  } catch (err: any) {
    const error = err as Error;
    return res.status(503).json({
      status: 'unhealthy',
      service: 'freight-matching-api',
      timestamp: new Date().toISOString(),
      error: error.message,
      database: { connected: false },
    });
  }
});

// ─────────────────────────────────────────────
// 9. API Routes
// ─────────────────────────────────────────────
// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Freight Matching API',
    version: 'v1',
    health: '/health',
    docs: '/api/v1/docs',
  });
});

// Mount tracking and freight routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/v1/shipments', shipmentRoutes);
app.use('/api/corridors', corridorRoutes);
app.use('/api/v1/corridors', corridorRoutes);

// ─────────────────────────────────────────────
// 10. 404 handler
// ─────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─────────────────────────────────────────────
// 11. Global error handler
// ─────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const isCorsError = err.message.includes('not allowed by CORS');
  if (isCorsError) {
    return res.status(403).json({ error: err.message });
  }

  console.error('[Unhandled Error]', err);
  return res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

// ─────────────────────────────────────────────
// 12. Start server
// ─────────────────────────────────────────────
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
┌────────────────────────────────────────┐
│ Freight Matching API — RUNNING         │
│ PORT: ${PORT.toString().padEnd(32)} │
│ ENV: ${(process.env.NODE_ENV || 'development').padEnd(33)} │
│ CORS: ${allowedOrigins.length} origin(s) allowed              │
└────────────────────────────────────────┘
`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received — shutting down gracefully');
  server.close(async () => {
    await db.end();
    console.log('Database pool closed. Exiting.');
    process.exit(0);
  });
});

export default app;
