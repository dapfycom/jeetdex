import { selectIsOpenCharts } from '@/app/normie/views/SwapView/lib/swap-slice';
import { network } from '@/config';
import { useAppSelector } from '@/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { devs } from '@/localConstants/devs';
import { fetchElrondData } from '@/services/rest/elrond';
import { formatAddress, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { memo } from 'react';
import useSWR from 'swr';
import { getBalancePercentage } from './helper';

const HoldersList = ({ tokenIdentifier }: { tokenIdentifier?: string }) => {
  const isOpenHolders = useAppSelector(selectIsOpenCharts);

  console.log('render');

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
  const { elrondToken } = useGetElrondToken(
    isOpenHolders ? tokenIdentifier : null
  );
  console.log(elrondToken);

  const totalBalance = new BigNumber(elrondToken?.initialMinted || 0).minus(
    elrondToken?.burnt || 0
  );

  if (!holders || !isOpenHolders) return null;
  return (
    <div className='text-left'>
      <div className='text-lg mb-2'>Holder distribution</div>
      <div className='flex flex-col gap-1'>
        {holders.map((h, i) => {
          const percent = getBalancePercentage(
            holders,
            h.address,
            totalBalance.toString()
          );

          const isDev = devs.includes(h.address);
          return (
            <div key={h.address} className='text-gray-400 text-sm'>
              <div className='flex w-full justify-between'>
                <a
                  href={`${network.explorerAddress}/accounts/${h.address}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex gap-2'
                >
                  {i + 1}. {formatAddress(h.address)}
                  {isDev && (
                    <div className='text-xs text-gray-400'>( 👑 dev ) </div>
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
