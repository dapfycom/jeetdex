import { useAppSelector } from '@/hooks';
import { useGetCoins } from '@/hooks/useGetCoins';
import Image from 'next/image';
import { memo } from 'react';
import { selectIsOpenCharts } from '../../../../lib/swap-slice';
interface IProps {
  tokenIdentifier: string;
}
const TokenSocials = ({ tokenIdentifier }: IProps) => {
  const isOpenTokenSocials = useAppSelector(selectIsOpenCharts);
  const { coinRes } = useGetCoins(isOpenTokenSocials ? tokenIdentifier : null);

  if (!coinRes?.data || !isOpenTokenSocials) {
    return null;
  }

  // check every url have https if not add it
  const data = coinRes?.data;
  const dataWithHttps = {
    ...data,
    telegram: data.telegram.startsWith('https')
      ? data.telegram
      : `https://${data.telegram}`,
    twitter: data.twitter.startsWith('https')
      ? data.twitter
      : `https://${data.twitter}`,
    website: data.website.startsWith('https')
      ? data.website
      : `https://${data.website}`
  };

  return (
    <div>
      <div className='flex gap-3 mb-3'>
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
      </div>

      <div className='flex gap-3'>
        {data?.img && (
          <Image
            alt={tokenIdentifier}
            src={dataWithHttps?.img}
            width={100}
            height={100}
            className='w-[100px] h-[100px]'
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
