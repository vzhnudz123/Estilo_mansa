import { ROUTES } from '../utils/routes';

export const SITE_NAME = 'EstiloMansa Homestay';
export const SITE_URL = (import.meta.env.VITE_APP_URL || 'https://www.estilomansa.in').replace(/\/+$/, '');

export const BUSINESS_INFO = {
  name: 'EstiloMansa Homestay',
  shortName: 'Estilo Mansa',
  phone: '+91 9037706644',
  email: 'estilomansa@gmail.com',
  locality: 'Wayanad',
  streetAddress: 'Mansa Hills, Lakkidi, Kunnathidavaka',
  region: 'Kerala',
  postalCode: '673576',
  country: 'IN',
  mapUrl: 'https://maps.app.goo.gl/ik7G6VygDg6wMmMY8',
  instagram: 'https://www.instagram.com/estilo_mansa?igsh=ZjRnZDJvNjlqd3c4',
  latitude: 11.516104,
  longitude: 76.012543,
  priceRange: '₹₹',
};

export const DEFAULT_KEYWORDS = [
  'homestay in Wayanad',
  'budget stay Kerala',
  'Wayanad rooms booking',
  'EstiloMansa homestay',
  'Wayanad stay',
  'Lakkidi homestay',
];

export const buildAbsoluteUrl = (value = '') => {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

const cleanSchema = (value) => {
  if (Array.isArray(value)) {
    return value.map(cleanSchema).filter((item) => item !== undefined);
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, cleanSchema(item)])
      .filter(([, item]) => item !== undefined && item !== '' && !(Array.isArray(item) && item.length === 0));

    return Object.fromEntries(entries);
  }

  return value === undefined ? undefined : value;
};

export const createLodgingSchema = ({ url = ROUTES.home, image, description } = {}) => cleanSchema({
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: BUSINESS_INFO.name,
  url: buildAbsoluteUrl(url),
  image: image ? [buildAbsoluteUrl(image)] : undefined,
  description,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  priceRange: BUSINESS_INFO.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.streetAddress,
    addressLocality: BUSINESS_INFO.locality,
    addressRegion: BUSINESS_INFO.region,
    postalCode: BUSINESS_INFO.postalCode,
    addressCountry: BUSINESS_INFO.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_INFO.latitude,
    longitude: BUSINESS_INFO.longitude,
  },
  sameAs: [BUSINESS_INFO.instagram, BUSINESS_INFO.mapUrl],
});

export const createWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
});

export const createBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildAbsoluteUrl(item.url),
  })),
});

export const createRoomSchema = ({ name, description, image, url }) => cleanSchema({
  '@context': 'https://schema.org',
  '@type': 'HotelRoom',
  name,
  description,
  url: buildAbsoluteUrl(url),
  image: image ? [buildAbsoluteUrl(image)] : undefined,
  containedInPlace: {
    '@type': 'LodgingBusiness',
    name: BUSINESS_INFO.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.locality,
      addressRegion: BUSINESS_INFO.region,
      addressCountry: BUSINESS_INFO.country,
    },
  },
});
