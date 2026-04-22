import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import dotenv from 'dotenv';
import { MONGO_URI } from './config/runtime.js';
dotenv.config();

async function check() {
  await mongoose.connect(MONGO_URI);
  const heroes = await Hero.find();
  console.log(JSON.stringify(heroes, null, 2));
  process.exit();
}
check();
