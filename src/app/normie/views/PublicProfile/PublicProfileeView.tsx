import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { network } from '@/config';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import ProfileContext from './ProfileContext';
import FollowButton from './components/FollowButton';
import ProfileTabs from './components/Tabs';

const PublicProfileView = async ({ user }: { user: any }) => {
  if (!user) {
    return null;
  }

  return (
    <ProfileContext ctxValue={user}>
      <div
        key='1'
        className='flex flex-col h-fit items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-2xl m-auto'
      >
        <div className='flex items-center space-x-4 mb-4'>
          <Avatar>
            <AvatarImage alt='Profile picture' src={user.img} />
          </Avatar>

          <div>
            <div className='text-lg font-bold'>@{user.username}</div>
            <div className='text-sm'>{user.followed.length} followers</div>
            {user.bio && <div className='text-sm'>{user.bio}</div>}
          </div>
        </div>

        <div className='flex items-center space-x-2 mb-4'>
          <div className='flex items-center '>
            <FontAwesomeIcon
              icon={faHeart}
              className='text-red-500  w-5 h-5 mr-1'
            />
            <span> Likes received: {user._count.likesReceived}</span>
          </div>
        </div>

        <FollowButton user={user} />
        <div className='bg-[#0b102280] text-sm p-3 rounded mb-4'>
          {user.address}
        </div>
        <Link
          className='block mb-4 text-blue-500 underline'
          href={`${network.explorerAddress}/accounts/${user.address}`}
          target='_blank'
        >
          View on Explorer
        </Link>

        <div className='flex space-x-4 border-b '>{<ProfileTabs />}</div>
      </div>
    </ProfileContext>
  );
};

export default PublicProfileView;
