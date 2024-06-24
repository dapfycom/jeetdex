import { network } from '@/config';
import { formatAddress } from '@/utils/mx-utils';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircle, LoaderCircle, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import { useGetSignedTransactions } from './sdkDappHooks';
import { useTrackTransactionStatus } from './useTrackTransactionsStatus';

const useTxNotification = ({
  submittedTxCallback,
  onSuccess,
  waitTx,
  sessionId // setSessionId
}: {
  submittedTxCallback?: () => void;
  onSuccess?: () => void;
  waitTx?: boolean;
  sessionId: string;
  setSessionId: (v: string | null) => void;
}) => {
  const ref = useRef<string>(null);

  const signtx = useGetSignedTransactions();
  const transactions = useMemo(
    () => signtx.signedTransactions[sessionId]?.transactions,
    [sessionId, signtx.signedTransactions]
  );

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleFail = (t: string) => {
    if (transactions && transactions[0]?.hash) {
      toast((t) => ToastFailed({ hash: transactions[0]?.hash, t }), {
        duration: 15000
      });
    }
    console.log(t);

    toast.dismiss(t);
  };

  const handleToast = useCallback(() => {
    if (
      transactions &&
      transactions[0]?.hash &&
      transactions[0]?.hash !== ref.current &&
      sessionId
    ) {
      console.log(transactions);
      console.log(sessionId);

      ref.current = transactions[0]?.hash;

      const toastId = toast(
        (t) =>
          ToastSubmitted({
            hash: transactions[0]?.hash,
            t,
            waitTx,
            handleFail,
            handleSuccess,
            sessionId
          }),
        {
          duration: waitTx ? 180000 : 15000
        }
      );
      console.log(toastId);

      if (submittedTxCallback) {
        submittedTxCallback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, transactions, waitTx]);

  useEffect(() => {
    console.log(ref.current);

    handleToast();
  }, [handleToast]);

  return {
    toastTxNotification: handleToast,
    ref
  };
};

export default useTxNotification;

interface IProps {
  t: Toast;
  hash: string;
}

interface IToastWithPendingProps extends IProps {
  waitTx?: boolean;

  sessionId: string;
  handleSuccess: () => void;
  handleFail: (tid: string) => void;
}

const ToastSubmitted = ({
  hash,
  t,
  waitTx,
  sessionId,
  handleSuccess,
  handleFail
}: IToastWithPendingProps) => {
  const [loading, setLoading] = useState(true);

  const { isPending } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: handleSuccess,
    onFail: () => handleFail(t.id)
  });

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
          <div>
            processing transaction <br />
            {typeof hash === 'string' && (
              <span>
                view on explorer:{' '}
                <a
                  href={network.explorerAddress + '/transactions/' + hash}
                  target='_blank'
                  className='text-green-700'
                >
                  {formatAddress(hash)}
                </a>
              </span>
            )}
          </div>
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
                    className='text-green-700'
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
                  className='text-green-700'
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
