import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import dotenv from 'dotenv';
import { APP_ORIGIN, LEGACY_UPLOAD_PREFIX, MONGO_URI } from './config/runtime.js';
dotenv.config();

async function fixHeroUrls() {
  try {
    await mongoose.connect(MONGO_URI);
    const heroes = await Hero.find();
    let updated = 0;

    for (const hero of heroes) {
      let changed = false;
      const newImages = hero.images.map(url => {
        if (url.includes(LEGACY_UPLOAD_PREFIX)) {
          changed = true;
          return url.replace(LEGACY_UPLOAD_PREFIX, `${APP_ORIGIN}/uploads/`);
        }
        // Fix missing protocol
        if (url.startsWith('/uploads/')) {
          changed = true;
          return `${APP_ORIGIN}${url}`;
        }
        return url;
      });

      if (changed) {
        hero.images = newImages;
        await hero.save();
        updated++;
      }
    }
    console.log(`✅ Fixed ${updated} heroes`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fixHeroUrls();
