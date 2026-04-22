import { PUBLIC_ORIGIN } from '../config/uploads.js';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);
const APP_ORIGIN = PUBLIC_ORIGIN;

export const normalizeMediaUrl = (value) => {
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith('/uploads/')) {
    return `${APP_ORIGIN}${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);

    if (LOCAL_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith('/uploads/')) {
      return `${APP_ORIGIN}${parsed.pathname}`;
    }

    return parsed.toString();
  } catch {
    return trimmed;
  }
};

export const normalizeMediaList = (items = []) =>
  Array.isArray(items) ? items.map(normalizeMediaUrl) : items;

export const normalizeRoomPayload = (room) => {
  if (!room) return room;

  const plain = typeof room.toObject === 'function' ? room.toObject() : room;

  return {
    ...plain,
    images: normalizeMediaList(plain.images),
    videos: normalizeMediaList(plain.videos),
  };
};

export const normalizeVideoPayload = (video) => {
  if (!video) return video;

  const plain = typeof video.toObject === 'function' ? video.toObject() : video;

  return {
    ...plain,
    url: normalizeMediaUrl(plain.url),
  };
};

export const normalizeHeroPayload = (hero) => {
  if (!hero) return hero;

  const plain = typeof hero.toObject === 'function' ? hero.toObject() : hero;

  return {
    ...plain,
    images: normalizeMediaList(plain.images),
  };
};
