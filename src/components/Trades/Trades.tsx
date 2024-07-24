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
import { cn } from '@/lib/utils';
import { fetchTransactions } from '@/services/rest/elrond/transactions';
import { timeAgo } from '@/utils/date';
import { textToLightColor } from '@/utils/general';
import { formatAddress, formatBalance, formatTokenI } from '@/utils/mx-utils';
import { formatBigNumber, hexToBigNumber } from '@/utils/numbers';
import useSWR from 'swr';

export const colorByType = {
  buy: 'text-green-400',
  sell: 'text-red-400'
};

const Trades = ({
  poolAddress,
  poolFirstToken,
  poolSecondToken
}: {
  poolAddress: string;
  poolFirstToken: {
    ticker: string;
    decimals: number;
    identifier: string;
  };
  poolSecondToken: {
    ticker: string;
    decimals: number;
    identifier: string;
  };
}) => {
  const { data } = useSWR(
    poolAddress ? `/transactions/${poolAddress}/swapIn` : null,
    async () => {
      return fetchTransactions({
        receiver: poolAddress,
        withScResults: true,
        function: 'swapIn',
        status: 'success'
      });
    },
    {
      refreshInterval: 5000
    }
  );

  const finalData = data || [];

  return (
    <Table className='bg-card'>
      <TableHeader>
        <TableRow>
          <TableHead className='text-left'>account</TableHead>
          <TableHead className='text-center'>type</TableHead>
          <TableHead className='text-center'>
            {formatTokenI(poolSecondToken.ticker)}
          </TableHead>
          <TableHead className='text-center'>
            {formatTokenI(poolFirstToken.ticker)}
          </TableHead>

          <TableHead className='text-center'>date</TableHead>

          <TableHead className='text-right'>hash</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {finalData.map((d) => {
          const type =
            d.action.arguments.transfers[0].token === poolFirstToken.identifier
              ? 'sell'
              : 'buy';

          const firstTokenTxValue =
            type === 'sell'
              ? d.action.arguments.transfers[0].value
              : hexToBigNumber(d.action.arguments.functionArgs[1]).toString();

          const secondTokenTxValue =
            type === 'buy'
              ? d.action.arguments.transfers[0].value
              : hexToBigNumber(d.action.arguments.functionArgs[1]).toString();

          const jeetAmount = formatBigNumber(
            formatBalance(
              {
                balance: secondTokenTxValue,
                decimals: poolFirstToken.decimals
              },
              true
            )
          );

          const jeetAmountParts = jeetAmount.split(' ');

          const firstTokenAmount = formatBigNumber(
            formatBalance(
              {
                balance: firstTokenTxValue,
                decimals: poolFirstToken.decimals
              },
              true
            )
          );

          const firstTokenAmountParts = firstTokenAmount.split(' ');
          return (
            <TableRow key={d.txHash}>
              <TableCell className='text-left w-fit'>
                <span
                  className='rounded-sm text-xs bg-lime-400/80 text-black px-1 h-[18px] flex items-center w-fit whitespace-nowrap'
                  style={{
                    background: textToLightColor(d.sender)
                  }}
                >{`${formatAddress(d.sender, 3, 3)}`}</span>
              </TableCell>
              <TableCell className={cn('text-center', colorByType[type])}>
                {type}
              </TableCell>
              <TableCell className='text-center '>
                <div className='flex  flex-col justify-center h-full'>
                  <span>{jeetAmountParts[0]}</span>
                  {jeetAmountParts[1] && <span> {jeetAmountParts[1]}</span>}
                </div>
              </TableCell>
              <TableCell className='text-center '>
                <div className='flex  flex-col justify-center h-full'>
                  <span>{firstTokenAmountParts[0]}</span>

                  {firstTokenAmountParts[1] && (
                    <span> {firstTokenAmountParts[1]}</span>
                  )}
                </div>
              </TableCell>

              <TableCell className='text-center text-gray-400'>
                {timeAgo(new Date(d.timestamp * 1000))}
              </TableCell>
              <TableCell className='text-right text-gray-400 hover:text-white'>
                <a
                  href={network.explorerAddress + '/transactions/' + d.txHash}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='whitespace-nowrap'
                >
                  {formatAddress(d.txHash, 2, 2)}
                </a>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Trades;
