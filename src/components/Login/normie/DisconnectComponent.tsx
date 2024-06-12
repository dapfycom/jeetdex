import { useAuthentication, useGetUserInfo } from '@/hooks';

import { formatBalance } from '@/utils/mx-utils';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';

const DisconnectComponent = () => {
  const { handleDisconnect } = useAuthentication();
  const { balance } = useGetAccount();
  const { userInfo } = useGetUserInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative flex items-center text-sm gap-1 px-1 py-0 rounded-sm border border-gray-300   cursor-pointer min-w-[85px]'>
          <div className='hidden sm:block'>
            (
            {formatBalance({
              balance: balance,
              decimals: 18
            })}{' '}
            EGLD)
          </div>
          <Image
            src={userInfo?.data?.img || '/assets/img/logo-jeeter.png'}
            alt='User'
            width={20}
            height={20}
            className='w-4 h-4 rounded-full '
          />
          <div>
            <div>{userInfo?.data?.username}</div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[200px]'>
        <DropdownMenuItem onClick={handleDisconnect}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DisconnectComponent;
