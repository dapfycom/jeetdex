'use client';
import { ProfileCtx } from '@/app/normie/views/ProfileView/ProfileContext';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useContext } from 'react';

const Following = () => {
  const profileInfo = useContext(ProfileCtx);

  if (profileInfo.following.length === 0) {
    return (
      <div className='flex justify-center my-5 text-muted-foreground'>
        Your are not following anyone yet.
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
                <Link href={`/profile/${follow.followed.address}`}>
                  <div className='text-lg font-bold'>
                    @{follow.followed.username}
                  </div>
                </Link>
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
