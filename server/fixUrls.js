import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';
import { APP_ORIGIN, LEGACY_UPLOAD_PREFIX, MONGO_URI } from './config/runtime.js';

dotenv.config();

const fixUrls = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const contents = await Content.find();
    console.log(`🔍 Checking ${contents.length} content items...`);

    let updatedCount = 0;

    for (const item of contents) {
      if (item.images && item.images.length > 0) {
        const newImages = item.images.map(url => {
          if (url.includes(LEGACY_UPLOAD_PREFIX)) {
            return url.replace(LEGACY_UPLOAD_PREFIX, `${APP_ORIGIN}/uploads/`);
          }
          return url;
        });

        // Check if any image URL actually changed
        if (JSON.stringify(newImages) !== JSON.stringify(item.images)) {
          item.images = newImages;
          await item.save();
          console.log(`✅ Fixed URLs for key: ${item.key}`);
          updatedCount++;
        }
      }
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} items.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing URLs:', error);
    process.exit(1);
  }
};

fixUrls();
