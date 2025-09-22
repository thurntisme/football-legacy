import { LOCALSTORAGE_GUEST_USER } from '@/constants/football/guest-user';
import { IGuestUser } from '@/types/football/guest-user';

export const isGuestExpired = () => {
  const data: any = {};
  if (!data.expire_time) return false;

  const now = new Date();
  const expire = new Date(data.expire_time);
  return now < expire;
};

export const storeGuestData = (user: IGuestUser) => {
  const now = new Date();
  const expire = new Date(now);
  expire.setDate(now.getDate() + 1);

  const guestUser = {
    user_uuid: crypto.randomUUID(),
    created_at: now.toISOString(),
    last_active_at: now.toISOString(),
    expire_time: expire.toISOString(),
    trial_data: {
      step: 0,
      preferences: {},
      answers: [],
    },
    user_data: { ...user },
  };
};

export const getGuestData = () => {
  const data: any = {};
  return data?.user_data || {};
};

export const removeGuestData = () => {};
