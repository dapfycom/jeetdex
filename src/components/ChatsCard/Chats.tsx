'use client';
import { useGetUserInfo } from '@/hooks';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import Divider from '../Divider/Divider';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import CoinIInfo from './CoinIInfo';
import Message from './Message';
import { useChat } from './hooks';

const SendMessagePopup = dynamic(() => import('./SendMessagePopup'));
interface IProps {
  poolPair: string;
  dev?: string;
  coin?: {
    name: string;
    ticker: string;
    img: string;
    date: string;
    description: string;
    owner?: {
      username: string;
      address: string;
      img: string;
    };
  };
}

const Chats = ({ poolPair, dev, coin }: IProps) => {
  const {
    chat,
    isLoading,
    handleLike,
    onToggle,
    isOpen,
    onClose,
    highlight,
    onHoverChatReply
  } = useChat(poolPair);

  const { userInfo } = useGetUserInfo();

  return (
    <div className={cn('relative w-full')}>
      <div className=' flex flex-col  w-full  p-0  text-left '>
        {chat && (
          <a
            className='text-sm text-gray-300 cursor-pointer mb-1'
            href={`#message-${chat.messages[chat.messages.length - 1].id}`}
            id='scroll-to-bottom'
          >
            [scroll to bottom]
          </a>
        )}

        <div className='mb-1'>
          {coin?.owner?.address && (
            <CoinIInfo
              coinDate={coin.date}
              coinDescription={coin.description}
              coinTitle={coin.name}
              userImage={coin.owner.img}
              userName={coin.owner.username}
              userAddress={coin.owner?.address}
              coinImg={coin.img}
            />
          )}
        </div>
        {!poolPair ? (
          <div className='py-8 text-center'>
            We couldn&apos;t find a chat for this pool
          </div>
        ) : (
          <div className='flex-1 w-full flex flex-col gap-1'>
            {isLoading ? (
              <>
                <div className='flex w-full gap-3'>
                  <Skeleton className='w-6 h-6 rounded-full' />
                  <div className='flex flex-col gap-3 w-full pr-10'>
                    <Skeleton className='w-1/3 h-4' />

                    <Skeleton className='w-full h-6' />
                  </div>
                </div>
                <Divider />
                <div className='flex w-full gap-3'>
                  <Skeleton className='w-6 h-6 rounded-full' />
                  <div className='flex flex-col gap-3 w-full pr-10'>
                    <Skeleton className='w-1/3 h-4' />

                    <Skeleton className='w-full h-6' />
                  </div>
                </div>
                <Divider />
                <div className='flex w-full gap-3'>
                  <Skeleton className='w-6 h-6 rounded-full' />
                  <div className='flex flex-col gap-3 w-full pr-10'>
                    <Skeleton className='w-1/3 h-4' />

                    <Skeleton className='w-full h-6' />
                  </div>
                </div>
                <Divider />
                <div className='flex w-full gap-3'>
                  <Skeleton className='w-6 h-6 rounded-full' />
                  <div className='flex flex-col gap-3 w-full pr-10'>
                    <Skeleton className='w-1/3 h-4' />

                    <Skeleton className='w-full h-6' />
                  </div>
                </div>
              </>
            ) : (
              <>
                {!chat?.messages?.length ? (
                  <p className='text-center'>
                    Send the first message for {poolPair}
                  </p>
                ) : (
                  <>
                    {chat.messages
                      .sort((a, b) => a.id - b.id)
                      .map((message) => {
                        const isLiked = message.likes
                          .map((l) => l.likedById)
                          .includes(userInfo?.data?.id);

                        return (
                          <Fragment key={message.id}>
                            <Message
                              likes={message.likes.length}
                              message={message.content}
                              image={message.image}
                              user={{
                                id: message.sender.id,
                                img: message.sender.img,
                                username: message.sender.username,
                                address: message.sender.address
                              }}
                              messageId={message.id}
                              poolPair={poolPair}
                              messageReplyingId={
                                message?.messageReplying?.messageRepleidId
                              }
                              highlight={highlight === message.id}
                              onHoverChatReply={onHoverChatReply}
                              time={message.createdAt}
                              onLike={() => handleLike(message, isLiked)}
                              isLiked={isLiked}
                              isDev={dev === message.sender.address}
                            />
                          </Fragment>
                        );
                      })}

                    <a
                      className='text-sm text-gray-300 cursor-pointer'
                      href={`#scroll-to-bottom`}
                    >
                      [scroll to top]
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {poolPair && (
        <Button
          className='absolute  top-[-10px] sm:top-[-40px] sm:right-[10px] right-3 w-8 h-8'
          size='icon'
          type='button'
          onClick={onToggle}
        >
          <PlusIcon className='w-4 h-4' />
          <span className='sr-only'>Open Message Input</span>
        </Button>
      )}

      {isOpen && (
        <SendMessagePopup
          pool={poolPair}
          isOpen={isOpen}
          onClose={onClose}
          onToggle={onToggle}
        />
      )}
    </div>
  );
};

export default Chats;
