/**
 * seedGallery.js
 * Run: node seedGallery.js
 * Seeds all images currently in /uploads into the Gallery collection.
 */
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Gallery from './models/Gallery.js';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

await connectDB();

const files = fs.readdirSync(UPLOADS_DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
console.log(`Found ${files.length} image(s) in uploads/`);

let added = 0;
for (const [i, file] of files.entries()) {
  const url = `${BASE_URL}/uploads/${file}`;
  const exists = await Gallery.findOne({ url });
  if (!exists) {
    await Gallery.create({ url, caption: '', order: i, isFeatured: i < 6, isActive: true });
    console.log(`  ✅  Added: ${file}`);
    added++;
  } else {
    console.log(`  ⏭   Skipped (already exists): ${file}`);
  }
}

console.log(`\nDone. Added ${added} new gallery image(s).`);
mongoose.connection.close();
