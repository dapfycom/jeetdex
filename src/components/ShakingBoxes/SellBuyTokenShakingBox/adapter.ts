import { tokensID } from '@/config';
import { ISwapInEventData } from '@/types/eventsApi.types';

export const adaptSwapInEventData = (
  data?: ISwapInEventData
): {
  user: string;
  amount: string;
  token: string;
  secondToken: string;
  type: string;
  address: string;
  username: string;
} => {
  if (!data) return null;
  return {
    user: data.caller.slice(data.caller.length - 4),
    amount:
      data.tokenIn === tokensID.jeet || data.tokenIn === tokensID.wegld
        ? data.tokenAmountIn
        : data.tokenAmountOut,

    token:
      data.tokenIn === tokensID.jeet || data.tokenIn === tokensID.wegld
        ? data.tokenOut
        : data.tokenIn,
    secondToken:
      data.tokenIn === tokensID.jeet || data.tokenIn === tokensID.wegld
        ? data.tokenIn
        : data.tokenOut,
    type:
      data.tokenIn === tokensID.jeet || data.tokenIn === tokensID.wegld
        ? 'sold'
        : 'bought',
    address: data.caller,
    username: data.username
  };
};
