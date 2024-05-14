import { interactions } from '@/services/sc';
import { Address, AddressValue, BytesValue } from '@multiversx/sdk-core/out';

export const newPoolTx = async (
  first_token_id: string,
  second_token_id: string
) => {
  return interactions.mainRouter.scCall({
    functionName: 'newPair',
    arg: [
      BytesValue.fromUTF8(first_token_id),
      BytesValue.fromUTF8(second_token_id)
    ]
  });
};

export const createLp = async (
  poolAddress: string,
  lpName: string,
  lpTicker: string
) => {
  return interactions.mainRouter.EGLDPayment({
    value: 0.05,
    functionName: 'issueLpToken',
    arg: [
      new AddressValue(Address.fromBech32(poolAddress)),
      BytesValue.fromUTF8(lpName),
      BytesValue.fromUTF8(lpTicker)
    ],
    gasL: 150_000_000
  });
};
