import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import communityRoutes from './routes/communities.js';
import channelRoutes from './routes/channels.js';
import { setupSockets } from './sockets/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Trust proxy – required on Render / load balancers
app.set('trust proxy', 1);

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || process.env.NODE_ENV !== 'production') return cb(null, true);
    const allowed = [CLIENT_URL, process.env.RENDER_EXTERNAL_URL].filter(Boolean);
    if (allowed.some((a) => origin.startsWith(String(a).replace(/\/$/, '')))) {
      return cb(null, true);
    }
    if (origin.includes('onrender.com')) return cb(null, true);
    cb(null, true);
  },
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Too many auth attempts, try again later' },
});

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', name: 'Aether', time: new Date().toISOString() });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/channels', channelRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err?.name === 'MulterError') {
    return res.status(400).json({ error: err.message });
  }
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

setupSockets(server, CLIENT_URL);

server.listen(PORT, () => {
  console.log(`Aether backend running on http://localhost:${PORT}`);
  console.log(`Client expected at ${CLIENT_URL}`);
});
