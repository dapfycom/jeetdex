'use client';

import { PropsWithChildren, createContext } from 'react';
type user = {
  id: string;
  username: string;
  address: string;
  img: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ContextType = {
  followed: ({
    id: string;
    followedId: string;
    followingId: string;
    createdAt: Date;
  } & { following: user })[];
  following: ({
    id: string;
    followedId: string;
    followingId: string;
    createdAt: Date;
  } & { followed: user })[];
  _count: {
    likesReceived: number;
  };
  messages: {
    id: number;
    content: string;
    type: string;
    createdAt: Date;
    chatId: string;
    senderId: string;
    chat: {
      id: string;
      pool: string;
    };
    likes: {
      id: string;
      likedById: string;
      userId: string;
      createdAt: Date;
      messageId: number;
      likedBy: user;
    }[];
  }[];
} & user;

export const ProfileCtx = createContext<ContextType>(null);

const ProfileContext = ({
  children,
  ctxValue
}: PropsWithChildren<{
  ctxValue: any;
}>) => {
  return <ProfileCtx.Provider value={ctxValue}>{children}</ProfileCtx.Provider>;
};

export default ProfileContext;
