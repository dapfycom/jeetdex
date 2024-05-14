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
      <DropdownMenuTrigger>
        <div className='flex items-center gap-3 px-3 py-2 rounded-md border'>
          <div>
            ({' '}
            {formatBalance({
              balance: balance,
              decimals: 18
            })}{' '}
            EGLD )
          </div>
          <Logo className='w-6 h-6 rounded-full' />
          <div>{account?.username || formatAddress(address, 6, 4)}</div>
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
