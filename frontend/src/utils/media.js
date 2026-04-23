import api from '../api/axios';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

const getBackendOrigin = () => {
  try {
    return new URL(api.defaults.baseURL).origin;
  } catch {
    return '';
  }
};

export const resolveMediaUrl = (value) => {
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  // Handle local asset paths (e.g. /src/assets/...)
  if (trimmed.startsWith('/src/assets/')) {
    return trimmed;
  }

  // Handle external URLs
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    // If it's just a filename, assume it's in assets
    if (!trimmed.includes('/') && !trimmed.startsWith('http')) {
      return `/src/assets/${trimmed}`;
    }
    return trimmed;
  }
};
