import { IPairCreatedEventData } from '@/types/eventsApi.types';
import { formatTokenI } from '@/utils/mx-utils';

export const adaptPairCreatedData = (
  data?: IPairCreatedEventData
): {
  user: string;
  token: string;
  date: string;
} => {
  if (!data) return null;
  return {
    user: data.caller.slice(data.caller.length - 4),
    date: data.date,
    token: formatTokenI(data.firstToken)
  };
};
