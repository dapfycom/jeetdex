import { useAppSelector } from '@/hooks';
import { useGetCoins } from '@/hooks/useGetCoins';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { memo, useState } from 'react';
import { selectIsOpenCharts } from '../../../../lib/swap-slice';
interface IProps {
  tokenIdentifier: string;
}
const TokenSocials = ({ tokenIdentifier }: IProps) => {
  const isOpenTokenSocials = useAppSelector(selectIsOpenCharts);
  const { coinRes } = useGetCoins(isOpenTokenSocials ? tokenIdentifier : null);
  const [bigImage, setBigImage] = useState(false);
  if (!coinRes?.data || !isOpenTokenSocials) {
    return null;
  }

  // check every url have https if not add it
  const data = coinRes?.data;
  const dataWithHttps = {
    ...data,
    telegram: data.telegram?.startsWith('https')
      ? data.telegram
      : `https://${data.telegram}`,
    twitter: data.twitter?.startsWith('https')
      ? data.twitter
      : `https://${data.twitter}`,
    website: data.website?.startsWith('https')
      ? data.website
      : `https://${data.website}`
  };

  return (
    <div>
      <div className='flex gap-3 mb-3 flex-wrap text-sm sm:text-md'>
        {data?.telegram && (
          <a
            href={dataWithHttps?.telegram}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [telegram]
          </a>
        )}

        {data?.twitter && (
          <a
            href={dataWithHttps?.twitter}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [twitter]
          </a>
        )}
        {data?.website && (
          <a
            href={dataWithHttps?.website}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [website]
          </a>
        )}

        {data?.identifier.includes('-') && (
          <a
            href={`https://explorer.multiversx.com/tokens/${data?.identifier}`}
            target='_blank'
            rel='noreferrer'
            className='hover:font-bold'
          >
            [explorer]
          </a>
        )}
      </div>

      <div className={cn('flex gap-3', bigImage ? 'flex-col' : '')}>
        {data?.img && (
          <Image
            alt={tokenIdentifier}
            src={dataWithHttps?.img}
            width={100}
            height={100}
            className={`w-[100px] h-[100px] ${bigImage ? 'w-full h-full' : ''}`}
            // onClick take image full width
            onClick={() => {
              setBigImage((prev) => !prev);
            }}
          />
        )}

        <div className='text-left'>
          <div>{dataWithHttps?.title}</div>
          <div className='text-sm text-muted-foreground'>
            {data?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TokenSocials);
