import { fetchAxiosJeetdex } from '@/services/rest/api';
import useSWR from 'swr';

export const useGetChat = (pool: string) => {
  const { data, error, isLoading } = useSWR(
    pool ? ['/chats/', pool] : null,
    async () => {
      return fetchAxiosJeetdex<{
        data: {
          messages: ({
            _count: {
              likes: number;
            };
            sender: {
              id: string;
              username: string;
              address: string;
              img: string;
              bio: string;
              createdAt: Date;
              updatedAt: Date;
            };
            messageReplying: {
              id: number;
              createdAt: Date;
              messageRepleidId: number;
              messageReplyingId: number;
            };
          } & {
            id: number;
            content: string;
            type: string;
            createdAt: Date;
            chatId: string;
            senderId: string;
          })[];
        } & {
          id: string;
          pool: string;
          createdAt: Date;
        };
      }>('/chats/' + pool);
    }
  );
  console.log(data);

  return {
    chat: data?.data,
    error,
    isLoading
  };
};
