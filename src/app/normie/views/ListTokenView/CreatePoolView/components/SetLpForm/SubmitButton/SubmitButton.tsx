import { Button } from '@/components/ui/button';
import { useAppDispatch, useTrackTransactionStatus } from '@/hooks';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useState } from 'react';
import { useGenerateLPStrings } from '../../../../utils/hooks';
import { createLp } from '../../../../utils/sc.service';
import { setActiveStep } from '../../../../utils/slice';
import {
  useGetLpIdentifier,
  useGetPoolPair
} from '../../../../utils/swr.hooks';

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const { pair } = useGetPoolPair();
  const { lpName, lpTicker } = useGenerateLPStrings();

  const { lpIdentifier, isLoading, mutate } = useGetLpIdentifier(pair);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const onSuccess = () => {
    mutate();
    setSessionId(null);
    dispatch(setActiveStep('set-roles'));
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  const handleCreateLp = async () => {
    const res: SendTransactionReturnType = await createLp(
      pair,
      lpName,
      lpTicker
    );

    if (res) {
      setSessionId(res.sessionId);
    }
  };

  let button = (
    <Button className='w-full mt-10 p-3 rounded-md' onClick={handleCreateLp}>
      Create LP Token
    </Button>
  );

  if (!isLoading && lpIdentifier !== '') {
    button = (
      <Button
        className='w-full mt-10'
        variant='destructive'
        onClick={(e) => {
          e.preventDefault();
          dispatch(setActiveStep('set-roles'));
        }}
      >
        Lp Token already exists - Next Step
      </Button>
    );
  }

  return <div>{button}</div>;
};

export default SubmitButton;
