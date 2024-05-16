import { pairContractAbi } from '@/localConstants/globals';
import { SmartContractInteraction } from '@/services/sc/call';
import { BigUIntValue, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';

export const submitSwap = async (
  poolAddress: string,
  sendToken: string,
  sendValue: string,
  receiveToken: string,
  receiveValue: string
) => {
  const interactions = new SmartContractInteraction(
    poolAddress,
    pairContractAbi
  );
  console.log(receiveValue);

  return interactions.ESDTTransfer({
    functionName: 'swapIn',
    token: {
      collection: sendToken
    },
    realValue: sendValue,

    arg: [
      new TokenIdentifierValue(receiveToken),
      new BigUIntValue(
        new BigNumber(receiveValue).multipliedBy(0.95).toFixed(0)
      )
    ]
  });
};
