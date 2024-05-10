import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className='flex gap-3 justify-center mx-auto items-center'>
      <Input className='w-full max-w-[400px]' placeholder='search for token' />

      <Button size='sm'>Search</Button>
    </div>
  );
};

export default SearchBar;
