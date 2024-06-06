'use client';
import { likeMessage } from '@/actions/messages';
import { cn } from '@/lib/utils';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlusIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import Divider from '../Divider/Divider';
import { Button } from '../ui/button';
import { DialogTrigger } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';
import { toast } from '../ui/use-toast';
import Message from './Message';
import SendMessagePopup from './SendMessagePopup';
import { useGetChat } from './hooks';
interface IProps {
  poolPair?: string;
}

const Chats = ({ poolPair }: IProps) => {
  const { chat, isLoading, mutate } = useGetChat(poolPair);

  const [highlight, setHighlight] = useState<number>();

  const onHoverChatReply = (replyedId: number) => {
    setHighlight(replyedId);
  };

  const handleLike = async (message: any) => {
    if (poolPair) {
      const data = {
        data: {
          ...chat,
          messages: chat.messages.map((m) => {
            if (message.id === m.id) {
              return {
                ...m,
                _count: {
                  likes: m._count.likes + 1
                }
              };
            }
            return m;
          })
        }
      };
      try {
        await mutate(
          async () => {
            await likeMessage(message.id, message.sender.id);

            return data;
          },
          {
            optimisticData: data,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false
          }
        );

        toast({
          description: (
            <div>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className='mr-2 text-green-500'
              />
              Message liked!
            </div>
          )
        });
      } catch (error) {
        console.log(error.message);
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
                    return (
                      <Fragment key={message.id}>
                        <Message
                          likes={message._count.likes}
                          message={message.content}
                          user={{
                            id: message.sender.id,
                            img: message.sender.img,
                            username: message.sender.username
                          }}
                          messageId={message.id}
                          poolPair={poolPair}
                          messageReplyingId={
                            message?.messageReplying?.messageRepleidId
                          }
                          highlight={highlight === message.id}
                          onHoverChatReply={onHoverChatReply}
                          time={message.createdAt}
                          onLike={() => handleLike(message)}
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
        <SendMessagePopup pool={poolPair}>
          <DialogTrigger asChild>
            <Button
              className='absolute top-3 right-3 w-8 h-8'
              size='icon'
              type='button'
            >
              <PlusIcon className='w-4 h-4' />
              <span className='sr-only'>Open Message Input</span>
            </Button>
          </DialogTrigger>
        </SendMessagePopup>
      )}
    </div>
  );
};

export default Chats;
