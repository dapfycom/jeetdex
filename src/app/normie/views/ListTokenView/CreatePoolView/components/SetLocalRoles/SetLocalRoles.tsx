import { revalidatePoolsPairs } from '@/actions/pools';
import { Button } from '@/components/ui/button';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setRoles } from '../../../utils/sc.calls';
import { useGetPoolPair } from '../../../utils/swr.hooks';
import FormNav from '../FormNav/FormNav';

const SetLocalRoles = () => {
  const { pair } = useGetPoolPair();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();
  const onSuccess = () => {
    setSessionId(null);
    router.push('/pools');
    revalidatePoolsPairs();
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  const handleSetRoles = async () => {
    const res: SendTransactionReturnType = await setRoles(pair);

    if (res) {
      setSessionId(res.sessionId);
    }
  };

  return (
    <div className='bg-zinc-900 rounded-xl px-8 py-12 w-full text-left'>
      <h2 className='text-gray-300 text-xl '>Set locale roles</h2>

      <p className='text-gray-400 text-sm mb-10 '>
        Set the locale roles for the new pool.
      </p>

      <div>
        <Button
          className='w-full mt-10 p-3 rounded-md'
          onClick={handleSetRoles}
        >
          Set Roles
        </Button>
      </div>

      <FormNav currentStep='set-roles' />
    </div>
  );
};

export default SetLocalRoles;
