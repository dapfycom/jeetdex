import CreatePoolModal from '@/components/CreatePoolModal/CreatePoolModal';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import LayoutTabs from './LayoutTabs';

const Options = ({ pools }) => {
  return (
    <div className='flex  flex-col mt-2 bg-[#1C243E] py-8 px-5 rounded-sm w-full'>
      <div className='flex w-full gap-14 items-center'>
        <h5>
          Pools <span className='text-muted-foreground'> ({pools.length})</span>
        </h5>

        <div className='flex-1 flex gap-2 items-center relative '>
          <div className='flex w-full justify-between'>
            <div className='flex gap-5'>
              <Input
                placeholder='Search by name or symbol'
                className='bg-card rounded-sm'
              />
              <LayoutTabs />
            </div>

            <div>
              <CreatePoolModal>
                <DialogTrigger asChild>
                  <Button
                    variant='ghost'
                    className='border-primary text-primary hover:bg-[#3ff2ff13]'
                  >
                    create
                  </Button>
                </DialogTrigger>
              </CreatePoolModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
