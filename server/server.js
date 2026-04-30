import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'
import connectDB from './db.js'

import authMiddleware from './middlewares/auth.js'
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import heroRoutes from './routes/heroRoutes.js'
import storyRoutes from './routes/storyRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

connectDB()

const app = Fastify({ 
  logger: true,
  ignoreTrailingSlash: true 
})

const allowedOrigins = [
  'https://www.estilomansa.in',
  'https://estilomansa.in',
  'http://localhost:5173', // Keep for development
];

// Security & Utility Plugins
app.register(helmet, { crossOriginResourcePolicy: { policy: 'cross-origin' } })
app.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
      return;
    }
    cb(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
})
app.register(rateLimit, { 
  max: 100, 
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({ error: 'Too many requests', message: 'Please try again later' })
})
app.register(jwt, {
  secret: process.env.JWT_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET must be set in production');
    return 'dev-secret-only-not-for-prod';
  })(),
})

app.get('/health', { config: { rateLimit: false } }, async (_request, reply) => {
  return reply.code(200).send({ status: 'ok' })
})

// Custom auth middleware
app.register(authMiddleware)

// Routes
app.register(authRoutes,     { prefix: '/api/auth' })
app.register(roomRoutes,     { prefix: '/api/rooms' })
app.register(bookingRoutes,  { prefix: '/api/bookings' })
app.register(eventRoutes,    { prefix: '/api/events' })
app.register(contentRoutes,  { prefix: '/api/content' })
app.register(heroRoutes,     { prefix: '/api/hero' })
app.register(storyRoutes,    { prefix: '/api/story' })
app.register(galleryRoutes,  { prefix: '/api/gallery' })
app.register(feedbackRoutes, { prefix: '/api/feedback' })
app.register(videoRoutes,    { prefix: '/api/videos' })

app.get('/', async () => ({ message: 'Estilo Mansa API Server Running 🚀' }))

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
    console.log(`🚀 Server running on ${process.env.BASE_URL || 'https://estilo-mansa.onrender.com'}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
