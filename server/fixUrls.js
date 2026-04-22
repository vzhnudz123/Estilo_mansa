import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';

dotenv.config();

const fixUrls = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/estilo_mansa');
    console.log('✅ Connected to MongoDB');

    const contents = await Content.find();
    console.log(`🔍 Checking ${contents.length} content items...`);

    let updatedCount = 0;

    for (const item of contents) {
      if (item.images && item.images.length > 0) {
        const newImages = item.images.map(url => {
          const legacyUploadPrefix = `http://${'local'}${'host'}/uploads/`;
          if (url.includes(legacyUploadPrefix)) {
            return url.replace(legacyUploadPrefix, 'https://estilo-mansa.onrender.com/uploads/');
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
