'use client';
import { Button } from '@/components/ui/button';
import useTxNotification from '@/hooks/useTxNotification';
import { SmartContractInteraction } from '@/services/sc/call';
import { IElrondAccountToken } from '@/types/scTypes';
import {
  calculateSlipageAmount,
  formatBalance,
  getRealBalance
} from '@/utils/mx-utils';
import { BigUIntValue } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { IPoolPair } from '../../../PoolsView/utils/types';
import InputBox from '../../../SwapView/commons/SwapCard/commons/InputBox';
import { useGetEquivalent } from '../../lib/hooks';

export interface AddLiquidityCardProps {
  pool: IPoolPair;
}

const AddLiquidityCard = ({ pool }: AddLiquidityCardProps) => {
  const [firstTokenAmount, setFirstTokenAmount] = useState<string>('');
  const [secondTokenAmount, setSecondTokenAmount] = useState<string>('');

  const [firstTokenAmountDecimals, setFirstTokenAmountDecimals] =
    useState<string>('');
  const [secondTokenAmountDecimals, setSecondTokenAmountDecimals] =
    useState<string>('');
  const [selectedToken, setSelectedToken] = useState<{
    identifier: string;
    decimals: number;
  }>(pool.firstToken);

  const normalDirection = selectedToken.identifier !== pool.secondTokenId;

  let amountForEquivalent = firstTokenAmount;
  let elrondTokenForEquivalent = pool.firstToken;
  console.log(firstTokenAmount);
  console.log(firstTokenAmountDecimals);
  console.log(secondTokenAmountDecimals);

  if (!normalDirection) {
    amountForEquivalent = secondTokenAmount;
    elrondTokenForEquivalent = pool.secondToken;
  }

  const { data } = useGetEquivalent(
    pool.address,
    elrondTokenForEquivalent.identifier,
    Number(amountForEquivalent),
    elrondTokenForEquivalent.decimals
  );
  console.log(data);

  const handleOnChangeFirstAmount = (
    val: string,
    token: { identifier: string; decimals: number }
  ) => {
    console.log(val);

    setFirstTokenAmount(val);
    setSelectedToken(token);
  };

  const handleOnChangeSecondAmount = (
    val: string,
    token: { identifier: string; decimals: number }
  ) => {
    setSecondTokenAmount(val);
    setSelectedToken(token);
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

    handleOnChangeFirstAmount(userAmount.toString(), accountToken);
  };

  useEffect(() => {
    if (normalDirection) {
      setSecondTokenAmount(
        getRealBalance(data, pool.secondToken.decimals, true).toString()
      );
      setSecondTokenAmountDecimals(data);
    } else {
      setFirstTokenAmount(
        getRealBalance(data, pool.firstToken.decimals, true).toString()
      );
      setFirstTokenAmountDecimals(data);
    }
  }, [
    data,
    normalDirection,
    pool.firstToken.decimals,
    pool.secondToken.decimals
  ]);

  const { setSessionId } = useTxNotification({});

  const handleAddLiquidity = async () => {
    const firstAmount =
      firstTokenAmountDecimals ||
      new BigNumber(firstTokenAmount)
        .multipliedBy(10 ** pool.firstToken.decimals)
        .toFixed(0);

    const secondAmount =
      secondTokenAmountDecimals ||
      new BigNumber(secondTokenAmount)
        .multipliedBy(10 ** pool.secondToken.decimals)
        .toFixed(0);

    console.log(firstAmount);
    console.log(secondAmount);

    const firstAmountWithSlipage = calculateSlipageAmount(5, firstAmount);
    const secondAmountWithSlipage = calculateSlipageAmount(5, secondAmount);
    console.log(firstAmountWithSlipage.toFixed(0));
    console.log(secondAmountWithSlipage.toFixed(0));

    const int = new SmartContractInteraction(pool.address);
    const res = await int.MultiESDTNFTTransfer({
      functionName: 'addLiquidity',
      tokens: [
        {
          collection: pool.firstTokenId,
          nonce: 0,
          value: firstAmount
        },
        {
          collection: pool.secondTokenId,
          nonce: 0,
          value: secondAmount
        }
      ],
      arg: [
        new BigUIntValue(firstAmountWithSlipage.toFixed(0)),
        new BigUIntValue(secondAmountWithSlipage.toFixed(0))
      ]
    });

    setSessionId(res.sessionId);
  };

  const handleClear = () => {
    setFirstTokenAmount('');
    setFirstTokenAmountDecimals('');
    setSecondTokenAmount('');
    setSecondTokenAmountDecimals('');
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
            clear={handleClear}
          />

          <InputBox
            onChange={handleOnChangeSecondAmount}
            onChangeToken={() => {}}
            selectedTokenI={pool.secondTokenId}
            tokensIdentifiers={[]}
            label={''}
            value={secondTokenAmount}
            handlePercentAmount={handlePercentFirstAmount}
            clear={handleClear}
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
