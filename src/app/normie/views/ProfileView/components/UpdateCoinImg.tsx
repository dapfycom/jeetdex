'use client';
import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { toast } from '@/components/ui/use-toast';
import { IElrondToken } from '@/types/scTypes';
import { UploadButton } from '@/utils/uploadthing';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from 'lucide-react';
import { useState } from 'react';

const UpdateCoinImg = ({ token }: { token: IElrondToken }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <UploadButton
      className='bg-transparent w-fit ut-button:bg-transparent ut-label:w-fit'
      endpoint='coinImage'
      appearance={{
        button: 'bg-transparent w-fit'
      }}
      onClientUploadComplete={() => {
        setIsEditing(false);
        // Do something with the response

        toast({
          description: (
            <div>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className='mr-2 text-green-500'
              />
              User image updated! Refresh the page to see the changes.
            </div>
          )
        });
      }}
      onUploadBegin={() => {
        setIsEditing(true);
      }}
      onUploadError={(error: Error) => {
        setIsEditing(false);

        toast({
          description: (
            <div>
              <FontAwesomeIcon icon={faWarning} className='mr-2 text-red-500' />
              ERROR! {error.message}
            </div>
          )
        });
      }}
      content={{
        button: (
          <div className='relative'>
            <TokenImageSRC
              size={35}
              alt={token.name}
              identifier={token.identifier}
              src={token?.assets?.svgUrl}
              className='w-[35px] h-[35px] rounded-full'
            />
            {isEditing && (
              <div className='absolute top-0 right-0 w-full h-full flex items-center justify-center'>
                <Loader className='w-5 h-5 text-primary animate-spin' />
              </div>
            )}
          </div>
        ),
        allowedContent: <div></div>
      }}
      onBeforeUploadBegin={(files) => {
        return files.map(
          (f) =>
            new File([f], token.identifier + '.' + f.name.split('.').pop(), {
              type: f.type
            })
        );
      }}
    />
  );
};

export default UpdateCoinImg;
