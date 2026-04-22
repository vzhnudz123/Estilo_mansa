import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import Content from './models/Content.js';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const heroes = await Hero.find();
  const contents = await Content.find();
  console.log('--- HEROES ---');
  console.log(JSON.stringify(heroes, null, 2));
  console.log('--- CONTENTS ---');
  console.log(JSON.stringify(contents, null, 2));
  process.exit();
}
check();
