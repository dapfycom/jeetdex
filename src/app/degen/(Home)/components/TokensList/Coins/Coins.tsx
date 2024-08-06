'use client';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { formatTokenI } from '@/utils/mx-utils';
import { useFetchCoinsData } from '../../../../hooks';
import CoinItem from './CoinItem';
import CoinSkeleton from './CoinSkeleton';

const Coins = () => {
  const { currentParams } = useUpdateUrlParams(['search']);

  const { coinsData, isLoading } = useFetchCoinsData({
    search: currentParams[0],
    states: ['Active', 'Finished']
  });
  console.log(coinsData);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
      {isLoading ? (
        <>
          {[...Array(10)].map((_, index) => (
            <CoinSkeleton key={index} />
          ))}
        </>
      ) : (
        coinsData.map((coin, index) => (
          <CoinItem
            key={index}
            imageUrl={coin.img}
            name={coin.title}
            ticker={formatTokenI(coin.firstTokenId)}
            marketCap={coin.marketCap}
            replies={236}
            description={coin.description}
            username={coin.owner.username}
            address={coin.address}
            degenId={coin.degenId}
          />
        ))
      )}
    </div>
  );
};

export default Coins;
