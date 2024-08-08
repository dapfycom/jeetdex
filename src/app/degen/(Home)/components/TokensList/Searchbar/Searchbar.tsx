'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';

const SearchBar = () => {
  const { updateParams, currentParams } = useUpdateUrlParams(['search']);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    updateParams('search', search);
  };

  return (
    <div className='flex gap-3 justify-center mx-auto items-center'>
      <Input
        className='w-full max-w-[400px] bg-primary text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary'
        placeholder='search for token'
        onChange={onSearch}
        value={currentParams[0] || ''}
      />

      <Button size='sm'>Search</Button>
    </div>
  );
};

export default SearchBar;
