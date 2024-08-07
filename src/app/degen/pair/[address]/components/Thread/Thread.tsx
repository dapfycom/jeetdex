import { Button } from '@/components/ui/button';
import ThreadItem from './ThreadItem';

const Thread = () => {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <ThreadItem />
        <ThreadItem />

        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
      </div>
      <div className='flex justify-center'>
        <Button variant='secondary' className='mt-5'>
          {' '}
          Post something
        </Button>
      </div>
    </div>
  );
};

export default Thread;
