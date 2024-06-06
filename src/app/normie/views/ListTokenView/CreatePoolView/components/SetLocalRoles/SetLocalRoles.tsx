import { revalidatePoolsPairs } from '@/actions/pools';
import { Button } from '@/components/ui/button';
import useTxNotification from '@/hooks/useTxNotification';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useRouter } from 'next/navigation';
import { ForwardedRef, forwardRef } from 'react';
import { setRoles } from '../../../utils/sc.calls';
import { useGetPoolPair } from '../../../utils/swr.hooks';

const SetLocalRoles = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  const { pair } = useGetPoolPair();
  const router = useRouter();
  const onSuccess = () => {
    setSessionId(null);
    router.push('/pools');
    revalidatePoolsPairs();
  };

  const { setSessionId } = useTxNotification({ onSuccess });

  const handleSetRoles = async () => {
    const res: SendTransactionReturnType = await setRoles(pair);

    if (res) {
      setSessionId(res.sessionId);
    }
  };

  return (
    <div className='bg-card rounded-sm px-4 py-6 w-full text-left' ref={ref}>
      <h2 className='text-gray-300 text-xl '>Set locale roles</h2>

      <p className='text-gray-400 text-sm mb-5 '>
        Set the locale roles for the new pool.
      </p>

      <div>
        <Button className='w-full mt-3 p-3 rounded-md' onClick={handleSetRoles}>
          Set Roles
        </Button>
      </div>
    </div>
  );
});
SetLocalRoles.displayName = 'SetLocalRoles';
export default SetLocalRoles;
