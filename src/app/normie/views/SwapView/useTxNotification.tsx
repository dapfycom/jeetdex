import { network } from '@/config';
import { formatAddress } from '@/utils/mx-utils';
import { CheckCircle, LoaderCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';

const useTxNotification = () => {
  const handleToast = (hash: string) => {
    console.log('handleToast');

    toast((t) => ToastComponent({ hash, t }), {
      duration: 10000
    });
  };
  return {
    toastTxNotification: handleToast
  };
};

export default useTxNotification;

interface IProps {
  t: Toast;
  hash: string;
}

const ToastComponent = ({ hash, t }: IProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative p-4'>
      {loading ? (
        <span className='flex items-center gap-3'>
          <span>
            <LoaderCircle className='animate-spin' />
          </span>
          Processing transaction
        </span>
      ) : (
        <div className=''>
          <span className='flex items-center gap-3'>
            <span>
              <CheckCircle className=' text-green-500' />
            </span>
            <div>
              Transaction submitted. Transaction Hash:{' '}
              <a
                href={network.explorerAddress + '/transactions/' + hash}
                target='_blank'
                className='text-primary'
              >
                {formatAddress(hash)}
              </a>
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
