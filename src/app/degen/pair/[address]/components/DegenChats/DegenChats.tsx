'use client';
import Chats from '@/components/ChatsCard/Chats';
import useGetCoinOwner from '@/hooks/useGetCoinOwner';
import { formatTokenI } from '@/utils/mx-utils';
import { useGetBoundingPair } from '../../hooks';

const DegenChats = () => {
  const { coin } = useGetBoundingPair();
  const { owner } = useGetCoinOwner(coin?.firstTokenId);
  console.log(coin?.firstTokenId);

  console.log(owner);

  if (!coin) return null;
  return (
    <div className='w-full rounded-sm  border-none  p-[3px] mb-32'>
      <Chats
        poolPair={coin.firstTokenId}
        dev={coin?.owner.address}
        coin={{
          date: coin.createdAt,
          img: coin.img,
          name: coin.title,
          ticker: formatTokenI(coin.firstTokenId),
          description: coin.description,
          owner: {
            img: owner ? owner?.img : '/assets/img/logo-jeeter.png',
            username: owner?.username,
            address: owner?.address
          }
        }}
      />
    </div>
  );
};

export default DegenChats;
