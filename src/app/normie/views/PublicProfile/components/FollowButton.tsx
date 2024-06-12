'use client';
import { followUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { useGetUserInfo } from '@/hooks';
import { useGetSingleUserInfo } from '@/hooks/useUser';
import { errorToast, successToast } from '@/utils/toast';

const FollowButton = ({ user }) => {
  const { userInfo, mutate } = useGetSingleUserInfo(user?.id);
  const { userInfo: currentUserInfo } = useGetUserInfo();

  const handleFollow = async () => {
    try {
      const res = await followUser(user.id);
      successToast(res.message);
      mutate();
    } catch (error) {
      console.log(error);

      errorToast('Error following/unfollowing user');
    }
  };

  const following = userInfo?.data.following.find(
    (follow) => follow.followedId === currentUserInfo?.data.id
  );
  console.log(following);

  return (
    <Button className='mb-3' onClick={handleFollow}>
      {following ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
