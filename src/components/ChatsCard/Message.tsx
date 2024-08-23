'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { textToLightColor } from '@/utils/general';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { format, isToday } from 'date-fns';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SendMessagePopup = dynamic(() => import('./SendMessagePopup'));

interface IMessage {
  user: {
    username: string;
    id: string;
    img: string;
    address: string;
  };
  message: string;
  image?: string;
  messageId: number;
  likes: number;
  poolPair?: string;
  messageReplyingId?: number;
  highlight?: boolean;
  onHoverChatReply?: (messageId: number) => void;
  time: Date;
  onLike: () => void;
  isLiked: boolean;
  isDev?: boolean;
}
const Message = ({
  likes,
  message,
  image,
  messageId,
  messageReplyingId,
  poolPair,
  user,
  highlight,
  time,
  isLiked,
  isDev,
  onHoverChatReply,
  onLike
}: IMessage) => {
  const date = new Date(time);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { isOpen: isOpenImage, onToggle: onToggleImage } = useDisclosure();

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-2 w-full bg-[#2e303a]',
        highlight && 'bg-blue-900/50 '
      )}
      id={`message-${messageId}`}
    >
      <div className='grid gap-1  w-full'>
        <div className='flex items-center gap-1 flex-wrap'>
          <Link href={`/profile/${user.address}`}>
            <Avatar className='border w-5 h-5'>
              <AvatarImage alt={user.username} src={user.img} />
            </Avatar>
          </Link>
          <Link href={`/profile/${user.address}`}>
            <div
              className='rounded-sm text-xs bg-lime-400/70 text-black px-1 h-[16px] flex items-center'
              style={{
                background: textToLightColor(user.username)
              }}
            >
              {user.username} {isDev ? '(dev)' : ''}
            </div>
          </Link>
          <div className='text-xs text-muted-foreground'>
            {isToday(new Date(date))
              ? format(new Date(date), 'pp')
              : format(new Date(date), 'P')}
          </div>

          <Button
            className={cn(
              'h-4 hover:bg-transparent text-stone-400 hover:text-red-600  text-xs p-0 w-fit mr-2 ml-1',
              isLiked && 'text-red-500'
            )}
            size='icon'
            variant='ghost'
            onClick={onLike}
          >
            {isLiked ? (
              <HeartFilledIcon className='w-3 h-3' />
            ) : (
              <HeartIcon className='w-3 h-3' />
            )}

            <span className='ml-1'>{likes}</span>
            <span className='sr-only'>Like</span>
          </Button>

          {isOpen && (
            <SendMessagePopup
              pool={poolPair}
              repliedMessage={messageId}
              isOpen={isOpen}
              onClose={onClose}
              onToggle={onToggle}
            />
          )}
          {poolPair ? (
            <Button
              className='h-4 w-fit hover:bg-transparent text-stone-400 text-xs space-x-1 px-0'
              variant='ghost'
              onClick={onToggle}
            >
              <span>#{messageId}</span>
              <span>[reply]</span>
            </Button>
          ) : (
            <div className='flex text-xs text-muted-foreground items-center gap-1'>
              {' '}
              #{messageId}
              <MessageCircleIcon className='w-4 h-4' />
            </div>
          )}
        </div>
        <div
          className={`flex gap-2 text-gray-300 w-full ${
            isOpenImage ? 'flex-col' : ''
          }`}
        >
          {image && (
            <Image
              src={image}
              alt='image'
              width={100}
              height={100}
              className={`cursor-pointer ${
                isOpenImage ? 'w-full max-w-[500px] mx-auto' : ''
              }`}
              quality={100}
              onClick={onToggleImage}
            />
          )}
          {messageReplyingId && (
            <Link
              href={`#message-${messageReplyingId}`}
              onMouseEnter={() =>
                onHoverChatReply && onHoverChatReply(messageReplyingId)
              }
              onMouseLeave={() => onHoverChatReply && onHoverChatReply(0)}
            >
              <p className='text-primary font-bold text-lg'>
                {' '}
                #{messageReplyingId}
              </p>
            </Link>
          )}
          <p>
            {message.split(' ').map((word, index) => {
              if (word.startsWith('https://')) {
                return (
                  <React.Fragment key={index}>
                    <a
                      href={word}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline'
                    >
                      {word}
                    </a>{' '}
                  </React.Fragment>
                );
              }
              return word + ' ';
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
