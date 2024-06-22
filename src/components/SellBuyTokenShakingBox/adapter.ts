import { tokensID } from '@/config';
import { ISwapInEventData } from '@/types/eventsApi.types';

export const adaptSwapInEventData = (
  data?: ISwapInEventData
): {
  user: string;
  amount: string;
  token: string;
  type: string;
  address: string;
} => {
  if (!data) return null;
  return {
    user: data.caller.slice(data.caller.length - 4),
    amount:
      data.tokenIn === tokensID.jeet ? data.tokenAmountIn : data.tokenAmountOut,

    token: data.tokenIn === tokensID.jeet ? data.tokenOut : data.tokenIn,
    type: data.tokenIn === tokensID.jeet ? 'sold' : 'bought',
    address: data.caller
  };
};
