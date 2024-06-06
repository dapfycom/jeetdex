import { revalidatePoolsPairs } from '@/actions/pools';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import useTxNotification from '@/hooks/useTxNotification';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useGenerateLPStrings } from '../../../../utils/hooks';
import { createLp } from '../../../../utils/sc.calls';
import { setActiveStep } from '../../../../utils/slice';
import {
  useGetLpIdentifier,
  useGetPoolPair
} from '../../../../utils/swr.hooks';

const SubmitButton = ({ onNextStep }) => {
  const dispatch = useAppDispatch();
  const { pair } = useGetPoolPair();
  const { lpName, lpTicker } = useGenerateLPStrings();

  const { lpIdentifier, isLoading, mutate } = useGetLpIdentifier(pair);

  const onSuccess = () => {
    mutate();
    setSessionId(null);
    dispatch(setActiveStep('set-roles'));
    revalidatePoolsPairs();
  };
  const { setSessionId } = useTxNotification({ onSuccess });

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
    <Button className='w-full mt-6 p-3 rounded-md' onClick={handleCreateLp}>
      Create LP Token
    </Button>
  );

  if (!isLoading && lpIdentifier !== '') {
    button = (
      <Button
        className='w-full mt-6'
        variant='destructive'
        onClick={(e) => {
          e.preventDefault();
          onNextStep();
        }}
      >
        Lp Token already exists - Next Step
      </Button>
    );
  }

  return <div>{button}</div>;
};

export default SubmitButton;
