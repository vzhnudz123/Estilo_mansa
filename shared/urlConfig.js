const stripTrailingSlashes = (value = '') => String(value).replace(/\/+$/, '');

export const URL_MODE = 'production';

export const URLS = {
  development: {
    frontendOrigin: 'http://localhost:5173',
    serverOrigin: 'http://localhost:3000',
  },
  production: {
    frontendOrigin: 'https://estilo-mansa.vercel.app',
    serverOrigin: 'https://estilo-mansa.onrender.com',
  },
};

export const DEFAULT_DB_NAME = 'estilo_mansa';
export const DEFAULT_MONGO_URI = `mongodb://localhost:27017/${DEFAULT_DB_NAME}`;
export const LEGACY_LOCAL_UPLOAD_PREFIX = 'http://localhost/uploads/';

export const resolveMode = (env = {}) => {
  if (URL_MODE === 'development' || URL_MODE === 'production') return URL_MODE;
  if (env.MODE) return env.MODE;
  if (env.NODE_ENV) return env.NODE_ENV;
  return 'development';
};

export const resolveFrontendOrigin = (env = {}) => {
  const mode = resolveMode(env) === 'production' ? 'production' : 'development';
  return stripTrailingSlashes(env.VITE_APP_URL || URLS[mode].frontendOrigin);
};

export const resolveServerOrigin = (env = {}) => {
  const mode = resolveMode(env) === 'production' ? 'production' : 'development';
  return stripTrailingSlashes(env.BASE_URL || env.VITE_SERVER_URL || URLS[mode].serverOrigin);
};

export const resolveApiOrigin = (env = {}) =>
  stripTrailingSlashes(env.VITE_API_URL || `${resolveServerOrigin(env)}/api`);
