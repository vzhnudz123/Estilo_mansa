import {
  DEFAULT_DB_NAME,
  DEFAULT_MONGO_URI,
  LEGACY_LOCAL_UPLOAD_PREFIX,
  resolveApiOrigin,
  resolveServerOrigin,
} from '../../shared/urlConfig.js';

export const APP_ORIGIN = resolveServerOrigin(process.env);
export const API_ORIGIN = resolveApiOrigin(process.env);
export const LOCAL_DB_NAME = DEFAULT_DB_NAME;
export const MONGO_URI = process.env.MONGO_URI || DEFAULT_MONGO_URI;
export const LOCAL_MONGO_URI = DEFAULT_MONGO_URI;
export const LEGACY_UPLOAD_PREFIX = LEGACY_LOCAL_UPLOAD_PREFIX;

export const buildUploadUrl = (filename = '') =>
  `${APP_ORIGIN}/uploads/${String(filename).replace(/^\/+/, '')}`;
