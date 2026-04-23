import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/estilo_mansa');
    console.log('✅ Connected to MongoDB');

    const adminEmail = 'admin@estilomansa.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists. Login with admin@estilomansa.com');
      process.exit(0);
    }

    const adminUser = new User({
      name: 'Estilo Admin',
      email: adminEmail,
      password: 'adminpassword123', // Will be hashed by the pre-save hook
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('👉 Email: admin@estilomansa.com');
    console.log('👉 Password: adminpassword123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
