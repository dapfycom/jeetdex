import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className='border border-white max-w-6xl w-5/6 mx-auto mt-20 p-8 rounded-sm'>
      <p className='text-white'>
        We prevent rugs by making sure that all created tokens are safe. Each
        coin is a <span className='text-green-400'>fair-launch</span> with{' '}
        <span className='text-blue-400'>no presale</span> and{' '}
        <span className='text-yellow-400'>no team allocation</span>.
      </p>
      <div className='flex flex-col mt-3 text-gray-300 gap-2'>
        <div>
          <span className='font-bold'>step 1:</span> create new coin
        </div>
        <div>
          <span className='font-bold'>step 2:</span> users buy your coin on the
          bonding curve
        </div>
        <div>
          <span className='font-bold'>step 3:</span> they can sell at any time
          to lock in profits or losses
        </div>
        <div>
          <span className='font-bold'>step 4:</span> when enough people buy on
          the bonding curve and it reaches a market cap of $23,000
        </div>
        <div>
          <span className='font-bold'>step 5:</span> $4,000 of liquidity is then
          deposited in jeetdex and burned
        </div>

        <Button className='mt-8'>i’m ready to jeet</Button>
      </div>
    </div>
  );
};

export default page;
