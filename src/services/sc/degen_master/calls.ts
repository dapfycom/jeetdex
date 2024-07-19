import { BytesValue } from '@multiversx/sdk-core/out';
import { interactions } from '../interactions';

export const newToken = async (
  name: string,
  ticker: string,
  fee: string,
  id: string
) => {
  return interactions.degenMaster.EGLDPayment({
    functionName: 'newToken',
    arg: [
      BytesValue.fromUTF8(name),
      BytesValue.fromUTF8(ticker),
      BytesValue.fromUTF8(id)
    ],
    realValue: fee,
    gasL: 200000000
  });
};
