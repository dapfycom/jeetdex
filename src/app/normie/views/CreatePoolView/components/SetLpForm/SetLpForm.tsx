import { Button } from '@/components/ui/button';
import { formatAddress, formatTokenI } from '@/utils/mx-utils';
import { createLp } from '../../utils/sc.service';
import { useGetPoolPair } from '../../utils/swr.hooks';

const SetLpForm = () => {
  const { pair, tokens } = useGetPoolPair();

  const poolAddress = formatAddress(pair);

  const lpName =
    formatTokenI(tokens.token1) + formatTokenI(tokens.token2) + 'LP';
  const lpTicker =
    formatTokenI(tokens.token1).slice(0, 5) + formatTokenI(tokens.token2);

  return (
    <div className='bg-zinc-900 rounded-xl px-8 py-12 w-full text-left'>
      <h2 className='text-gray-300 text-xl'>Create LP Token</h2>

      <p className='text-gray-400 text-sm mb-10'>
        Set the LP token for the new pool.
      </p>
      <div className='flex flex-col gap-4'>
        <BoxForm label='Pool Address' value={poolAddress} />

        <BoxForm label='LP Token Name' value={lpName} />

        <BoxForm label='LP Token Ticker' value={lpTicker} />
      </div>

      <div>
        <Button
          className='w-full mt-10 p-3 rounded-md'
          onClick={() => {
            createLp(pair, lpName, lpTicker);
          }}
        >
          Create LP Token
        </Button>
      </div>
    </div>
  );
};

export default SetLpForm;

const BoxForm = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <div className='mb-1 text-sm text-gray-500'>{label}</div>
      <div className='bg-zinc-800 p-3 rounded-md w-full flex justify-between items-center'>
        {value}
      </div>
    </div>
  );
};
