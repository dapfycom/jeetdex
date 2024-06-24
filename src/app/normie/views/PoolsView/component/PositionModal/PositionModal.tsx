import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import useTxNotification from '@/hooks/useTxNotification';
import { IElrondAccountToken } from '@/types/scTypes';
import {
  calculateSlippageAmount,
  formatBalance,
  formatTokenI,
  get_both_tokens_for_given_position
} from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { removeLiquidity } from '../../utils/functions';
import { IPoolPair } from '../../utils/types';

const PositionModal = ({
  isOpen,
  onToggle,
  pool,
  liquidity
}: {
  isOpen: boolean;
  onToggle: () => void;
  pool: IPoolPair;
  liquidity: IElrondAccountToken;
}) => {
  console.log(pool, liquidity);
  const { mutate } = useGetUserTokens();
  const [percentage, setPercentage] = useState(100);
  const onSuccess = () => {
    mutate();
  };
  const [sessionId, setSessionId] = useState<string | null>(null);

  useTxNotification({
    onSuccess: onSuccess,
    sessionId,
    setSessionId
  });

  const withdrawLiquidityAmount = new BigNumber(liquidity.balance)
    .times(percentage)
    .div(100)
    .toString();

  const { firstTokenAmount, secondTokenAmount } =
    get_both_tokens_for_given_position(withdrawLiquidityAmount, pool);

  const handleRemoveLiquidity = async () => {
    const res = await removeLiquidity(
      pool.address,
      { ...liquidity, balance: withdrawLiquidityAmount },
      {
        firstTokenAmount: calculateSlippageAmount(
          5,
          firstTokenAmount
        ).toString(),
        secondTokenAmount: calculateSlippageAmount(
          5,
          secondTokenAmount
        ).toString()
      }
    );
    setSessionId(res.sessionId);
  };

  return (
    <Dialog onOpenChange={onToggle} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Info about your position</DialogTitle>
          <DialogDescription>
            <div className='flex flex-col gap-2 mt-5 mb-3'>
              <div className='flex items-center gap-2'>
                <TokenImageSRC
                  alt={pool.firstTokenId}
                  identifier={pool.firstTokenId}
                  size={20}
                  src={pool.firstToken?.assets?.svgUrl}
                  className='w-[20px] h-[20px] rounded-full'
                />
                My {formatTokenI(pool.firstTokenId)} :{' '}
                <span className='text-white'>
                  {formatBalance({
                    balance: firstTokenAmount,
                    decimals: pool.firstToken?.decimals
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <TokenImageSRC
                  alt={pool.secondTokenId}
                  identifier={pool.secondTokenId}
                  size={20}
                  src={pool.secondToken?.assets?.svgUrl}
                  className='w-[20px] h-[20px] rounded-full'
                />
                My {formatTokenI(pool.secondTokenId)} :{' '}
                <span className='text-white'>
                  {formatBalance({
                    balance: secondTokenAmount,
                    decimals: pool.secondToken?.decimals
                  })}
                </span>
              </div>
            </div>

            <Slider
              defaultValue={[percentage]}
              max={100}
              step={1}
              onValueChange={(number) => setPercentage(number[0])}
            />

            <div className='flex items-center gap-3 mt-8'>
              <Button className='' onClick={handleRemoveLiquidity}>
                Remove LP
              </Button>

              <div className='text-gray-300 text-lg align-middle'>
                {formatBalance({
                  balance: withdrawLiquidityAmount,
                  decimals: liquidity.decimals
                })}{' '}
                {formatTokenI(liquidity.identifier)}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PositionModal;
