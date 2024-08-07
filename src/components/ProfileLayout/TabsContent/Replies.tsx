'use client';
import { ProfileCtx } from '@/app/normie/views/ProfileView/ProfileContext';
import Message from '@/components/ChatsCard/Message';
import { useContext } from 'react';

const Replies = () => {
  const profileInfo = useContext(ProfileCtx);

  return (
    <div>
      {profileInfo.messages.map((message) => {
        return (
          <Message
            key={message.id}
            likes={message.likes.length}
            message={message.content}
            messageId={message.id}
            time={message.createdAt}
            onLike={() => {}}
            user={{
              ...profileInfo
            }}
            isLiked={false}
          />
        );
      })}
    </div>
  );
};

export default Replies;
