'use server';
import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export const sendPoolMessage = async (message: string, pool: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  try {
    const data = await prisma.messages.create({
      data: {
        content: message,
        chat: {
          connectOrCreate: {
            create: {
              pool: pool
            },
            where: {
              pool: pool
            }
          }
        },
        sender: {
          connect: {
            address: session.address
          }
        }
      }
    });

    return data;
  } catch (error) {
    throw new Error(`Failed to create the message: ` + error.message);
  }
};

export const likeMessage = async (messageId: number, userIdToLike: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  // Check if the user has already liked the message
  const messageLiked = await prisma.likes.findFirst({
    where: {
      messageId: messageId,
      likedBy: {
        address: session.address
      }
    }
  });

  if (messageLiked) {
    throw new Error('You have already liked this message');
  }

  try {
    await prisma.likes.create({
      data: {
        message: {
          connect: {
            id: messageId
          }
        },
        likedBy: {
          connect: {
            address: session.address
          }
        },
        userLikes: {
          connect: {
            id: userIdToLike
          }
        }
      }
    });
  } catch (error) {
    throw new Error(`Failed to like the message: ` + error.message);
  }
};

export const replyMessage = async (
  message: string,
  pool: string,
  messageReplied: number
) => {
  const session = await getSession();
  if (!session) {
    throw new Error('User not authenticated');
  }

  try {
    const data = await prisma.messagesReplies.create({
      data: {
        messageReplied: {
          connect: {
            id: messageReplied
          }
        },
        messageReplying: {
          create: {
            content: message,
            chat: {
              connect: {
                pool: pool
              }
            },
            sender: {
              connect: {
                address: session.address
              }
            }
          }
        }
      }
    });

    return data;
  } catch (error) {
    throw new Error(`Failed to reply to the message: ` + error.message);
  }
};
