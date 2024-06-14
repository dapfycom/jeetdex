import { pairContractAbi } from '@/localConstants/globals';
import { SmartContractInteraction } from '@/services/sc/call';
import { IElrondAccountToken } from '@/types/scTypes';
import { BigUIntValue } from '@multiversx/sdk-core/out';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import BigNumber from 'bignumber.js';

export const removeLiquidity = (
  pairAddress: string,
  liquidity: IElrondAccountToken,
  amounts: { firstTokenAmount: string; secondTokenAmount: string }
): Promise<SendTransactionReturnType> => {
  const interaction = new SmartContractInteraction(
    pairAddress,
    pairContractAbi
  );
  return interaction.ESDTTransfer({
    functionName: 'removeLiquidity',
    token: {
      collection: liquidity.identifier,
      decimals: liquidity.decimals
    },
    realValue: new BigNumber(liquidity.balance).toFixed(0),

    arg: [
      new BigUIntValue(new BigNumber(amounts.firstTokenAmount).toFixed(0)),
      new BigUIntValue(new BigNumber(amounts.secondTokenAmount).toFixed(0))
    ]
  });
};
