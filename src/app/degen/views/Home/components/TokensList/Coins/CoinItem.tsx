import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  imageUrl: string;
  name: string;
  ticker: string;
  marketCap: string;
  replies: number;
  description: string;
}

const CoinItem = ({
  imageUrl,
  name,
  ticker,
  marketCap,
  replies,
  description
}: IProps) => {
  return (
    <Link
      href={'/pair'}
      className='grid  grid-cols-[100px_auto] sm:grid-cols-[128px_auto] p-3 gap-3 hover:border-white hover:border rounded-md'
    >
      <div className='relative w-[100px] sm:w-[128px] h-[auto]'>
        <Image src={imageUrl} alt={ticker} width={128} height={128} />
      </div>

      <div>
        <div className='flex flex-col gap-1'>
          <div className='text-xs text-muted-foreground'>
            Created by biticoino
          </div>
          <div className='text-xs text-primary'>market cap:{marketCap}</div>
          <div className='text-xs text-gray-500'>replies: {replies}</div>

          <p className='text-sm'>
            <span className='font-bold'>
              {name} (ticker: {ticker})
            </span>
            : {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoinItem;
