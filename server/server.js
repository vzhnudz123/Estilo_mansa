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
import uploadRoutes from './routes/uploadRoutes.js'
import heroRoutes from './routes/heroRoutes.js'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

// Connect to Database
connectDB()

const app = Fastify({ logger: true })

// Security & Utility Plugins
app.register(helmet, { crossOriginResourcePolicy: { policy: "cross-origin" } })
app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
})

app.register(fastifyMultipart, { limits: { fileSize: 15 * 1024 * 1024 } }) // 15MB max
app.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/',
})
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
})
app.register(jwt, {
  secret: process.env.JWT_SECRET || 'super-secret-key-estilo-mansa'
})

// Custom Middleware
app.register(authMiddleware)

// Routes
app.register(authRoutes, { prefix: '/api/auth' })
app.register(roomRoutes, { prefix: '/api/rooms' })
app.register(bookingRoutes, { prefix: '/api/bookings' })
app.register(eventRoutes, { prefix: '/api/events' })
app.register(contentRoutes, { prefix: '/api/content' })
app.register(uploadRoutes, { prefix: '/api/upload' })
app.register(heroRoutes, { prefix: '/api/hero' })

// Test route
app.get('/', async (req, reply) => {
  return { message: 'Estilo Mansa API Server Running 🚀' }
})

// Start server
const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()