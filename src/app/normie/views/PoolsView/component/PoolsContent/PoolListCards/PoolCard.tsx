import PoolCoins from '@/components/PoolCoins/PoolCoins';
import { Button } from '@/components/ui/button';
import { jeetStaticData } from '@/localConstants/tokensStaticsData';
import { faChartColumn, faExchange } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const PoolCard = () => {
  return (
    <div className='bg-[#1C243E] rounded-3xl py-6 px-4 w-full'>
      <div className='flex flex-col items-center w-full mb-4'>
        <PoolCoins
          src1={jeetStaticData.assets.svgUrl}
          src2={jeetStaticData.assets.svgUrl}
          className='w-[50px] h-[50px]'
        />

        <h3 className='mt-1 text-xl'>SOL - USDC</h3>
      </div>

      <div className='bg-[rgba(171,_196,_255,_0.07)] rounded-lg text-primary text-center py-2'>
        124.21% APR
      </div>

      <div className='w-full flex flex-col gap-3 text-sm mt-5 mb-5'>
        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>Fee Tier</p>
          <p className='bg-[rgba(171,196,255,0.19)] w-fit rounded-full px-2 text-xs flex items-center'>
            0.05%
          </p>
        </div>

        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>Volume 24H</p>
          <p className=''>$18,255,126.72</p>
        </div>
        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>Fees 24H</p>
          <p className=''>$9,127.56</p>
        </div>

        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>TVL</p>
          <p className=''>$3,073,071.48</p>
        </div>

        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>Rewards</p>
          <p className=''>
            <Image
              src={jeetStaticData.assets.svgUrl}
              alt='Reward token'
              width={32}
              height={32}
              className='rounded-full w-5  h-5'
            ></Image>
          </p>
        </div>
      </div>

      <div className='w-full flex gap-3 justify-center text-primary'>
        <Button
          variant='ghost'
          className='hover:bg-[#27837e4d] hover:text-primary'
        >
          View Chart <FontAwesomeIcon icon={faChartColumn} className='ml-2' />
        </Button>
        <Button
          variant='ghost'
          className='hover:bg-[#27837e4d] hover:text-primary'
        >
          Swap <FontAwesomeIcon icon={faExchange} className='ml-2' />
        </Button>
      </div>

      <Button className='w-full mt-3'>Deposit</Button>
    </div>
  );
};

export default PoolCard;
