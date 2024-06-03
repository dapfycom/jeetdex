'use client';

import { likePool } from '@/actions/preferences';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/hooks';
import { useGetLikedPools } from '@/hooks/useGetUserSettings';
import { cn } from '@/lib/utils';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { errorToast, successToast } from '@/utils/toast';
import {
  faIdCardClip,
  faShare,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface IProps {
  token1: string;
  token2: string;
}
const MoreOptions = ({ token1, token2 }: IProps) => {
  const [open, setOpen] = useState(false);
  const pools = useAppSelector(selectGlobalData).pools;
  const { likedPools, mutate } = useGetLikedPools();
  const currentPool = pools.find(
    (p) => p.firstTokenId === token1 && p.secondTokenId === token2
  );

  const thisPoolsIsLiked = !!likedPools.find(
    (p) => p.pool.lpIdentifier === currentPool.lpTokenIdentifier
  );
  const handleLikePool = async () => {
    if (currentPool) {
      try {
        const res = await likePool(
          currentPool.lpTokenIdentifier,
          currentPool.firstTokenId,
          currentPool.secondTokenId
        );
        mutate();
        successToast(res.message);
      } catch (error) {}
    } else {
      errorToast('We could not find this pool');
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className='px-[8px] h-[26.8px] text-gray-700 text-[12px] rounded-full'
          size='icon'
        >
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer' onClick={handleLikePool}>
            <div className='w-full flex gap-2 items-center'>
              <FontAwesomeIcon
                icon={faStar}
                className={cn(
                  'w-[12px] h-[12px]',
                  thisPoolsIsLiked && 'text-primary'
                )}
              />
              {thisPoolsIsLiked ? 'UnLike' : 'Like'}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              // copy url
              navigator.clipboard.writeText(window.location.href);
              successToast('Link copied to clipboard');
            }}
          >
            <div className='w-full flex gap-2 items-center'>
              <FontAwesomeIcon icon={faShare} className='w-[12px] h-[12px]' />
              Share
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className='text-red-600'>
            <div className='w-full flex gap-2 items-center'>
              <FontAwesomeIcon
                icon={faIdCardClip}
                className='w-[12px] h-[12px]'
              />
              Report
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptions;
