'use client';
import Collapse from '@/components/Collapse/Collapse';
import CreatePoolModal from '@/components/CreatePoolModal/CreatePoolModal';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDisclosure from '@/hooks/useDisclosure';
import { faSearch, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutTabs from './LayoutTabs';

const Options = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div className='flex flex-col mt-10 bg-[#1C243E] py-8 px-5 rounded-3xl w-full'>
      <div className='flex w-full gap-14'>
        <h5>
          Pools <span className='text-muted-foreground'> (3)</span>
        </h5>

        <div className='flex-1 flex gap-2 items-center relative '>
          <div className=' absolute left-3 top-0 h-full flex items-center'>
            <FontAwesomeIcon
              icon={faSearch}
              className='h-[15px] w-[15px] text-gray-400/50'
            />
          </div>

          <div className='flex w-full justify-between'>
            <div className='flex gap-5'>
              <Input
                placeholder='Search by name or symbol'
                className='pl-10 bg-card rounded-full'
              />
              <Button className='rounded-full px-5' onClick={onToggle}>
                <FontAwesomeIcon icon={faSliders} className='w-5 h-5' />
              </Button>
            </div>

            <div>
              <CreatePoolModal>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-primary text-primary hover:bg-[#3ff2ff13]'
                  >
                    Create
                  </Button>
                </DialogTrigger>
              </CreatePoolModal>
            </div>
          </div>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <div className=' mt-8'>
          <div>
            <LayoutTabs />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Options;
