'use client';
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { formatBalanceDollar } from '@/utils/mx-utils';
import useGetStatics from './useGetStatics';

const Volume = () => {
  const { data } = useGetStatics();
  const { elrondToken } = useGetElrondToken(tokensID.jeet);

  if (!data || !elrondToken) return null;
  return (
    <div className='flex flex-col bg-card rounded-lg p-3 gap-2 w-fit'>
      <div className='text-xs'>24H Volume</div>
      <div>
        ${' '}
        {formatBalanceDollar(
          {
            balance: data.volume,
            decimals: 0
          },
          elrondToken.price
        )}
      </div>
    </div>
  );
};

export default Volume;
