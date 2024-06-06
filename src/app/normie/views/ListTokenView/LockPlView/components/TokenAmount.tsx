import { Input } from '@/components/ui/input';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { schemaType } from './LockLpForm';

const TokenAmount = ({
  token,
  label,
  tokenType
}: {
  token: { assets: { svgUrl: string } };
  label: ReactNode;
  tokenType: 'firstTokenAmount' | 'secondTokenAmount';
}) => {
  const form = useFormContext<schemaType>();
  return (
    <div>
      <div className='mb-1 text-sm text-gray-500'>{label}</div>
      <div className='flex justify-between w-full bg-[#1C243E] items-center rounded'>
        <Input className='focus-visible:ring-0' {...form.register(tokenType)} />
        <div className='mr-2 flex h-full items-center '>
          {token?.assets?.svgUrl ? (
            <Image
              src={token.assets.svgUrl}
              alt='logo'
              width={24}
              height={24}
            />
          ) : (
            <FontAwesomeIcon icon={faQuestionCircle} className='w-6 h-6' />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenAmount;
