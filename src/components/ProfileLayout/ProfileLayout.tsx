'use client';
import EditProfile from '@/app/normie/views/ProfileView/components/EditProfile';
import UserAvatar from '@/app/normie/views/ProfileView/components/UpdateUserImg';
import ProfileContext from '@/app/normie/views/ProfileView/ProfileContext';
import Address from '@/components/Address';
import GoBackButton from '@/components/GoBackButton';
import { network } from '@/config';
import { useGetUserInfo } from '@/hooks';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, isLoading } = useGetUserInfo();

  if (isLoading || !userInfo?.data) {
    return (
      <div className='bg-[#1C243E]  max-w-2xl w-full m-auto h-[300px] flex justify-center items-center rounded-sm'>
        <Loader2 className='animate-spin w-14 h-14' />
      </div>
    );
  }
  const user = userInfo.data;

  return (
    <div className='w-full flex  flex-col items-center mt-5 gap-10'>
      <GoBackButton>[back]</GoBackButton>
      <ProfileContext ctxValue={userInfo.data}>
        <div
          key='1'
          className='flex flex-col h-fit items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-2xl w-full mx-auto'
        >
          <UserAvatar />
          <EditProfile />

          <div className='flex flex-col sm:flex-row gap-2 items-center space-x-2 mb-4'>
            <div className='flex items-center'>
              <FontAwesomeIcon
                icon={faHeart}
                className='text-red-500  w-5 h-5'
              />
              <span className='ml-1'>
                Likes received: {user?._count.likesReceived || 0}
              </span>
            </div>
          </div>
          <Address address={user?.address} />

          <Link
            className='block mb-4 text-blue-500 underline'
            href={`${network.explorerAddress}/accounts/${user?.address}`}
            target='_blank'
          >
            View on Explorer
          </Link>

          <div className='flex space-x-4 border-b overflow-auto w-full'>
            {children}
          </div>
        </div>
      </ProfileContext>
    </div>
  );
};

export default ProfileLayout;
