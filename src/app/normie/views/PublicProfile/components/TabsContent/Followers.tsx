'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { ProfileCtx } from '../../ProfileContext';

const Followers = () => {
  const profileInfo = useContext(ProfileCtx);
  console.log(profileInfo);

  if (profileInfo.followed.length === 0) {
    return (
      <div className='flex justify-center my-5 text-muted-foreground'>
        This user doesn&lsquo;t have any followers yet.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      {profileInfo.followed.map((follow) => {
        return (
          <div key={follow.id}>
            <div className='flex items-center space-x-4 mb-4'>
              <Avatar>
                <AvatarImage
                  alt='Profile picture'
                  src={'/assets/img/logo-jeeter.png'}
                />
              </Avatar>
              <div>
                <div className='text-lg font-bold'>
                  @{follow.following.username}
                </div>
                {follow.following.bio && (
                  <div className='text-sm'>{follow.following.bio}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Followers;