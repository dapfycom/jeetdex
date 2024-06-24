import CreatePoolModal from '@/components/CreatePoolModal/CreatePoolModal';
import SearchPool from './SearchPool';

const Options = ({ pools }) => {
  return (
    <div className='flex  flex-col mt-2 bg-[#1C243E] py-8 px-5 rounded-sm w-full'>
      <div className='flex flex-col md:flex-row w-full gap-4 md:gap-10 md:items-center items-start'>
        <h5>
          Pools <span className='text-muted-foreground'> ({pools.length})</span>
        </h5>

        <div className='flex-1 flex gap-2 items-center relative '>
          <div className='flex w-full justify-between'>
            <div className='flex gap-5 flex-col items-start md:flex-row md:items-center w-full'>
              <SearchPool />
            </div>

            <div>
              <CreatePoolModal
                variant='ghost'
                className='border-primary text-primary hover:bg-[#3ff2ff13]'
              >
                create
              </CreatePoolModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
