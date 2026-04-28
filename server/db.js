import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri && process.env.NODE_ENV === 'production') {
      throw new Error('MONGO_URI must be set in production');
    }
    await mongoose.connect(uri || 'mongodb://localhost:27017/estilo_mansa')
    console.log('✅ MongoDB Connected')
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message)
    process.exit(1)
  }
}

export default connectDB
