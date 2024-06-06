'use client';
import Message from '@/components/ChatsCard/Message';
import { useContext } from 'react';
import { ProfileCtx } from '../../ProfileContext';

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
          />
        );
      })}
    </div>
  );
};

export default Replies;
