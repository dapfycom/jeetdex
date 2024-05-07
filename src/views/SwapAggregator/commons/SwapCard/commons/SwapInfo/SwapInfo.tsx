import Divider from '@/components/Divider/Divider';
import { Input } from '@/components/ui/input';
import { tokensID } from '@/config';
import { useAppSelector } from '@/hooks/useRedux';
import { formatTokenI } from '@/utils/mx-utils';
import {
  onChangeSlippage,
  selectFromFieldValue,
  selectSlippage
} from '@/views/SwapAggregator/lib/swap-slice';
import { ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';

const SwapInfo = () => {
  const dispatch = useDispatch();
  const slippage = useAppSelector(selectSlippage);

  const data = {};
  const token1Value = useAppSelector(selectFromFieldValue);

  if (!data) return null;
  return (
    <>
      <div className='border px-3 py-5 rounded'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-400'>
              {formatTokenI(tokensID.jeet)}
            </span>
            <span className='text-lg'>{token1Value}</span>
          </div>
          {/* Icon arrow right */}
          <ArrowRight className='w-6 h-6 text-gray-400' />
          <div className='flex flex-col'>
            <span className='text-sm text-gray-400'>{tokensID.wegld}</span>
            <span className='text-lg'>≈ {502}</span>
          </div>
        </div>

        <Divider className='my-3' />
        <div className='flex w-full justify-between items-center'>
          <div className='flex gap-3'>
            <div>Slippage : </div>

            <div>{slippage}%</div>
          </div>
          <Input
            value={slippage}
            onChange={(e) => dispatch(onChangeSlippage(Number(e.target.value)))}
            className='w-full max-w-[80px]'
          />
        </div>
      </div>
    </>
  );
};

export default SwapInfo;
