import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import dotenv from 'dotenv';
dotenv.config();

async function createTestHero() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/estilo-mansa');
    
    const count = await Hero.countDocuments();
    if (count > 0) {
      console.log('Heroes already exist. Skipping test creation.');
      process.exit();
    }

    const testHero = new Hero({
      title: "Welcome to Estilo Mansa",
      subtitle: "Experience luxury in the lap of nature at Wayanad's finest homestay.",
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"],
      ctaTextPrimary: "Book Now",
      ctaTextSecondary: "Explore Rooms",
      isActive: true,
      order: 1
    });

    await testHero.save();
    console.log('✅ Test Hero created successfully');
    process.exit();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}
createTestHero();
