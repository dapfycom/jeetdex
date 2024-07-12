import CreatePoolModal from '@/components/CreatePoolModal/CreatePoolModal';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchPool from './SearchPool';

const Options = () => {
  return (
    <div className='flex  flex-col mt-2rounded-sm w-full'>
      <div className='flex flex-col md:flex-row w-full gap-4 md:gap-10 md:items-center items-start'>
        <div className='flex-1 flex gap-2 items-center relative w-full'>
          <div className='flex w-full '>
            <div className='flex flex-1 gap-5 flex-col items-start md:flex-row md:items-center'>
              <SearchPool />
            </div>

            <div>
              <CreatePoolModal
                variant='ghost'
                className='border-primary text-primary hover:bg-[#3ff2ff13]'
              >
                <FontAwesomeIcon icon={faPlusCircle} className='h-6 w-6' />
              </CreatePoolModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
