'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/utils/date';
import { useContext } from 'react';
import { ProfileCtx } from '../../ProfileContext';

interface INotificationData {
  img: string;
  username: string;
  createdAt: Date;
  description: string;
  type: 'LIKE' | 'FOLLOW';
}

const Notifications = () => {
  const profileInfo = useContext(ProfileCtx);

  const likes = profileInfo.messages.flatMap((m) =>
    m.likes.map((l) => ({ ...l, poolChat: m.chat.pool }))
  );

  const follows = profileInfo.followed;
  console.log(follows);

  let notifications: INotificationData[] = likes.map((l) => {
    const data: INotificationData = {
      description: `Liked your reply in ${l.poolChat} chat`,
      img: l.likedBy.img,
      username: l.likedBy.username,
      type: 'LIKE',
      createdAt: new Date(l.createdAt) // Store the original createdAt date
    };

    return data;
  });

  notifications = [
    ...notifications,
    ...follows.map((f) => {
      const data: INotificationData = {
        description: 'Start following you',
        type: 'FOLLOW',
        img: f.following.img,
        username: f.following.username,
        createdAt: new Date(f.createdAt) // Store the original createdAt date
      };

      return data;
    })
  ];

  notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return (
    <div className='space-y-4'>
      {notifications.map((notification, i) => (
        <NotificationItem key={i} {...notification} />
      ))}
    </div>
  );
};

export default Notifications;

interface NotificationItemProps {
  img: string;
  username: string;
  createdAt: Date;
  description: string;
  type: 'LIKE' | 'FOLLOW';
}
const NotificationItem = ({
  description,
  img,
  createdAt,
  type,
  username
}: NotificationItemProps) => {
  if (type === 'LIKE') {
    return (
      <div className='flex items-center gap-3'>
        <Avatar className='w-10 h-10'>
          <AvatarImage alt='Profile picture' src={img} />
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3 items-end'>
              <p className='font-medium'>@{username}</p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {timeAgo(new Date(createdAt))}
              </p>
            </div>
            <Badge>Liked</Badge>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <Avatar className='w-10 h-10'>
        <AvatarImage alt='Profile picture' src={img} />
      </Avatar>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-3 items-end'>
            <p className='font-medium'>@{username}</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {timeAgo(new Date(createdAt))}
            </p>
          </div>
          <Badge>Followed</Badge>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          {description}
        </p>
      </div>
    </div>
  );
};
