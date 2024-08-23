'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { network } from '@/config';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { fetchEventsApiData } from '@/services/rest/events';
import { IEventTransaction } from '@/types/eventsApi.types';
import { timeAgo } from '@/utils/date';
import { textToLightColor } from '@/utils/general';
import { formatAddress, formatNumber, formatTokenI } from '@/utils/mx-utils';
import { formatBigNumber } from '@/utils/numbers';
import useSWR from 'swr';
import { colorByType } from './Trades';

const UserTrades = ({
  poolFirstTokenIdentifier,
  poolSecondTokenIdentifier,
  mode = 'normie'
}: {
  poolFirstTokenIdentifier: string;
  poolSecondTokenIdentifier: string;
  mode?: 'normie' | 'degen';
}) => {
  const address = useAppSelector(selectUserAddress);

  const { data } = useSWR<IEventTransaction[]>(
    poolFirstTokenIdentifier
      ? `/${mode}/transactions?firstTokenI=${poolFirstTokenIdentifier}&secondTokenI=${poolSecondTokenIdentifier}&address=${address}`
      : null,
    fetchEventsApiData<IEventTransaction[]>,
    {
      refreshInterval: 10000
    }
  );

  const removeduplicatesHash = data?.filter((d, index, self) => {
    if (!d.hash) {
      return true;
    }
    return self.findIndex((t) => t.hash === d.hash) === index;
  });

  const finalData = removeduplicatesHash || [];

  return (
    <Table className='bg-card mb-20'>
      <TableHeader>
        <TableRow>
          <TableHead className='text-left'>account</TableHead>
          <TableHead className='text-center'>type</TableHead>
          <TableHead className='text-center'>
            {formatTokenI(poolSecondTokenIdentifier)}
          </TableHead>
          <TableHead className='text-center'>
            {formatTokenI(poolFirstTokenIdentifier)}
          </TableHead>

          <TableHead className='text-center'>date</TableHead>

          <TableHead className='text-right'>hash</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {finalData.map((d) => {
          const type = d.tokenIn === poolFirstTokenIdentifier ? 'sell' : 'buy';

          const firstTokenTxValue =
            type === 'sell' ? d.tokenAmountIn : d.tokenAmountOut;

          const secondTokenTxValue =
            type === 'sell' ? d.tokenAmountOut : d.tokenAmountIn;

          const firstTokenAmount = formatBigNumber(firstTokenTxValue);

          const firstTokenAmountParts = firstTokenAmount.split(' ');

          const jeetAmount = formatBigNumber(secondTokenTxValue);

          const jeetAmountParts = jeetAmount.split(' ');

          return (
            <TableRow key={d.id}>
              <TableCell className='text-left w-fit'>
                <span
                  className='rounded-sm text-xs bg-lime-400/80 text-black px-1 h-[18px] flex items-center w-fit whitespace-nowrap'
                  style={{
                    background: textToLightColor(d.caller)
                  }}
                >{`${formatAddress(d.caller, 3, 3)}`}</span>
              </TableCell>
              <TableCell className={cn('text-center', colorByType[type])}>
                {type}
              </TableCell>
              <TableCell className='text-center '>
                <div className='flex  flex-col justify-center h-full'>
                  <span>{formatNumber(jeetAmountParts[0])}</span>
                  {jeetAmountParts[1] && <span> {jeetAmountParts[1]}</span>}
                </div>
              </TableCell>
              <TableCell className='text-center '>
                <div className='flex  flex-col justify-center h-full'>
                  <span>{formatNumber(firstTokenAmountParts[0])}</span>

                  {firstTokenAmountParts[1] && (
                    <span> {firstTokenAmountParts[1]}</span>
                  )}
                </div>
              </TableCell>

              <TableCell className='text-center text-gray-400'>
                {timeAgo(new Date(d.timestamp * 1000))}
              </TableCell>
              <TableCell className='text-right text-gray-400 hover:text-white'>
                {d.hash && (
                  <a
                    href={network.explorerAddress + '/transactions/' + d.hash}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='whitespace-nowrap'
                  >
                    {formatAddress(d.hash, 2, 2)}
                  </a>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UserTrades;
