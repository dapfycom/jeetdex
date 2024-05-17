import { Input } from '@/components/ui/input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Options = () => {
  return (
    <div className='flex w-full gap-14 mt-10 items-center'>
      <h5>
        Pools <span className='text-muted-foreground'> (3)</span>
      </h5>

      <div className='flex-1 flex gap-2 items-center relative '>
        <div className=' absolute left-2 top-0 h-full flex items-center'>
          <FontAwesomeIcon icon={faSearch} className='h-[20px] w-[20px]' />
        </div>
        <Input placeholder='Search by name or symbol' className='pl-10' />
      </div>
    </div>
  );
};

export default Options;
