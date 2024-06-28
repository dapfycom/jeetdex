import { tokensID } from '@/config';
import { pairContractAbi } from '@/localConstants/globals';
import store from '@/redux/store';
import { agService } from '@/services/rest/ash';
import { SmartContractInteraction } from '@/services/sc/call';
import { interactions } from '@/services/sc/interactions';
import { getWspOfWrapedEgld } from '@/utils/mx-utils';
import { SorSwapResponse } from '@ashswap/ash-sdk-js/out';
import {
  Address,
  BigUIntValue,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';

export const submitSwap = async (
  poolAddress: string,
  sendToken: string,
  sendValue: string,
  receiveToken: string,
  receiveValue: string,
  slippage: number
) => {
  const interactions = new SmartContractInteraction(
    poolAddress,
    pairContractAbi
  );

  return interactions.ESDTTransfer({
    functionName: 'swapIn',
    token: {
      collection: sendToken
    },
    realValue: sendValue,

    arg: [
      new TokenIdentifierValue(receiveToken),
      new BigUIntValue(
        new BigNumber(receiveValue).multipliedBy(1 - slippage / 100).toFixed(0)
      )
    ]
  });
};

export const submitSwapWithAshAggregator = async (
  sorswap: SorSwapResponse,
  slippage: number
) => {
  if (!sorswap) throw new Error(`Could not find any paths for EGLD to ASH`);
  const transactions = [];
  console.log(sorswap);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (sorswap.__from === tokensID.egld) {
    const shard = store.getState().dapp.shard;
    const wrapedWsp = getWspOfWrapedEgld(shard);

    // const t0 = await EGLDPaymentOnlyTx(wrapedWsp, "wrapEgld", fromToken.value);
    const t0 = interactions[wrapedWsp].EGLDPaymentOnlyTx({
      functionName: 'wrapEgld',
      realValue: sorswap.swapAmountWithDecimal
    });
    transactions.push(t0);
  }

  const interaction = await agService.aggregateFromPaths(
    sorswap,
    slippage * 100,
    () => Promise.resolve(true)
  );

  const tx1 = interaction
    .withSender(new Address(store.getState().dapp.userAddress))
    .check()
    .buildTransaction();
  transactions.push(tx1);
  console.log(tx1);

  return await SmartContractInteraction.sendMultipleTransactions({
    txs: transactions as any
  });
};
