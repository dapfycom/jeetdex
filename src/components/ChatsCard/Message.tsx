'use client';
import { likeMessage } from '@/actions/messages';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { mutate } from 'swr';
import { DialogTrigger } from '../ui/dialog';
import { toast } from '../ui/use-toast';
import SendMessagePopup from './SendMessagePopup';

interface IMessage {
  user: {
    username: string;
    id: string;
    img: string;
  };
  message: string;
  messageId: number;
  likes: number;
  poolPair?: string;
  messageReplyingId?: number;
  highlight?: boolean;
  onHoverChatReply?: (messageId: number) => void;
  time: Date;
}
const Message = ({
  likes,
  message,
  messageId,
  messageReplyingId,
  poolPair,
  user,
  highlight,
  time,
  onHoverChatReply
}: IMessage) => {
  const handleLike = async () => {
    if (poolPair) {
      try {
        await likeMessage(messageId, user.id);
        mutate(['/chats/', poolPair]);
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
          <Link href={`/profile/${user.id}`}>
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
            className='h-4 hover:bg-transparent text-stone-400 hover:text-stone-900 text-xs'
            size='icon'
            variant='ghost'
            onClick={handleLike}
          >
            <HeartIcon className='w-3 h-3 mr-1' />
            <span>{likes}</span>
            <span className='sr-only'>Like</span>
          </Button>
          {poolPair ? (
            <SendMessagePopup pool={poolPair} repliedMessage={messageId}>
              <DialogTrigger asChild>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
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
