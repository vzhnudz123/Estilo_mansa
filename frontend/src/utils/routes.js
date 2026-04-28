export const ROUTES = {
  home: '/homestay-in-wayanad',
  legacyHome: '/',
  rooms: '/rooms-in-wayanad',
  legacyRooms: '/rooms',
  roomDetails: (id = ':id') => `/rooms-in-wayanad/${id}`,
  legacyRoomDetails: (id = ':id') => `/rooms/${id}`,
  gallery: '/gallery',
  contact: '/contact',
  login: '/login',
  register: '/register',
  admin: '/admin',
  homeSection: (id) => `/homestay-in-wayanad#${id}`,
};

export const HOME_PATHS = new Set([ROUTES.home, ROUTES.legacyHome]);
export const ROOM_PATHS = new Set([ROUTES.rooms, ROUTES.legacyRooms]);
