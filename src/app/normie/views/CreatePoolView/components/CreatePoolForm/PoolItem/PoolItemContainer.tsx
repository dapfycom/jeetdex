import PoolItemSkeleton from '../Skeletons/PoolItemSkeleton';
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
  tokenType: 'firstToken' | 'secondToken';
}

const PoolItemContainer = ({
  tokensList,
  tokenType,
  isLoading
}: TokenItemProps) => {
  return (
    <div className='w-full'>
      {isLoading || tokensList.length === 0 ? (
        <PoolItemSkeleton />
      ) : (
        <PoolItem tokensList={tokensList} tokenType={tokenType} />
      )}
    </div>
  );
};

export default PoolItemContainer;
