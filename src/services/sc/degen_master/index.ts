import { BytesValue } from '@multiversx/sdk-core/out';
import { interactions } from '../interactions';
import { scQuery } from '../query';

// queries
export const fetchNewTokenFee = async () => {
  const res = await scQuery('degenMaster', 'getNewTokenFee');

  return res.firstValue?.valueOf().toString();
};

// calls
export const newToken = async (name: string, ticker: string, fee: string) => {
  return interactions.degenMaster.EGLDPayment({
    functionName: 'newToken',
    arg: [BytesValue.fromUTF8(name), BytesValue.fromUTF8(ticker)],
    realValue: fee
  });
};
