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
          'w-[26px] h-[26px] rounded-full flex justify-center items-center relative',
          className
        )}
      >
        <TokenImageSRC
          size={size}
          src={src1}
          alt='Token 1'
          identifier={identifier1}
          className='w-full h-full rounded-full'
        />
      </div>
      <div
        className={cn(
          'w-[26px] h-[26px] rounded-full flex justify-center items-center -translate-x-2 relative z-10',
          className
        )}
      >
        <TokenImageSRC
          size={size}
          src={src2}
          alt='Token 2'
          className='w-full h-full rounded-full'
          identifier={identifier2}
        />
      </div>
    </div>
  );
};

export default PoolCoins;
