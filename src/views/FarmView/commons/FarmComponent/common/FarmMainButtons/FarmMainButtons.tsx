import { Button } from '@/components/ui/button';
import { useAuthentication } from '@/hooks';
import useDisclosure from '@/hooks/useDisclosure';
import { withdraw } from '@/views/FarmView/utils/services';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MouseEvent } from 'react';
import StakeModal from '../Modals/StakeModal';

interface IProps {
  isOpen: boolean;
}

const FarmMainButtons = ({ isOpen }: IProps) => {
  const {
    isOpen: isOpenStake,
    onClose: onCloseStake,
    onOpen: onOpenStake
  } = useDisclosure();
  const { isLoggedIn, handleConnect } = useAuthentication();
  const handleStakeLp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenStake();
  };

  const handleHarvest = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    withdraw();
  };

  return (
    <div className='flex justify-center items-center gap-4 flex-col lg:flex-row'>
      {isLoggedIn ? (
        <>
          <Button
            className='text-sm w-full lg:w-auto bg-green-600 hover:text-green-500 text-white'
            onClick={handleHarvest}
          >
            Harvest
          </Button>
          <Button
            className='text-sm w-full lg:w-auto  text-white'
            onClick={handleStakeLp}
          >
            Stake LP
          </Button>

          <span className='text-lg'>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </>
      ) : (
        <Button className='w-auto' onClick={handleConnect}>
          Connect Wallet
        </Button>
      )}

      {isOpenStake && (
        <StakeModal isOpen={isOpenStake} onClose={onCloseStake} />
      )}
    </div>
  );
};

export default FarmMainButtons;
