import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCAL_UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const RENDER_PERSISTENT_UPLOAD_DIR = '/var/data/uploads';
const DEFAULT_PUBLIC_ORIGIN = 'https://estilo-mansa.onrender.com';
const CONFIGURED_PUBLIC_ORIGIN = (process.env.BASE_URL || '').trim().replace(/\/+$/, '');

const isRenderRuntime = () =>
  process.env.RENDER === 'true' ||
  Boolean(process.env.RENDER_SERVICE_ID || process.env.RENDER_EXTERNAL_URL);

const hasRenderPersistentRoot = () => {
  try {
    return fs.existsSync(path.dirname(RENDER_PERSISTENT_UPLOAD_DIR));
  } catch {
    return false;
  }
};

const getDefaultUploadDir = () => {
  if (isRenderRuntime() && hasRenderPersistentRoot()) {
    return RENDER_PERSISTENT_UPLOAD_DIR;
  }

  return LOCAL_UPLOAD_DIR;
};

const CONFIGURED_UPLOAD_DIR = (process.env.UPLOAD_DIR || '').trim();

export const UPLOAD_DIR = path.resolve(CONFIGURED_UPLOAD_DIR || getDefaultUploadDir());
export const PUBLIC_ORIGIN = CONFIGURED_PUBLIC_ORIGIN || DEFAULT_PUBLIC_ORIGIN;

export const ensureUploadDir = () => {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
};

export const warnIfEphemeralUploadDir = () => {
  if (!isRenderRuntime() || CONFIGURED_UPLOAD_DIR || UPLOAD_DIR.startsWith('/var/data/')) {
    return;
  }

  console.warn(
    `[uploads] Files are being saved to ${UPLOAD_DIR}. Render service filesystems are ephemeral, so uploaded images can disappear after a restart or deploy. Add a Render persistent disk mounted at /var/data or set UPLOAD_DIR to a persistent storage path.`
  );
};

export const getRequestOrigin = (request) => {
  const host = request?.headers?.host;
  if (!host) {
    return PUBLIC_ORIGIN;
  }

  const forwardedProto = request?.headers?.['x-forwarded-proto'];
  const protocol = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto || request?.protocol || 'https';

  return `${protocol}://${host}`.replace(/\/+$/, '');
};

export const buildUploadUrl = (request, filename) => {
  const requestOrigin = getRequestOrigin(request);
  const publicOrigin = CONFIGURED_PUBLIC_ORIGIN
    ? (new URL(CONFIGURED_PUBLIC_ORIGIN).host === request?.headers?.host ? requestOrigin : CONFIGURED_PUBLIC_ORIGIN)
    : requestOrigin;

  return `${publicOrigin}/uploads/${filename}`;
};
