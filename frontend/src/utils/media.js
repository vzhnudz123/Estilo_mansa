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

  const backendOrigin = getBackendOrigin();

  if (trimmed.startsWith('/uploads/') && backendOrigin) {
    return `${backendOrigin}${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);

    if (LOCAL_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith('/uploads/') && backendOrigin) {
      return `${backendOrigin}${parsed.pathname}`;
    }

    return parsed.toString();
  } catch {
    return trimmed;
  }
};
