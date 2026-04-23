import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const rooms = [
  {
    name: 'Luxury Suite',
    description: 'Experience unparalleled luxury in our signature suite with breathtaking mountain views and premium amenities.',
    price: 15000,
    capacity: 2,
    amenities: ['Mountain View', 'Private Balcony', 'King Size Bed', 'Mini Bar'],
    images: ['/src/assets/IMG_8813.jpeg', '/src/assets/IMG_8814.jpeg', '/src/assets/IMG_8815.jpeg'],
    videos: ['/src/assets/WhatsApp Video 2026-04-22 at 07.36.09.mp4']
  },
  {
    name: 'Mountain View Deluxe',
    description: 'Wake up to the clouds in our deluxe room featuring floor-to-ceiling windows and contemporary decor.',
    price: 12000,
    capacity: 2,
    amenities: ['Cloud View', 'Work Station', 'Premium Bath', 'Smart TV'],
    images: ['/src/assets/IMG_8816.jpeg', '/src/assets/IMG_8817.jpeg', '/src/assets/IMG_8818.jpeg'],
    videos: ['/src/assets/WhatsApp Video 2026-04-22 at 07.36.29.mp4']
  },
  {
    name: 'Signature Glass Villa',
    description: 'Our most unique stay, surrounded by glass walls that make you feel one with the Lakkidi mist.',
    price: 18000,
    capacity: 2,
    amenities: ['360 Degree View', 'Private Deck', 'Glass Walls', 'Luxury Spa Bath'],
    images: ['/src/assets/IMG_8819.jpeg', '/src/assets/IMG_8820.jpeg', '/src/assets/IMG_8821.jpeg'],
    videos: ['/src/assets/WhatsApp Video 2026-04-22 at 07.36.38.mp4']
  }
];

const seedRooms = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb+srv://admin:admin123@cluster0.mongodb.net/estilo_mansa';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    await Room.insertMany(rooms);
    console.log('Inserted seed rooms with asset paths');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedRooms();
