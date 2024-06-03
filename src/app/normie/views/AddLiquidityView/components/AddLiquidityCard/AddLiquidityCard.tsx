'use client';
import { Button } from '@/components/ui/button';
import { SmartContractInteraction } from '@/services/sc/call';
import { IElrondAccountToken } from '@/types/scTypes';
import { formatBalance } from '@/utils/mx-utils';
import { BigUIntValue, TokenTransfer } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { IPoolPair } from '../../../PoolsView/utils/types';
import InputBox from '../../../SwapView/commons/SwapCard/commons/InputBox';

export interface AddLiquidityCardProps {
  pool: IPoolPair;
}

const AddLiquidityCard = ({ pool }: AddLiquidityCardProps) => {
  const [firstTokenAmount, setFirstTokenAmount] = useState<string>('');
  const [secondTokenAmount, setSecondTokenAmount] = useState<string>('');

  const handleOnChangeFirstAmount = (val: string) => {
    console.log(val);

    setFirstTokenAmount(val);

    if (val) {
      setSecondTokenAmount(
        new BigNumber(pool.ratio).multipliedBy(val).toString()
      );
    }
  };

  const handleOnChangeSecondAmount = (val: string) => {
    setSecondTokenAmount(val);
    if (val) {
      setFirstTokenAmount(
        new BigNumber(1).dividedBy(pool.ratio).multipliedBy(val).toString()
      );
    }
  };

  const handlePercentFirstAmount = (
    accountToken: IElrondAccountToken,
    percent: number
  ) => {
    const newAccount = { ...accountToken };
    newAccount.balance = new BigNumber(accountToken.balance)
      .multipliedBy(percent)
      .dividedBy(100)
      .toFixed();
    const userAmount = formatBalance(newAccount, true) as number;

    handleOnChangeFirstAmount(userAmount.toString());
  };

  const handleAddLiquidity = async () => {
    const int = new SmartContractInteraction(pool.address);
    await int.MultiESDTNFTTransfer({
      functionName: 'addLiquidity',
      tokens: [
        {
          collection: pool.firstTokenId,
          nonce: 0,
          value: firstTokenAmount,
          decimals: pool.firstToken.decimals
        },
        {
          collection: pool.secondTokenId,
          nonce: 0,
          value: secondTokenAmount,
          decimals: pool.secondToken.decimals
        }
      ],
      arg: [
        new BigUIntValue(
          TokenTransfer.fungibleFromAmount(
            pool.firstTokenId,
            firstTokenAmount,
            pool.firstToken.decimals
          ).amount
        ),
        new BigUIntValue(
          TokenTransfer.fungibleFromAmount(
            pool.secondTokenId,
            secondTokenAmount,
            pool.secondToken.decimals
          ).amount
        )
      ]
    });
  };

  return (
    <div className='bg-card px-5 rounded-3xl py-6'>
      <div className='text-center'>
        <h3 className='text-2xl'>Deposit amounts</h3>

        <div className='text-muted-foreground text-sm max-w-[400px] mx-auto my-3'>
          The total amount you deposit in the pool influences the size of your
          pool share and the rewards you’ll receive.
        </div>
      </div>

      <div className='my-5 w-full flex justify-center'>
        <div className='flex flex-col gap-1'>
          <InputBox
            onChange={handleOnChangeFirstAmount}
            onChangeToken={() => {}}
            selectedTokenI={pool.firstTokenId}
            tokensIdentifiers={[]}
            value={firstTokenAmount}
            label=''
            handlePercentAmount={handlePercentFirstAmount}
          />

          <InputBox
            onChange={handleOnChangeSecondAmount}
            onChangeToken={() => {}}
            selectedTokenI={pool.secondTokenId}
            tokensIdentifiers={[]}
            label={''}
            value={secondTokenAmount}
            handlePercentAmount={handlePercentFirstAmount}
          />
        </div>
      </div>

      <Button className='w-full' onClick={handleAddLiquidity}>
        Add Liquidity
      </Button>
    </div>
  );
};

export default AddLiquidityCard;
