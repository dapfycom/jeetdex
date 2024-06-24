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
    address: data.caller,
    user: data?.caller ? data.caller.slice(data.caller.length - 4) : null,
    date: data.date,
    token: data.firstToken
  };
};
