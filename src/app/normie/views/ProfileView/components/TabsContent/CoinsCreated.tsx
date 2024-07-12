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
import { scAddress } from '@/config';
import { useAppSelector, useTrackTransactionStatus } from '@/hooks';
import useDisclosure from '@/hooks/useDisclosure';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectGlobalData, selectUserAddress } from '@/redux/dapp/dapp-slice';
import { fetchTransactions } from '@/services/rest/elrond/transactions';
import { ITransaction } from '@/types/scTypes';
import { formatTokenI } from '@/utils/mx-utils';
import { Address } from '@multiversx/sdk-core/out';
import { decodeBase64 } from '@multiversx/sdk-dapp/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { enableTrade } from '../../../../../../components/CreatePool/utils/sc.calls';
import { IPoolPair } from '../../../PoolsView/utils/types';
import UpdateCoinImg from '../UpdateCoinImg';
const AddSocialsModal = dynamic(
  () => import('@/components/AddSocialsModal/AddSocialsModal'),
  {
    ssr: false
  }
);
const CoinsCreated = () => {
  const address = useSelector(selectUserAddress);

  const { userTokens } = useGetUserTokens();

  const tokensHeld = userTokens.filter((t) => t.owner === address);

  const globalData = useAppSelector(selectGlobalData);

  const pools = globalData.pools;

  const userPairs = pools.filter((p) =>
    tokensHeld.map((t) => t.identifier).includes(p.firstTokenId)
  );

  const { data } = useSWR(
    ['/transactions', address, scAddress.mainRouter, 'success'],
    () =>
      fetchTransactions({
        function: 'enablePair',
        sender: address,
        receiver: scAddress.mainRouter,
        status: 'success',
        size: 100
      })
  );

  const transactions = data || [];

  return (
    <Table>
      <TableCaption>A list of your tokens in wallet.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-left'>Token</TableHead>

          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userPairs.map((pair) => {
          return (
            <CoinRow
              key={pair.address}
              pair={pair}
              transactions={transactions}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CoinsCreated;

const CoinRow = ({
  pair,
  transactions
}: {
  pair: IPoolPair;
  transactions: ITransaction[];
}) => {
  const alreadyEnabled = !!transactions.find((tx) => {
    const addressHex = decodeBase64(tx.data).split('@')[1];
    return Address.fromHex(addressHex).bech32() === pair?.address;
  });

  const [sessionId, setSessionId] = useState<string | null>(null);

  // useTxNotification({ sessionId, setSessionId });
  useTrackTransactionStatus({
    transactionId: sessionId
  });
  const handleEnableSwap = async () => {
    const res = await enableTrade(pair.address);
    setSessionId(res.sessionId);
  };
  const { isOpen, onToggle } = useDisclosure();
  return (
    <TableRow className='w-full'>
      <TableCell className='font-medium'>
        <div className='flex items-center gap-3'>
          <div className='w-[35px] h-[35px]'>
            <UpdateCoinImg token={pair.firstToken} />
          </div>
          <div className='flex flex-col gap-1'>
            <span className=''>{formatTokenI(pair.lpTokenIdentifier)}</span>
          </div>
        </div>
      </TableCell>

      <TableCell className='text-end'>
        {pair ? (
          <div className='flex items-center justify-end gap-3'>
            {alreadyEnabled ? null : (
              <Button
                variant='ghost'
                className='p-0 h-fit font-normal hover:bg-transparent hover:font-bold hover:text-white'
                onClick={handleEnableSwap}
              >
                [enable swap]
              </Button>
            )}
            <Button
              variant='ghost'
              className='p-0 h-fit font-normal hover:bg-transparent hover:font-bold hover:text-white'
              onClick={onToggle}
            >
              [add socials]
            </Button>
            {isOpen && (
              <AddSocialsModal
                tokenIdentifier={pair.firstTokenId}
                onToggle={onToggle}
                isOpen={isOpen}
              />
            )}
          </div>
        ) : (
          <div>-</div>
        )}
      </TableCell>
    </TableRow>
  );
};
