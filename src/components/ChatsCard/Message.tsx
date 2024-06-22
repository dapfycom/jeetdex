'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DialogTrigger } from '../ui/dialog';
import SendMessagePopup from './SendMessagePopup';

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
  onHoverChatReply,
  onLike
}: IMessage) => {
  const date = new Date(time);
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl p-2',
        highlight && 'bg-blue-900/50 '
      )}
      id={`message-${messageId}`}
    >
      <div className='grid gap-1'>
        <div className='flex items-center gap-2'>
          <Link href={`/profile/${user.address}`}>
            <Avatar className='border w-5 h-5'>
              <AvatarImage alt={user.username} src={user.img} />
            </Avatar>
          </Link>
          <Link href={`/profile/${user.id}`}>
            <div className='rounded-sm text-xs bg-lime-400/70 text-black px-1 h-[16px] flex items-center'>
              {user.username}
            </div>
          </Link>
          <div className='text-xs text-muted-foreground'>
            {date.toLocaleString()}
          </div>
          <Button
            className={cn(
              'h-4 hover:bg-transparent text-stone-400 hover:text-red-600  text-xs',
              isLiked && 'text-red-500'
            )}
            size='icon'
            variant='ghost'
            onClick={onLike}
          >
            <HeartIcon className='w-3 h-3 mr-1' />
            <span>{likes}</span>
            <span className='sr-only'>Like</span>
          </Button>
          {poolPair ? (
            <SendMessagePopup pool={poolPair} repliedMessage={messageId}>
              <DialogTrigger asChild>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 '
                  size='icon'
                  variant='ghost'
                >
                  #{messageId}
                  <MessageCircleIcon className='w-4 h-4' />
                  <span className='sr-only'>Reply</span>
                </Button>
              </DialogTrigger>
            </SendMessagePopup>
          ) : (
            <div className='flex text-xs text-muted-foreground items-center gap-1'>
              {' '}
              #{messageId}
              <MessageCircleIcon className='w-4 h-4' />
            </div>
          )}
        </div>
        <div className='flex gap-2 text-gray-300'>
          {image && <Image src={image} alt='image' width={100} height={100} />}
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
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
