import { cn } from '@/lib/utils';
import Image from 'next/image';

interface IProps {
  src1: string;
  src2: string;
  className?: string;
}

const PoolCoins = ({ className, src1, src2 }: IProps) => {
  return (
    <div className='flex'>
      <div
        className={cn(
          'w-[26px] h-[26px] rounded-full bg-gradient-to-r from-[rgba(171,_196,_255,_0.20)] from-30% to-[rgba(171,_196,_255,_0.00)]  flex justify-center items-center backdrop-blur-sm relative',
          className
        )}
      >
        <Image
          src={src1}
          alt='Token1'
          className='w-[70%] h-[70%] rounded-full'
          width={32}
          height={32}
        />
      </div>
      <div
        className={cn(
          'w-[26px] h-[26px] rounded-full bg-gradient-to-r from-[rgba(171,_196,_255,_0.20)] from-30% to-[rgba(171,_196,_255,_0.00)]  flex justify-center items-center backdrop-blur-sm -translate-x-2 relative z-10',
          className
        )}
      >
        <Image
          src={src2}
          alt='Token1'
          className='w-[70%] h-[70%] rounded-full'
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default PoolCoins;
