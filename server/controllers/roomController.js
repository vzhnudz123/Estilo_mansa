import Room from '../models/Room.js'
import { roomSchema } from '../validators/roomValidator.js'
import { normalizeMediaList, normalizeRoomPayload } from '../utils/mediaUrl.js'

export const getRooms = async (request, reply) => {
  try {
    const rooms = await Room.find()
    reply.code(200).send(rooms.map(normalizeRoomPayload))
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const getRoomById = async (request, reply) => {
  try {
    const room = await Room.findById(request.params.id)
    if (!room) return reply.code(404).send({ error: 'Room not found' })
    reply.code(200).send(normalizeRoomPayload(room))
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const createRoom = async (request, reply) => {
  try {
    const data = roomSchema.parse(request.body)
    const room = new Room({
      ...data,
      images: normalizeMediaList(data.images),
      videos: normalizeMediaList(data.videos),
    })
    await room.save()
    reply.code(201).send(normalizeRoomPayload(room))
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors })
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const updateRoom = async (request, reply) => {
  try {
    const data = roomSchema.partial().parse(request.body)
    const payload = {
      ...data,
      ...(data.images ? { images: normalizeMediaList(data.images) } : {}),
      ...(data.videos ? { videos: normalizeMediaList(data.videos) } : {}),
    }
    const room = await Room.findByIdAndUpdate(request.params.id, payload, { new: true })
    if (!room) return reply.code(404).send({ error: 'Room not found' })
    reply.code(200).send(normalizeRoomPayload(room))
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors })
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const deleteRoom = async (request, reply) => {
  try {
    const room = await Room.findByIdAndDelete(request.params.id)
    if (!room) return reply.code(404).send({ error: 'Room not found' })
    reply.code(200).send({ success: true, message: 'Room deleted' })
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' })
  }
}
