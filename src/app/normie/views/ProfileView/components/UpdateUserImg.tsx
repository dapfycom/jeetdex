'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { UploadButton } from '@/utils/uploadthing';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from 'lucide-react';
import { useContext, useState } from 'react';
import { mutate } from 'swr';
import { ProfileCtx } from '../ProfileContext';
const UserAvatar = () => {
  const user = useContext(ProfileCtx);
  console.log(user);

  const [currentImgUrl, setCurrentImgUrl] = useState(user.img);
  const [isEditing, setIsEditing] = useState(false);
  console.log(currentImgUrl);

  return (
    <div className='flex items-center space-x-4 mb-4'>
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
  );
};

export default UserAvatar;
