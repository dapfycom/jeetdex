import { selectIsOpenCharts } from '@/app/normie/views/SwapView/lib/swap-slice';
import { network } from '@/config';
import { useAppSelector } from '@/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { fetchAxiosJeetdex } from '@/services/rest/api';
import { fetchElrondData } from '@/services/rest/elrond';
import { formatAddress, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { memo } from 'react';
import useSWR from 'swr';
import { getBalancePercentage } from './helper';

const HoldersList = ({
  tokenIdentifier,
  degenId,
  contractAddress
}: {
  tokenIdentifier?: string;
  degenId?: string;
  contractAddress?: string;
}) => {
  const isOpenHolders = useAppSelector(selectIsOpenCharts);

  const { data: holders } = useSWR<
    {
      address: string;
      balance: string;
    }[]
  >(
    isOpenHolders && tokenIdentifier
      ? `/tokens/${tokenIdentifier}/accounts`
      : null,
    fetchElrondData
  );

  const { data: coinData } = useSWR<{
    data: {
      id: string;
      identifier: string;
      img: string;
      ownerId: string;
      twitter: string;
      telegram: string;
      website: string;
      title: string;
      description: string;
      degenId: string;
      owner: {
        id: string;
        username: string;
        address: string;
        img: string;
        bio: string;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  }>(`/coins/${degenId || tokenIdentifier}`, fetchAxiosJeetdex);

  const { elrondToken } = useGetElrondToken(
    isOpenHolders ? tokenIdentifier : null
  );

  const totalBalance = new BigNumber(elrondToken?.initialMinted || 0).minus(
    elrondToken?.burnt || 0
  );

  if (!holders || !isOpenHolders) return null;
  return (
    <div className='text-left mb-20'>
      <div className='text-lg mb-2'>Holder distribution</div>
      <div className='flex flex-col gap-1'>
        {holders.map((h, i) => {
          const percent = getBalancePercentage(
            holders,
            h.address,
            totalBalance.toString()
          );

          const isDev = h.address === coinData?.data?.owner?.address;

          return (
            <div key={h.address} className='text-gray-400 text-sm'>
              <div className='flex w-full justify-between '>
                <a
                  href={`${network.explorerAddress}/accounts/${h.address}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex gap-2 '
                >
                  {i + 1}.{' '}
                  <span className='sm:inline hidden'>
                    {' '}
                    {formatAddress(h.address)}
                  </span>{' '}
                  <span className='sm:hidden inline'>
                    {' '}
                    {formatAddress(h.address, 6, 4)}
                  </span>
                  {isDev && (
                    <div className='text-xs text-gray-400'>( 👑 dev ) </div>
                  )}
                  {contractAddress === h.address && (
                    <div className='text-xs text-gray-400'>
                      ( 🏦 bonding curve ){' '}
                    </div>
                  )}
                </a>
                {elrondToken && <div>{formatNumber(percent.toNumber())}%</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HoldersList);
