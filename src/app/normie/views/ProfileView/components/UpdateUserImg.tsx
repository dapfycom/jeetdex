'use client';
import Address from '@/components/Address';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { network } from '@/config';
import { cn } from '@/lib/utils';
import { UploadButton } from '@/utils/uploadthing';
import {
  faCheckCircle,
  faHeart,
  faWarning
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { mutate } from 'swr';
import { ProfileCtx } from '../ProfileContext';
const EditProfile = dynamic(() => import('../components/EditProfile'), {
  ssr: false
});
const UserAvatar = () => {
  const user = useContext(ProfileCtx);

  const [currentImgUrl, setCurrentImgUrl] = useState(user.img);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='flex items-start space-x-4 mb-1'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-start  gap-4'>
          <UploadButton
            className='bg-transparent w-fit ut-button:bg-transparent ut-label:w-fit'
            endpoint='userAvatar'
            appearance={{
              button: 'bg-transparent w-fit'
            }}
            onClientUploadComplete={(res) => {
              setIsEditing(false);
              // Do something with the response
              console.log('Files: ', res);
              setCurrentImgUrl(res[0].url);

              toast({
                description: (
                  <div>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className='mr-2 text-green-500'
                    />
                    User image updated!
                  </div>
                )
              });

              mutate('/user');
            }}
            onUploadBegin={() => {
              setIsEditing(true);
            }}
            onUploadError={(error: Error) => {
              setIsEditing(false);
              // Do something with the error.
              alert(`ERROR! ${error.message}`);

              toast({
                description: (
                  <div>
                    <FontAwesomeIcon
                      icon={faWarning}
                      className='mr-2 text-red-500'
                    />
                    ERROR! {error.message}
                  </div>
                )
              });
            }}
            content={{
              button: (
                <div className='relative'>
                  <Avatar className={cn('', isEditing && 'opacity-10')}>
                    <AvatarImage alt='Profile picture' src={currentImgUrl} />
                  </Avatar>
                  {isEditing && (
                    <div className='absolute top-0 right-0 w-full h-full flex items-center justify-center'>
                      <Loader className='w-5 h-5 text-primary animate-spin' />
                    </div>
                  )}
                </div>
              ),
              allowedContent: <div></div>
            }}
          />
          <div>
            <div className='text-lg font-bold'>@{user.username}</div>
            <div className='text-sm'>{user.followed.length} followers</div>
            {user.bio && <div className='text-sm'>{user.bio}</div>}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 items-center space-x-2 '>
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faHeart} className='text-red-500  w-5 h-5' />
            <span className='ml-1'>
              Likes received: {user._count.likesReceived}
            </span>
          </div>
        </div>
      </div>

      <div className='flex  flex-col items-center'>
        <Link
          className='block mb-1 text-blue-500 underline'
          href={`${network.explorerAddress}/accounts/${user.address}`}
          target='_blank'
        >
          View on Explorer
        </Link>
        <EditProfile />
        <Address address={user.address} />
      </div>
    </div>
  );
};

export default UserAvatar;
