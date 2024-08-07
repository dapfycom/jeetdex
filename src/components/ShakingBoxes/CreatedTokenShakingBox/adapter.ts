import { IPairCreatedEventData } from '@/types/eventsApi.types';

export const adaptPairCreatedData = (
  data?: IPairCreatedEventData
): {
  user: string;
  token: string;
  date: string;
  address: string;
} => {
  if (!data) return null;
  return {
    address: data.address,
    user: data?.caller
      ? data?.caller.startsWith('erd')
        ? data.caller.slice(data.caller.length - 4)
        : data.caller
      : null,
    date: data.date,
    token: data.firstToken
  };
};
