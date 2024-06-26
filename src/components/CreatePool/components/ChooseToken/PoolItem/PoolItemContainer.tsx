import PoolItemSkeleton from '../../CreatePoolForm/Skeletons/PoolItemSkeleton';
import PoolItem from './PoolItem';

export interface ITokenPool {
  identifier: string;
  imgUrl?: string;
  decimals: number;
  balance?: string;
}

interface TokenItemProps {
  tokensList: ITokenPool[];
  isLoading: boolean;
  tokenType: 'firstToken';
}

const PoolItemContainer = ({
  tokensList,
  tokenType,
  isLoading
}: TokenItemProps) => {
  return (
    <div className='w-full'>
      {isLoading ? (
        <PoolItemSkeleton />
      ) : tokensList.length !== 0 ? (
        <PoolItem tokensList={tokensList} tokenType={tokenType} />
      ) : (
        <div className='bg-[#1C243E]  p-3 rounded-md w-full flex justify-between items-center '>
          No tokens found, make sure you are the owner of the token
        </div>
      )}
    </div>
  );
};

export default PoolItemContainer;
