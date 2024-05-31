'use client';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import Divider from '../Divider/Divider';
import { Button } from '../ui/button';
import { DialogTrigger } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';
import Message from './Message';
import SendMessagePopup from './SendMessagePopup';
import { useGetChat } from './hooks';

interface IProps {
  show?: boolean;
  poolPair?: string;
}

const Chats = ({ poolPair, show = true }: IProps) => {
  console.log(poolPair);

  const { chat, isLoading } = useGetChat(poolPair);
  console.log(chat);

  const [highlight, setHighlight] = useState<number>();

  const onHoverChatReply = (replyedId: number) => {
    console.log(replyedId);

    setHighlight(replyedId);
  };
  return (
    <div className={cn('relative w-full', !show && 'hidden')}>
      <div className=' flex flex-col  w-full lg:p-3 p-0  pt-6 text-left rounded-3xl bg-[#1C243E] border-none shadow-[0px_8px_24px_rgba(79,_83,_243,_0.12)]'>
        {!poolPair ? (
          <div className='py-8 text-center'>
            We couldn&apos;t find a chat for this pool
          </div>
        ) : (
          <div className='flex-1 w-full flex flex-col gap-2 px-4 py-8'>
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
