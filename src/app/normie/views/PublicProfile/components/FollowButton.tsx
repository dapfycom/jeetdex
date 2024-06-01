'use client';
import { followUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/utils/toast';

const FollowButton = ({ user }) => {
  const handleFollow = async () => {
    try {
      await followUser(user.id);
      successToast('User followed');
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <Button className='mb-3' onClick={handleFollow}>
      Follow
    </Button>
  );
};

export default FollowButton;
