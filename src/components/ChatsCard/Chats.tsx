'use client';
import { likeMessage } from '@/actions/messages';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlusIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Fragment, useState } from 'react';
import Divider from '../Divider/Divider';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { toast } from '../ui/use-toast';
import Message from './Message';
import { useGetChat } from './hooks';

const SendMessagePopup = dynamic(() => import('./SendMessagePopup'));
interface IProps {
  poolPair?: string;
}

const Chats = ({ poolPair }: IProps) => {
  const { chat, isLoading, mutate } = useGetChat(poolPair);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [highlight, setHighlight] = useState<number>();

  const onHoverChatReply = (replyedId: number) => {
    setHighlight(replyedId);
  };

  const handleLike = async (message: any, liked?: boolean) => {
    if (poolPair) {
      const data = {
        data: {
          ...chat,
          messages: chat.messages.map((m) => {
            if (message.id === m.id) {
              return {
                ...m,
                likes: liked
                  ? [...m.likes.filter((l) => l.likedById !== m.senderId)]
                  : [...m.likes, { likedById: m.senderId }]
              };
            }
            return m;
          })
        }
      };
      try {
        await mutate(
          async () => {
            const res = await likeMessage(message.id, message.sender.id);

            toast({
              description: (
                <div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className='mr-2 text-green-500'
                  />
                  {res}
                </div>
              )
            });

            return data;
          },
          {
            optimisticData: data,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false
          }
        );
      } catch (error) {
        toast({
          description: (
            <div>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className='mr-2 text-red-500'
              />
              {error.message}
            </div>
          )
        });
      }
    } else {
      toast({
        description: (
          <div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className='mr-2 text-red-500'
            />
            You can&apos;t like this message
          </div>
        )
      });
    }
  };
  return (
    <div className={cn('relative w-full')}>
      <div className=' flex flex-col  w-full  p-0  text-left '>
        {!poolPair ? (
          <div className='py-8 text-center'>
            We couldn&apos;t find a chat for this pool
          </div>
        ) : (
          <div className='flex-1 w-full flex flex-col gap-2 py-8'>
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
                  chat.messages.map((message) => {
                    const isLiked = message.likes
                      .map((l) => l.likedById)
                      .includes(message.senderId);
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
                        />

                        <Divider />
                      </Fragment>
                    );
                  })
                )}
              </>
            )}
          </div>
        )}
      </div>

      {poolPair && (
        <Button
          className='absolute top-[-10px] right-3 w-8 h-8'
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
