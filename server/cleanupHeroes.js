import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import dotenv from 'dotenv';
dotenv.config();

async function cleanup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await Hero.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} hero slides.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
cleanup();
