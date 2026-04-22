import dotenv from 'dotenv';
import connectDB from './db.js';
import { ensureAdminUser } from './bootstrapAdmin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    const result = await ensureAdminUser(console);
    console.log('✅ Admin setup complete.');
    console.log(`👉 Email: ${result.email}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.log('👉 Password: adminpassword123');
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
