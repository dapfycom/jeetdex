'use client';
import Chats from '@/components/ChatsCard/Chats';
import { useGetBoundingPair } from '../../hooks';

const DegenChats = () => {
  const { coin } = useGetBoundingPair();
  if (!coin) return null;
  return (
    <div className='w-full rounded-sm bg-[#1C243E] border-none  p-4 mb-32'>
      <Chats poolPair={coin.firstTokenId} />
    </div>
  );
};

export default DegenChats;
