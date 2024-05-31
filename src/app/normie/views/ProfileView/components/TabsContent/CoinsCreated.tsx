'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import {
  formatBalance,
  formatBalanceDollar,
  formatPrecision,
  formatTokenI
} from '@/utils/mx-utils';
import { useSelector } from 'react-redux';
import UpdateCoinImg from '../UpdateCoinImg';
const CoinsCreated = () => {
  const address = useSelector(selectUserAddress);

  const { userTokens } = useGetUserTokens();

  const tokensHeld = userTokens.filter((t) => t.owner === address);

  return (
    <Table>
      <TableCaption>A list of your tokens in wallet.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-left'>Token</TableHead>
          <TableHead className='text-center'>Price</TableHead>
          <TableHead className='text-right'>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokensHeld.map((token) => {
          console.log(token);

          return (
            <TableRow key={token.identifier}>
              <TableCell className='font-medium'>
                <div className='flex items-center gap-3'>
                  <UpdateCoinImg token={token} />
                  <div className='flex flex-col gap-1'>
                    <span className=''>
                      {token.ticker || formatTokenI(token.identifier)}
                    </span>
                    <span className='text-sm text-muted-foreground'>
                      {formatBalance(token)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className='text-center'>
                {token.price ? `$${formatPrecision(token.price)}` : '-$'}
              </TableCell>
              <TableCell className='text-right'>
                {formatBalanceDollar(token, token.price)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CoinsCreated;
