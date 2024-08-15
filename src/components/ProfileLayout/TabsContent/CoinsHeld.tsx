'use client';
import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useAppSelector } from '@/hooks';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import {
  formatBalance,
  formatBalanceDollar,
  formatPrecision,
  formatTokenI
} from '@/utils/mx-utils';

const CoinsHeld = () => {
  const globalData = useAppSelector(selectGlobalData);
  const { userTokens } = useGetUserTokens();

  const tokens = userTokens.filter((token) => {
    return globalData.coins
      .map((coin) => coin.identifier)
      .includes(token.identifier);
  });

  return (
    <Table>
      <TableCaption>A list of your tokens in wallet.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Token</TableHead>
          <TableHead className='text-center'>Price</TableHead>
          <TableHead className='text-right'>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='overflow-auto'>
        {tokens.map((token) => {
          return (
            <TableRow key={token.identifier}>
              <TableCell className='font-medium'>
                <div className='flex items-center gap-3'>
                  <TokenImageSRC
                    size={35}
                    src={token?.assets?.svgUrl}
                    alt={token.name}
                    identifier={token.identifier}
                    className='rounded-full w-[35px] h-[35px]'
                  />
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

export default CoinsHeld;
