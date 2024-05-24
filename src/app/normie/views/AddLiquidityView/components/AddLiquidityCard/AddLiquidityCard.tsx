'use client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPoolPair } from '../../../PoolsView/utils/types';
import InputBox from '../../../SwapView/commons/SwapCard/commons/InputBox';

export interface AddLiquidityCardProps {
  pool: IPoolPair;
}

const AddLiquidityCard = ({ pool }: AddLiquidityCardProps) => {
  console.log(pool);

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
            onChange={() => {}}
            onChangeToken={() => {}}
            selectedTokenI={pool.firstTokenId}
            tokensIdentifiers={[]}
            value=''
            label=''
          />
          <div className='flex justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='bg-[#0b102280] rounded-full w-[35px] h-[35px] flex justify-center items-center border-4 border-card'>
              <FontAwesomeIcon icon={faPlus} className='h-[18px] w-[18px] ' />
            </div>
          </div>
          <InputBox
            onChange={() => {}}
            onChangeToken={() => {}}
            selectedTokenI={pool.secondTokenId}
            tokensIdentifiers={[]}
            label=''
            value=''
          />
        </div>
      </div>
    </div>
  );
};

export default AddLiquidityCard;
