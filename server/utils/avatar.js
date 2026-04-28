import crypto from 'crypto';

const gravatarHash = (email = '') =>
  crypto.createHash('md5').update(String(email).trim().toLowerCase()).digest('hex');

export const resolveAvatarUrl = ({ email = '', avatarUrl = '' } = {}) => {
  if (avatarUrl) return avatarUrl;
  if (!email) return '';
  return `https://www.gravatar.com/avatar/${gravatarHash(email)}?d=identicon&s=160`;
};
