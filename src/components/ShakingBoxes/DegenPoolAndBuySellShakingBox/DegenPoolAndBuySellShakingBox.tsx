'use client';
import { Button } from '@/components/ui/button';
import { formatNumber, formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';
import useShake from './useShake';

const DegenPoolAndBuySellShakingBox = () => {
  const { bgColor, poolValue, shake, txValue, type } = useShake();
  console.log(poolValue);
  console.log(type);

  if (type === 'pool') {
    if (!poolValue) return null;

    return (
      <Button
        className={`flex items-center gap-1 lg:gap-2 font-normal px-2 lg:px-4 h-7 lg:h-9 text-xs lg:text-sm ${
          shake ? 'animate-shake' : ''
        }`}
        style={{ backgroundColor: bgColor }}
        asChild
      >
        <div>
          <Image
            alt=''
            src={'/assets/img/logo-jeeter.png'}
            width={20}
            height={20}
            className='rounded-full w-5 h-5'
          />
          <Link
            href={`/profile/${poolValue.address}`}
            className='hover:text-blue-700 hover:font-bold'
          >
            {poolValue.user}
          </Link>
          created
          <Link
            href={`/?swap=${poolValue.token}`}
            className='hover:text-blue-700 hover:font-bold'
          >
            {formatTokenI(poolValue.token)}
          </Link>
          <div>{`on ${new Date(poolValue.date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })}`}</div>
        </div>
      </Button>
    );
  } else {
    if (!txValue) return null;

    return (
      <Button
        className={`flex items-center gap-1 lg:gap-2 font-normal px-2 lg:px-4 h-7 lg:h-9 text-xs lg:text-sm ${
          shake ? 'animate-shake' : ''
        }`}
        style={{ backgroundColor: bgColor }}
        asChild
      >
        <div>
          <Image
            alt=''
            src={'/assets/img/logo-jeeter.png'}
            width={20}
            height={20}
            className='rounded-full w-5 h-5'
          />
          <div>
            {' '}
            <Link
              href={`/profile/${txValue.address}`}
              className='hover:text-blue-700 hover:font-bold'
            >
              {txValue.username || txValue.user}
            </Link>{' '}
            {`${txValue.type} ${formatNumber(txValue.amount)} JEET to`}{' '}
            <Link
              href={`/?swap=${txValue.token}`}
              className='hover:text-blue-700 hover:font-bold'
            >
              {formatTokenI(txValue.token)}
            </Link>
          </div>
        </div>
      </Button>
    );
  }
};

export default DegenPoolAndBuySellShakingBox;
