import { network } from '@/config';
import { formatAddress } from '@/utils/mx-utils';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircle, LoaderCircle, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { useTrackTransactionStatus } from './sdkDappHooks';

const useTxNotification = ({
  submittedTxCallback,
  onSuccess,
  waitTx
}: {
  submittedTxCallback?: () => void;
  onSuccess?: () => void;
  waitTx?: boolean;
}) => {
  const ref = useRef<string>(null);
  const [currentToast, setCurrentToast] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    setSessionId(null);
  };

  const handleFail = () => {
    if (transactions && transactions[0]?.hash) {
      toast((t) => ToastFailed({ hash: transactions[0]?.hash, t }), {
        duration: 15000
      });
    }

    toast.dismiss(currentToast);
    setSessionId(null);
  };
  const { transactions, isFailed, isSuccessful } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: handleSuccess,
    onFail: handleFail
  });

  const handleToast = useCallback(() => {
    if (
      transactions &&
      transactions[0]?.hash &&
      transactions[0]?.hash !== ref.current
    ) {
      ref.current = transactions[0]?.hash;
      const toastId = toast(
        (t) =>
          ToastSubmitted({
            hash: transactions[0]?.hash,
            t,
            isPending: !isFailed && !isSuccessful,
            waitTx
          }),
        {
          duration: waitTx ? 60000 : 15000
        }
      );

      setCurrentToast(toastId);

      if (submittedTxCallback) {
        submittedTxCallback();
      }
    }
  }, [isFailed, isSuccessful, submittedTxCallback, transactions, waitTx]);

  useEffect(() => {
    console.log(ref.current);

    handleToast();
  }, [handleToast]);

  return {
    toastTxNotification: handleToast,
    ref,
    setSessionId
  };
};

export default useTxNotification;

interface IProps {
  t: Toast;
  hash: string;
}

interface IToastWithPendingProps extends IProps {
  isPending: boolean;
  waitTx?: boolean;
}

const ToastSubmitted = ({
  hash,
  t,
  isPending,
  waitTx
}: IToastWithPendingProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!waitTx) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [waitTx]);
  console.log(isPending);

  useEffect(() => {
    if (!isPending) {
      setLoading(false);
    }
  }, [isPending]);

  return (
    <div className='relative p-4 text-sm'>
      {loading ? (
        <span className='flex items-center gap-3'>
          <span>
            <LoaderCircle className='animate-spin' />
          </span>
          processing transaction
        </span>
      ) : (
        <div className=''>
          <span className='flex items-center gap-3'>
            <span>
              <CheckCircle className=' text-green-500' />
            </span>
            <div>
              transaction submitted. <br />
              {typeof hash === 'string' && (
                <span>
                  view on explorer:{' '}
                  <a
                    href={network.explorerAddress + '/transactions/' + hash}
                    target='_blank'
                    className='text-primary'
                  >
                    {formatAddress(hash)}
                  </a>
                </span>
              )}
            </div>
          </span>
        </div>
      )}
      <div
        className='absolute right-0 top-0 cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      >
        <X fontSize={'14px'} size={'16px'} />
      </div>
    </div>
  );
};

const ToastFailed = ({ hash, t }: IProps) => {
  return (
    <div className='relative p-4 text-sm'>
      <div className=''>
        <span className='flex items-center gap-3'>
          <span>
            <FontAwesomeIcon icon={faTimes} className=' text-red-500' />
          </span>
          <div>
            your transaction has failed. <br />
            {typeof hash === 'string' && (
              <span>
                view on explorer:{' '}
                <a
                  href={network.explorerAddress + '/transactions/' + hash}
                  target='_blank'
                  className='text-primary'
                >
                  {formatAddress(hash)}
                </a>
              </span>
            )}
          </div>
        </span>
      </div>

      <div
        className='absolute right-0 top-0 cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      >
        <X fontSize={'14px'} size={'16px'} />
      </div>
    </div>
  );
};
