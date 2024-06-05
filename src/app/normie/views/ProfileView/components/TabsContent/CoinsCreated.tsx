'use client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { scAddress, tokensID } from '@/config';
import { useAppSelector } from '@/hooks';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectGlobalData, selectUserAddress } from '@/redux/dapp/dapp-slice';
import { fetchTransactions } from '@/services/rest/elrond/transactions';
import { IElrondAccountToken } from '@/types/scTypes';
import {
  formatBalance,
  formatBalanceDollar,
  formatPrecision,
  formatTokenI
} from '@/utils/mx-utils';
import { Address } from '@multiversx/sdk-core/out';
import { decodeBase64 } from '@multiversx/sdk-dapp/utils';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { enableTrade } from '../../../ListTokenView/utils/sc.calls';
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
          <TableHead className='text-center'>Value</TableHead>

          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokensHeld.map((token) => {
          console.log(token);

          return <CoinRow key={token.identifier} token={token} />;
        })}
      </TableBody>
    </Table>
  );
};

export default CoinsCreated;

const CoinRow = ({ token }: { token: IElrondAccountToken }) => {
  const globalData = useAppSelector(selectGlobalData);

  const pools = globalData.pools;

  const pairForThisToken = pools.find(
    (p) =>
      p.firstTokenId === token.identifier && p.secondTokenId === tokensID.jeet
  );
  const { data } = useSWR(
    ['/transactions', token.owner, scAddress.mainRouter, 'success'],
    () =>
      fetchTransactions({
        function: 'enablePair',
        sender: token.owner,
        receiver: scAddress.mainRouter,
        status: 'success'
      })
  );

  console.log(data);
  const transactions = data || [];

  const alreadyEnabled = !!transactions.find((tx) => {
    const addressHex = decodeBase64(tx.data).split('@')[1];
    console.log(addressHex);
    return Address.fromHex(addressHex).bech32() === pairForThisToken.address;
  });
  const handleEnableSwap = async () => {
    await enableTrade(pairForThisToken.address);
  };
  return (
    <TableRow>
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
      <TableCell className='text-center'>
        {formatBalanceDollar(token, token.price)}
      </TableCell>
      <TableCell className='text-center'>
        {pairForThisToken ? (
          <div>
            {alreadyEnabled ? (
              <div>swap active</div>
            ) : (
              <Button variant='ghost' onClick={handleEnableSwap}>
                [enable swap]
              </Button>
            )}
          </div>
        ) : (
          <div>No pool found!</div>
        )}
      </TableCell>
    </TableRow>
  );
};
