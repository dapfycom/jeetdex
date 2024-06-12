import { useGetCoins } from '@/hooks/useGetCoins';
import Image from 'next/image';
interface IProps {
  tokenIdentifier: string;
}
const TokenSocials = ({ tokenIdentifier }: IProps) => {
  const { coinRes } = useGetCoins(tokenIdentifier);
  console.log(coinRes);
  if (!coinRes.data) {
    return null;
  }

  return (
    <div>
      <div className='flex gap-3 mb-3'>
        {coinRes?.data?.telegram && (
          <a
            href={coinRes?.data?.telegram}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [telegram]
          </a>
        )}

        {coinRes?.data?.twitter && (
          <a
            href={coinRes?.data?.twitter}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [twitter]
          </a>
        )}
        {coinRes?.data?.website && (
          <a
            href={coinRes?.data?.website}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [website]
          </a>
        )}
      </div>

      <div className='flex gap-3'>
        {coinRes?.data?.img && (
          <Image
            alt={tokenIdentifier}
            src={coinRes?.data?.img}
            width={100}
            height={100}
            className='w-[100px] h-[100px]'
          />
        )}

        <div className='text-left'>
          <div>{coinRes?.data?.title}</div>
          <div className='text-sm text-muted-foreground'>
            {coinRes?.data?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSocials;
