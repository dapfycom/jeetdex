import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Input } from '@/components/ui/input';
import { formatBalance } from '@/utils/mx-utils';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { schemaType } from './AddInitialLiquidityForm';

const TokenAmount = ({
  token,
  label,
  tokenType
}: {
  token: {
    identifier: string;
    decimals: number;
    balance: string;
    assets: { svgUrl: string };
  };
  label: ReactNode;
  tokenType: 'firstTokenAmount' | 'secondTokenAmount';
}) => {
  const form = useFormContext<schemaType>();
  return (
    <div>
      <div className='mb-1 text-sm text-gray-500'>{label}</div>
      <div className='flex justify-between w-full bg-[#1C243E] items-center rounded'>
        <Input className='focus-visible:ring-0' {...form.register(tokenType)} />
        <div className='text-xs text-gray-400 mr-2'>{formatBalance(token)}</div>
        <div className='mr-2 flex h-full items-center '>
          {token && (
            <TokenImageSRC
              identifier={token.identifier}
              alt='Token img'
              size={24}
              src={token.assets?.svgUrl}
              className='w-6 h-6 rounded-e-full'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenAmount;
