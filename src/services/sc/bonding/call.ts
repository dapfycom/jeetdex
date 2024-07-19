import { tokensID } from '@/config';
import { bondingContractAbi } from '@/localConstants/globals';
import { BigUIntValue, BytesValue } from '@multiversx/sdk-core/out';
import { SmartContractInteraction } from '../call';

export const swap = async ({
  contract,
  tokenIn,
  tokenOut,
  amountOut,
  amountIn
}: {
  contract: string;
  tokenIn: string;
  tokenOut: string;
  amountOut: string;
  amountIn: string;
}) => {
  const interaction = new SmartContractInteraction(
    contract,
    bondingContractAbi
  );

  console.log({
    contract,
    tokenIn,
    tokenOut,
    amountOut,
    amountIn
  });

  const args = [BytesValue.fromUTF8(tokenOut), new BigUIntValue(amountOut)];

  if (tokenIn === tokensID.egld) {
    return interaction.wrapEgldAndEsdtTranfer({
      functionName: 'swap',
      arg: args,
      value: amountIn,
      gasL: 200000000
    });
  } else {
    return interaction.ESDTTransfer({
      functionName: 'swap',
      arg: args,
      token: {
        collection: tokenIn,
        decimals: 18
      },
      value: amountIn,
      gasL: 200000000
    });
  }
};
