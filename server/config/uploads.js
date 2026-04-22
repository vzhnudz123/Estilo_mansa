import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const DEFAULT_PUBLIC_ORIGIN = 'https://estilo-mansa.onrender.com';
const CONFIGURED_PUBLIC_ORIGIN = (process.env.BASE_URL || '').trim().replace(/\/+$/, '');

export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || DEFAULT_UPLOAD_DIR);
export const PUBLIC_ORIGIN = CONFIGURED_PUBLIC_ORIGIN || DEFAULT_PUBLIC_ORIGIN;

export const ensureUploadDir = () => {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
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
