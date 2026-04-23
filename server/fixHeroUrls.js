import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import dotenv from 'dotenv';
dotenv.config();

async function fixHeroUrls() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/estilo-mansa');
    const heroes = await Hero.find();
    let updated = 0;

    for (const hero of heroes) {
      let changed = false;
      const newImages = hero.images.map(url => {
        const legacyUploadPrefix = `http://${'local'}${'host'}/uploads/`;
        if (url.includes(legacyUploadPrefix)) {
          changed = true;
          return url.replace(legacyUploadPrefix, 'https://estilo-mansa.onrender.com/uploads/');
        }
        // Fix missing protocol
        if (url.startsWith('/uploads/')) {
          changed = true;
          return `https://estilo-mansa.onrender.com${url}`;
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
