import { cn } from '@/lib/utils';
import { TokenImageSRC } from '../TokenImage/TokenImage';

interface IProps {
  src1?: string;
  src2?: string;
  size: number;
  className?: string;
  identifier1: string;
  identifier2: string;
}

const PoolCoins = ({
  className,
  src1,
  src2,
  size,
  identifier1,
  identifier2
}: IProps) => {
  return (
    <div className='flex'>
      <div
        className={cn(
          'w-[26px] h-[26px] rounded-full bg-gradient-to-r from-[rgba(171,_196,_255,_0.20)] from-30% to-[rgba(171,_196,_255,_0.00)]  flex justify-center items-center backdrop-blur-sm relative',
          className
        )}
      >
        <TokenImageSRC
          size={size}
          src={src1}
          alt='Token 1'
          identifier={identifier1}
          className='w-[70%] h-[70%] rounded-full'
        />
      </div>
      <div
        className={cn(
          'w-[26px] h-[26px] rounded-full bg-gradient-to-r from-[rgba(171,_196,_255,_0.20)] from-30% to-[rgba(171,_196,_255,_0.00)]  flex justify-center items-center backdrop-blur-sm -translate-x-2 relative z-10',
          className
        )}
      >
        <TokenImageSRC
          size={size}
          src={src2}
          alt='Token 2'
          className='w-[70%] h-[70%] rounded-full'
          identifier={identifier2}
        />
      </div>
    </div>
  );
};

export default PoolCoins;
