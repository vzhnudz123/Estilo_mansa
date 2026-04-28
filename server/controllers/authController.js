import User from '../models/User.js'
import { registerSchema, loginSchema } from '../validators/authValidator.js'

export const register = async (request, reply) => {
  try {
    const data = registerSchema.parse(request.body)
    
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      return reply.code(400).send({ error: 'Email already exists' })
    }

    const user = new User(data)
    await user.save()

    const token = request.server.jwt.sign({ id: user._id, role: user.role })
    reply.code(201).send({ token, user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl || '', role: user.role } })
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors })
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const login = async (request, reply) => {
  try {
    const data = loginSchema.parse(request.body)
    
    const user = await User.findOne({ email: data.email })
    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(data.password)
    if (!isMatch) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    const token = request.server.jwt.sign({ id: user._id, role: user.role })
    reply.code(200).send({ token, user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl || '', role: user.role } })
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors })
    reply.code(500).send({ error: 'Internal server error' })
  }
}
