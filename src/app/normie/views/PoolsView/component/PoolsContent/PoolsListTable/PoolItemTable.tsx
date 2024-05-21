'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { jeetStaticData } from '@/localConstants/tokensStaticsData';
import {
  faChartColumn,
  faExchange,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import ChartCard from '@/components/ChartCard/ChartCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';

const PoolItem = () => {
  const { isOpen: clickStar, onToggle: onToggleStar } = useDisclosure();
  const { isOpen: poolChart, onToggle: togglePoolChart } = useDisclosure();
  return (
    <TableRow className='even:bg-[#09091bb6] odd:bg-[#0908182d]'>
      <TableCell className='text-center py-4'>
        <FontAwesomeIcon
          icon={faStar}
          className={cn(
            'cursor-pointer',
            clickStar ? 'text-primary' : 'text-gray-400/50'
          )}
          onClick={onToggleStar}
        />
      </TableCell>

      <TableCell className='font-medium py-4'>
        <div className='flex'>
          <div className='flex'>
            <div className='w-[26px] h-[26px] rounded-full bg-gradient-to-r from-[rgba(171,_196,_255,_0.20)] from-30% to-[rgba(171,_196,_255,_0.00)]  flex justify-center items-center backdrop-blur-sm'>
              <Image
                src={jeetStaticData.assets.svgUrl}
                alt='Token1'
                className='w-[18px] h-[18px] rounded-full'
                width={32}
                height={32}
              />
            </div>
            <div className='w-[26px] h-[26px] rounded-full bg-card flex justify-center items-center backdrop-blur-sm -translate-x-1'>
              <Image
                src={jeetStaticData.assets.svgUrl}
                alt='Token1'
                className='w-[18px] h-[18px] rounded-full'
                width={32}
                height={32}
              />
            </div>
          </div>
          <div>
            <div className='whitespace-nowrap'>JEET-EGLD</div>
            <Badge className='rounded-full px-1 py-0 text-xs bg-card text-gray-300/80'>
              0.01%
            </Badge>
          </div>
        </div>
      </TableCell>
      <TableCell className='text-right py-4'>0</TableCell>
      <TableCell className='text-right py-4'>$70</TableCell>
      <TableCell className='text-right py-4'>$1</TableCell>
      <TableCell className='text-right py-4 flex items-center w-full justify-end gap-3'>
        <Dialog open={poolChart} onOpenChange={togglePoolChart}>
          <DialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant='outline'
                    className='border-primary text-primary py-4 hover:bg-[#3ff2ff13]'
                    size='sm'
                    onClick={togglePoolChart}
                  >
                    <FontAwesomeIcon icon={faChartColumn} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AView Pool charts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent>
            <div className='min-h-[400px]'>
              <ChartCard />
            </div>
          </DialogContent>
        </Dialog>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant='outline'
                className='border-primary text-primary py-4 hover:bg-[#3ff2ff13]'
                size='sm'
                asChild
              >
                <Link href={'/'}>
                  <FontAwesomeIcon icon={faExchange} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Swap</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant='outline'
          className='border-green-500 text-green-500 py-4 hover:bg-[#3ff2ff13] hover:text-green-500'
          size='sm'
        >
          Deposit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PoolItem;
