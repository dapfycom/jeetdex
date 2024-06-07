import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LayoutTabs = () => {
  return (
    <div className=''>
      <div className='flex gap-3 items-center text-gray-400'>
        <TabsList className='bg-card rounded-sm px-4 gap-4'>
          <TabsTrigger
            value='table'
            className='text-gray-500 data-[state=active]:bg-transparent data-[state=active]:text-white'
          >
            <FontAwesomeIcon icon={faList} className='w-4 h-4' />
          </TabsTrigger>
          <TabsTrigger
            value='cards'
            className='text-gray-500 data-[state=active]:bg-transparent data-[state=active]:text-white'
          >
            {' '}
            <FontAwesomeIcon icon={faThLarge} className='w-4 h-4' />
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default LayoutTabs;
