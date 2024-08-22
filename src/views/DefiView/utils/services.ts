import { SmartContractInteraction } from '@/services/sc/call';
import { interactions } from '@/services/sc/interactions';
import { scQuery } from '@/services/sc/query';
import {
  IMoneyMarket,
  IMoneyMarketDeposit,
  IMoneyMarketReward,
  IMoneyMarkeTvl
} from '@/types/hatom.interface';
import { IElrondToken } from '@/types/scTypes';
import { Address, AddressValue } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { parsMoneyMarket } from './functions';

//calls
export const deposit = (
  amount: number | string,
  lpToken: IElrondToken,
  address: string
) => {
  return interactions.hatomParent.ESDTorEGLDTransfer({
    functionName: 'deposit',
    token: { ...lpToken, collection: lpToken.identifier },
    arg: [new AddressValue(new Address(address))],
    gasL: 600000000,
    value: new BigNumber(amount)
  });
};

export const claimUserRewards = (address: string) => {
  return interactions.hatomParent.scCall({
    functionName: 'claimUserRewards',
    gasL: 50000000,
    arg: [new AddressValue(new Address(address))]
  });
};

export const withdraw = (address: string) => {
  const tx1 = interactions.hatomParent.scCallOnlyTx({
    functionName: 'withdraw',
    gasL: 600000000,
    arg: [new AddressValue(new Address(address))]
  });

  const tx2 = interactions.hatomParent.scCallOnlyTx({
    functionName: 'rebalanceStrategy',
    gasL: 600000000,
    arg: [new AddressValue(new Address(address))]
  });

  SmartContractInteraction.sendMultipleTransactions({ txs: [tx1, tx2] });
};

// queries
export const fetchHatomMoneyMarkets = async (): Promise<IMoneyMarket[]> => {
  const res: any = await scQuery('hatomParent', 'getMoneyMarkets', []);
  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarket[] = data?.map((item: any) => {
    return parsMoneyMarket(item);
  });

  return paresedData;
};

export const fetchUserTotalRewards = async (
  userAddres: string
): Promise<IMoneyMarketReward[]> => {
  const res: any = await scQuery('hatomParent', 'getTotalRewards', [
    new AddressValue(new Address(userAddres))
  ]);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarketReward[] = data?.map((item: any) => {
    const data: IMoneyMarketReward = {
      moneyMarket: parsMoneyMarket(item.money_market),
      rewards: item.rewards.toString()
    };
    return data;
  });

  return paresedData;
};

export const fetchUserDeposits = async (
  userAddres: string
): Promise<IMoneyMarketDeposit[]> => {
  const res: any = await scQuery('hatomParent', 'getDepositEntries', [
    new AddressValue(new Address(userAddres))
  ]);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarketDeposit[] = data?.map((item: any) => {
    const data: IMoneyMarketDeposit = {
      moneyMarket: parsMoneyMarket(item.money_market),
      depositAmount: item.total_deposited_amount.toString()
    };
    return data;
  });

  return paresedData;
};

export const fetctTotalTvl = async (): Promise<IMoneyMarkeTvl[]> => {
  const res: any = await scQuery('hatomParent', 'getTVL', []);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarkeTvl[] = data?.map((item: any) => {
    return {
      moneyMarket: parsMoneyMarket(item.money_market),
      tvl: item.tvl.toString()
    };
  });

  return paresedData;
};

export const fetchHatomConfigs = async () => {
  const res: any = await scQuery('hatomParent', 'getChildrenConfig', []);

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarkeTvl[] = data?.map((item: any) => {
    const data = {
      moneyMarket: parsMoneyMarket(item.money_market),
      feePercent: item.fee_percentage.toString(),
      rewardsTokenId: item.rewards_token_id,
      minDepositAmount: item.mm_minimum_deposit_amount.toString(),
      maxBorrowPercentage: item.max_borrow_percentage.toString(),
      maxBufferPercentage: item.max_buffer_percentage.toString(),
      maxLoops: item.max_loops.toString()
    };
    return data;
  });

  return paresedData;
};
