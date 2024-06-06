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
  onSuccess
}: {
  submittedTxCallback?: () => void;
  onSuccess?: () => void;
}) => {
  const ref = useRef(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleFail = () => {
    if (transactions && transactions[0]?.hash) {
      toast((t) => ToastFailed({ hash: transactions[0]?.hash, t }), {
        duration: 15000
      });
    }
  };
  const { transactions } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: handleSuccess,
    onFail: handleFail
  });

  const handleToast = useCallback(() => {
    if (transactions && transactions[0]?.hash) {
      toast((t) => ToastSubmitted({ hash: transactions[0]?.hash, t }), {
        duration: 15000
      });
      if (submittedTxCallback) {
        submittedTxCallback();
      }
      ref.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  useEffect(() => {
    if (!ref.current) {
      handleToast();
    }
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

const ToastSubmitted = ({ hash, t }: IProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

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
