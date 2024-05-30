'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { ProfileCtx } from '../../ProfileContext';

const Following = () => {
  const profileInfo = useContext(ProfileCtx);

  if (profileInfo.following.length === 0) {
    return (
      <div className='flex justify-center my-5 text-muted-foreground'>
        Your not currently following any user
      </div>
    );
  }
  return (
    <div className='grid grid-cols-2 gap-4'>
      {profileInfo.following.map((follow) => {
        return (
          <div key={follow.id}>
            <div className='flex items-center space-x-4 mb-4'>
              <Avatar>
                <AvatarImage alt='Profile picture' src={follow.followed.img} />
              </Avatar>
              <div>
                <div className='text-lg font-bold'>
                  @{follow.followed.username}
                </div>
                {follow.followed.bio && (
                  <div className='text-sm'>{follow.followed.bio}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Following;
