'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useContext } from 'react';
import { ProfileCtx } from '../../ProfileContext';

const Followers = () => {
  const profileInfo = useContext(ProfileCtx);

  if (profileInfo.followed.length === 0) {
    return (
      <div className='flex justify-center my-5 text-muted-foreground'>
        You have no followers yet.
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
                <AvatarImage alt='Profile picture' src={follow.following.img} />
              </Avatar>
              <div>
                <Link href={`/profile/${follow.following.id}`}>
                  <div className='text-lg font-bold'>
                    @{follow.following.username}
                  </div>
                </Link>
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
