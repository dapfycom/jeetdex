'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
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
import useGetDefaultPool from '@/hooks/useGetDefaultPool';
import { cn } from '@/lib/utils';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { fetchTransactions } from '@/services/rest/elrond/transactions';
import { timeAgo } from '@/utils/date';
import { textToLightColor } from '@/utils/general';
import { formatAddress, formatBalance, formatTokenI } from '@/utils/mx-utils';
import { formatBigNumber, hexToBigNumber } from '@/utils/numbers';
import useSWR from 'swr';
import { colorByType } from './Trades';

const UserTrades = ({ poolPair }: { poolPair: IPoolPair }) => {
  const pool = useGetDefaultPool(poolPair);
  const address = useAppSelector(selectUserAddress);
  const { data } = useSWR(
    address && pool ? `/transactions/${pool.address}/swapIn/${address}` : null,
    async () => {
      return fetchTransactions({
        receiver: pool.address,
        sender: address,
        withScResults: true,
        function: 'swapIn',
        status: 'success'
      });
    },
    {
      refreshInterval: 5000
    }
  );

  console.log(data);

  const finalData = data || [];
  console.log(finalData);

  return (
    <Table className='bg-card'>
      <TableHeader>
        <TableRow>
          <TableHead className='text-left'>account</TableHead>
          <TableHead className='text-center'>type</TableHead>
          <TableHead className='text-center'>
            {formatTokenI(pool.secondToken.ticker)}
          </TableHead>
          <TableHead className='text-center'>
            {formatTokenI(pool.firstToken.ticker)}
          </TableHead>

          <TableHead className='text-center'>date</TableHead>

          <TableHead className='text-right'>transaction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {finalData.map((d) => {
          const type =
            d.action.arguments.transfers[0].token === pool.firstTokenId
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
                decimals: pool.secondToken.decimals
              },
              true
            )
          );

          const jeetAmountParts = jeetAmount.split(' ');

          const firstTokenAmount = formatBigNumber(
            formatBalance(
              {
                balance: firstTokenTxValue,
                decimals: pool.firstToken.decimals
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
                  {formatAddress(d.txHash, 4, 4)}
                </a>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UserTrades;
