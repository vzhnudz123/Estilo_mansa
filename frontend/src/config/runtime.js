import { resolveApiOrigin, resolveFrontendOrigin, resolveServerOrigin } from '../../../shared/urlConfig.js';

export const APP_ORIGIN = resolveFrontendOrigin(import.meta.env);
export const SERVER_ORIGIN = resolveServerOrigin(import.meta.env);
export const API_BASE_URL = resolveApiOrigin(import.meta.env);
