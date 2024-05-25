import { useAppSelector } from '@/hooks';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuthentication } from '@/hooks';
import { formatAddress, formatBalance } from '@/utils/mx-utils';
import { useGetAccount, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { LogOut } from 'lucide-react';
import Logo from '../Logo/Logo';

const DisconnectComponent = () => {
  const address = useAppSelector(selectUserAddress);
  const { account } = useGetAccountInfo();

  const { handleDisconnect } = useAuthentication();
  const { balance } = useGetAccount();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative flex items-center gap-3 px-2 py-1 rounded-md border border-gray-300  top-[-10px] right-[-10px] hover:bg-[#9e9e9e33] cursor-pointer'>
          <div className='hidden sm:block'>
            (
            {formatBalance({
              balance: balance,
              decimals: 18
            })}{' '}
            EGLD)
          </div>
          <Logo className='w-6 h-6 rounded-full hidden sm:block' />
          <div>
            <div>{account?.username || formatAddress(address, 6, 4)}</div>
            <div className='block sm:hidden text-xs'>
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
