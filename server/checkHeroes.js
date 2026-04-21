import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/estilo-mansa');
  const heroes = await Hero.find();
  console.log(JSON.stringify(heroes, null, 2));
  process.exit();
}
check();
