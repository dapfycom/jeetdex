import { likeMessage } from '@/actions/messages';
import { useGetUserInfo } from '@/hooks';
import useDisclosure from '@/hooks/useDisclosure';
import { fetchAxiosJeetdex } from '@/services/rest/api';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useSWR from 'swr';
import { toast } from '../ui/use-toast';

export const useGetChat = (pool: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    pool ? ['/chats/', pool] : null,
    async () => {
      return fetchAxiosJeetdex<{
        data: {
          messages: ({
            likes: {
              likedById: string;
            }[];
            sender: {
              id: string;
              username: string;
              address: string;
              img: string;
              bio: string;
              createdAt: Date;
              updatedAt: Date;
            };
            messageReplied: [];
            messageReplying: {
              id: number;
              createdAt: Date;
              messageRepleidId: number;
              messageReplyingId: number;
            };
          } & {
            id: number;
            content: string;
            image?: string;
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

  return {
    chat: data?.data,
    error,
    isLoading,
    mutate
  };
};

export const useChat = (poolPair: string) => {
  const { chat, isLoading, mutate } = useGetChat(poolPair);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [highlight, setHighlight] = useState<number>();
  const { userInfo } = useGetUserInfo();

  const onHoverChatReply = (replyedId: number) => {
    setHighlight(replyedId);
  };

  const handleLike = async (message: any, liked?: boolean) => {
    if (poolPair || !userInfo?.data?.id) {
      const data = {
        data: {
          ...chat,
          messages: chat.messages
            .sort((a, b) => a.id - b.id)
            .map((m) => {
              if (message.id === m.id) {
                return {
                  ...m,
                  likes: liked
                    ? [
                        ...m.likes.filter(
                          (l) => l.likedById !== userInfo.data.id
                        )
                      ]
                    : [...m.likes, { likedById: userInfo.data.id }]
                };
              }
              return m;
            })
        }
      };
      try {
        await mutate(
          async () => {
            likeMessage(message.id, message.sender.id);
            return data;
          },
          {
            optimisticData: data,
            rollbackOnError: true,
            populateCache: true,
            revalidate: false
          }
        );
      } catch (error) {
        toast({
          description: (
            <div>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className='mr-2 text-red-500'
              />
              {error.message}
            </div>
          )
        });
      }
    } else {
      toast({
        description: (
          <div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className='mr-2 text-red-500'
            />
            You can&apos;t like this message
          </div>
        )
      });
    }
  };

  return {
    chat,
    isLoading,
    mutate,
    isOpen,
    onToggle,
    onClose,
    highlight,
    onHoverChatReply,
    handleLike
  };
};
