import { useAppSelector, useAuthentication, useGetUserInfo } from '@/hooks';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';

import { formatAddress, formatBalance } from '@/utils/mx-utils';
import { useGetAccount, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';

const DisconnectComponent = () => {
  const address = useAppSelector(selectUserAddress);
  const { account } = useGetAccountInfo();

  const { handleDisconnect } = useAuthentication();
  const { balance } = useGetAccount();
  const { userInfo } = useGetUserInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative flex items-center text-sm gap-1 px-1 py-0 rounded-sm border border-gray-300   cursor-pointer'>
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
            className='w-4 h-4 rounded-full hidden sm:block'
          />
          <div>
            <div>{account?.username || formatAddress(address, 6, 4)}</div>
            <Image
              src={userInfo?.data?.img || '/assets/img/logo-jeeter.png'}
              alt='User'
              width={20}
              height={20}
              className='w-4 h-4 rounded-full mx-auto my-1 block sm:hidden'
            />
            <div className='block sm:hidden text-xs text-center'>
              ({' '}
              {formatBalance({
                balance: balance,
                decimals: 18
              })}{' '}
              EGLD )
            </div>
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
