import { Button } from '@/components/ui/button';
import { interactions } from '@/services/sc/interactions';
import { Address, AddressValue } from '@multiversx/sdk-core/out';
import { useContext } from 'react';
import { FarmContext } from '../FarmItem';

const ClaimRewardsBtn = () => {
  const { hatomFarm } = useContext(FarmContext);
  console.log({
    hatomFarm
  });

  const handleClick = () => {
    interactions.hatomParent.scCall({
      functionName: 'claimRewards',
      arg: [
        new AddressValue(new Address(hatomFarm?.moneyMarket.childScAddress))
      ],
      gasL: 200_000_000
    });
  };
  return (
    <Button
      className='text-sm w-full bg-green-600 text-white hover:text-green-500'
      onClick={handleClick}
    >
      Claim rewards
    </Button>
  );
};

export default ClaimRewardsBtn;
