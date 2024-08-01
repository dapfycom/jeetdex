import { tokensID } from '@/config';
import { bondingContractAbi } from '@/localConstants/globals';
import { BigUIntValue, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { SmartContractInteraction } from '../call';

export const swap = async ({
  contract,
  tokenIn,
  tokenOut,
  amountOut,
  amountIn /* Amount in is a normal number like 0.5 1 or 2 */,
  initialSwap
}: {
  contract: string;
  tokenIn: string;
  tokenOut: string;
  amountOut: string;
  amountIn: string;
  initialSwap?: boolean;
}): Promise<SendTransactionReturnType> => {
  console.log(contract);
  console.log(tokenIn);
  console.log(tokenOut);
  console.log(amountOut);
  console.log(amountIn);

  const interaction = new SmartContractInteraction(
    contract,
    bondingContractAbi
  );

  const args = [
    new TokenIdentifierValue(tokenOut),
    new BigUIntValue(amountOut)
  ];

  if (tokenIn === tokensID.egld) {
    console.log('egld');

    return interaction.wrapEgldAndEsdtTranfer({
      functionName: initialSwap ? 'initialSwap' : 'swap',
      arg: args,
      value: amountIn,
      gasL: 400000000
    });
  } else {
    return interaction.ESDTTransfer({
      functionName: initialSwap ? 'initialSwap' : 'swap',
      arg: args,
      token: {
        collection: tokenIn,
        decimals: 18
      },
      value: amountIn,
      gasL: 400000000
    });
  }
};
