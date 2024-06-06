import { formatAddress } from '@/utils/mx-utils';
import { ForwardedRef, forwardRef } from 'react';
import { useGenerateLPStrings } from '../../../utils/hooks';
import { useGetPoolPair } from '../../../utils/swr.hooks';
import SubmitButton from './SubmitButton/SubmitButton';

interface IProps {
  onNextStep: () => void;
}

const SetLpForm = forwardRef(
  ({ onNextStep }: IProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { pair } = useGetPoolPair();

    const poolAddress = formatAddress(pair);

    const { lpName, lpTicker } = useGenerateLPStrings();

    return (
      <div
        className='bg-card rounded-sm px-4 py-6 w-full text-left'
        id='#create-lp'
        ref={ref}
      >
        <h2 className='text-gray-300 text-xl'>Create LP Token</h2>

        <p className='text-gray-400 text-sm mb-4'>
          Set the LP token for the new pool.
        </p>
        <div className='flex flex-col gap-2 text-sm'>
          <BoxForm label='Pool Address' value={poolAddress} />

          <BoxForm label='LP Token Name' value={lpName} />

          <BoxForm label='LP Token Ticker' value={lpTicker} />
        </div>

        <div>
          <SubmitButton onNextStep={onNextStep} />
        </div>
      </div>
    );
  }
);

SetLpForm.displayName = 'SetLpForm';

export default SetLpForm;

const BoxForm = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <div className='mb-1 text-sm text-gray-500'>{label}</div>
      <div className='bg-[#1C243E]  p-3 rounded-md w-full flex justify-between items-center'>
        {value}
      </div>
    </div>
  );
};
