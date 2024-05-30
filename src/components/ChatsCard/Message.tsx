import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';

interface IMessage {
  user: {
    username: string;
    id: string;
    img: string;
  };
  message: string;
  likes: number;
}
const Message = ({ likes, message, user }: IMessage) => {
  return (
    <div className='flex items-start gap-3'>
      <Avatar className='border w-6 h-6'>
        <AvatarImage alt={user.username} src={user.img} />
      </Avatar>
      <div className='grid gap-1'>
        <div className='flex items-center gap-2'>
          <div className='text-sm text-primary'>{user.username}</div>
          <Button
            className='h-4 hover:bg-transparent text-stone-400 hover:text-stone-900 text-sm'
            size='icon'
            variant='ghost'
          >
            <HeartIcon className='w-3 h-3 mr-1' />
            <span>{likes}</span>
            <span className='sr-only'>Like</span>
          </Button>
          <Button
            className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
            size='icon'
            variant='ghost'
          >
            <MessageCircleIcon className='w-4 h-4' />
            <span className='sr-only'>Reply</span>
          </Button>
        </div>
        <div className='prose prose-sm prose-stone'>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
