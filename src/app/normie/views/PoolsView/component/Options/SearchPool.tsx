'use client';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { onChangeSearchPoolInput } from '../../utils/pools-slice';

const SearchPool = () => {
  const dispatch = useDispatch();
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    dispatch(onChangeSearchPoolInput(value));
  };

  return (
    <Input
      placeholder='Search by name or symbol'
      className='bg-card rounded-sm w-full max-w-[450px]'
      onChange={handleSearchInputChange}
    />
  );
};

export default SearchPool;
