'use client';
import UpdateCoinImg from '@/app/normie/views/ProfileView/components/UpdateCoinImg';
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
import useDisclosure from '@/hooks/useDisclosure';
import { formatTokenI } from '@/utils/mx-utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BondingData } from '../../hooks';
import { useGetBoundingPairByUser } from '../../pair/[address]/hooks';

const AddSocialsModal = dynamic(
  () => import('@/components/AddSocialsModal/AddSocialsModal'),
  {
    ssr: false
  }
);
const CoinsCreated = () => {
  const { coins } = useGetBoundingPairByUser();
  console.log(coins);

  return (
    <Table>
      <TableCaption>Tokens created on degen.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-left'>Token</TableHead>

          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coins.map((pair) => {
          return <CoinRow key={pair.address} pair={pair} />;
        })}
      </TableBody>
    </Table>
  );
};

export default CoinsCreated;

const CoinRow = ({ pair }: { pair: BondingData }) => {
  const notEnable = pair.state === 'Inactive';

  const handleEnableSwap = async () => {};
  const { isOpen, onToggle } = useDisclosure();
  return (
    <TableRow className='w-full'>
      <TableCell className='font-medium'>
        <div className='flex items-center gap-3'>
          <div className='w-[35px] h-[35px]'>
            <UpdateCoinImg
              token={{
                identifier: pair.firstTokenId,
                assets: {
                  svgUrl: pair.img
                }
              }}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span className=''>{formatTokenI(pair.firstTokenId)}</span>
          </div>
        </div>
      </TableCell>

      <TableCell className='text-end'>
        {pair ? (
          <div className='flex items-center justify-end gap-3'>
            {!notEnable ? null : (
              <Button
                variant='ghost'
                className='p-0 h-fit font-normal hover:bg-transparent hover:font-bold hover:text-white'
                onClick={handleEnableSwap}
                asChild
              >
                <Link href={`/pair/${pair.address}`}>[enable swap]</Link>
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
                identifier={pair.dbId}
                onToggle={onToggle}
                isOpen={isOpen}
                tokenIdentifier={pair.firstTokenId}
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
