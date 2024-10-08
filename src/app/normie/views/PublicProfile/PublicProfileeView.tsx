'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { network } from '@/config';
import { useGetSingleUserInfo } from '@/hooks/useUser';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Address from '../../../../components/Address';
import ProfileContext from './ProfileContext';
import FollowButton from './components/FollowButton';
import ProfileTabs from './components/Tabs';

const PublicProfileView = ({ userAddress }: { userAddress: string }) => {
  const { userInfo } = useGetSingleUserInfo(userAddress);

  if (!userInfo) {
    return null;
  }
  const user = userInfo?.data;

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-3xl font-bold mb-3'>
          This account does not exist on jeetdex.
        </h1>

        <div className='flex gap-2'>
          <Link href='/' className='text-blue-500 underline'>
            Go back to home
          </Link>
          or{' '}
          <a
            href={`${network.explorerAddress}/accounts/${userAddress}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline'
          >
            Check explorer
          </a>
        </div>
      </div>
    );
  }

  return (
    <ProfileContext ctxValue={user}>
      <div
        key='1'
        className='flex flex-col h-fit items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-2xl m-auto mx-4 my-10'
      >
        <div className='flex items-center space-x-4 mb-4'>
          <Avatar>
            <AvatarImage alt='Profile picture' src={user.img} />
          </Avatar>

          <div>
            <div className='text-lg font-bold'>@{user.username}</div>
            <div className='text-sm'>
              {userInfo?.data.followed.length} followers
            </div>
            {user.bio && <div className='text-sm'>{user.bio}</div>}
          </div>
        </div>

        <div className='flex items-center space-x-2 mb-4'>
          <div className='flex items-center '>
            <FontAwesomeIcon
              icon={faHeart}
              className='text-red-500  w-5 h-5 mr-1'
            />
            <span> Likes received: {userInfo?.data._count.likesReceived}</span>
          </div>
        </div>

        <FollowButton user={user} />
        <Address address={user.address} />
        <Link
          className='block mb-4 text-blue-500 underline'
          href={`${network.explorerAddress}/accounts/${user.address}`}
          target='_blank'
        >
          View on Explorer
        </Link>

        <div className='flex space-x-4 border-b overflow-auto w-full'>
          {<ProfileTabs />}
        </div>
      </div>
    </ProfileContext>
  );
};

export default PublicProfileView;
