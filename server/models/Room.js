import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0 },
  capacity: { type: Number, default: 0 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  videos: [{ type: String }]
}, { timestamps: true })

export default mongoose.model('Room', roomSchema)
