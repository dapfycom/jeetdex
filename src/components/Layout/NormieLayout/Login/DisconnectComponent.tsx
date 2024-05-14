import { useAppSelector } from '@/hooks';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuthentication } from '@/hooks';
import { formatAddress } from '@/utils/mx-utils';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { LogOut } from 'lucide-react';

const DisconnectComponent = () => {
  const address = useAppSelector(selectUserAddress);
  const { account } = useGetAccountInfo();

  const { handleDisconnect } = useAuthentication();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex gap-3 px-3 py-2 rounded-md border'>
          <FontAwesomeIcon icon={faUserCircle} className='w-5 h-5' />
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
