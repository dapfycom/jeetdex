import { toast } from '@/components/ui/use-toast';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const successToast = (message: string) => {
  toast({
    description: (
      <div>
        <FontAwesomeIcon icon={faCheckCircle} className='mr-2 text-green-500' />
        {message}
      </div>
    )
  });
};

export const errorToast = (message: string) => {
  toast({
    description: (
      <div>
        <FontAwesomeIcon icon={faWarning} className='mr-2 text-red-500' />
        {message}
      </div>
    )
  });
};

export const infoToast = (message: string) => {
  toast({
    description: (
      <div>
        <FontAwesomeIcon icon={faCheckCircle} className='mr-2 text-blue-500' />
        {message}
      </div>
    )
  });
};
