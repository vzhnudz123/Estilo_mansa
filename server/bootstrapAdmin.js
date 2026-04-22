import User from './models/User.js';

const DEFAULT_ADMIN = {
  name: 'Estilo Admin',
  email: 'admin@estilomansa.com',
  password: 'adminpassword123',
};

const normalizeEmail = (value = '') => value.trim().toLowerCase();

export async function ensureAdminUser(logger = console) {
  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL || DEFAULT_ADMIN.email);
  const adminName = (process.env.ADMIN_NAME || DEFAULT_ADMIN.name).trim();
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN.password;

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    logger.info?.(`Admin account ready: ${existingAdmin.email}`);
    return { created: false, email: existingAdmin.email };
  }

  const existingUser = await User.findOne({
    email: { $regex: `^${adminEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
  });

  if (existingUser) {
    existingUser.role = 'admin';
    existingUser.email = adminEmail;
    await existingUser.save();
    logger.info?.(`Promoted existing user to admin: ${adminEmail}`);
    return { created: false, promoted: true, email: adminEmail };
  }

  const adminUser = new User({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  });

  await adminUser.save();

  if (!process.env.ADMIN_PASSWORD) {
    logger.warn?.('Admin user created with the default password. Set ADMIN_PASSWORD in Render and rotate the password.');
  }

  logger.info?.(`Created admin user: ${adminEmail}`);
  return { created: true, email: adminEmail };
}
