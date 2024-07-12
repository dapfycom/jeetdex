import prisma from '@/db';
import { fetchTokenById } from '@/services/rest/elrond/tokens';
import { getSession } from '@/utils/server-utils/sessions';
import { utapi } from '@/utils/server-utils/uploadthing';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { z } from 'zod';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  userAvatar: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({}) => {
      // This code runs on your server before upload
      const user = await getSession();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userAddress: user.address };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      const currentUser = await prisma.users.findFirstOrThrow({
        where: {
          address: metadata.userAddress
        }
      });

      await prisma.users.update({
        where: {
          id: currentUser.id
        },
        data: {
          img: file.url
        }
      });

      revalidatePath('/profile');

      if (currentUser.img.startsWith('https://')) {
        const fileKey = currentUser.img.split('/').pop();

        await utapi.deleteFiles(fileKey);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userAddress };
    }),

  coinImage: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(async ({ files }) => {
      // Only allow png or svg
      if (files[0].type !== 'image/png' && files[0].type !== 'image/svg+xml') {
        throw new UploadThingError('Only png or svg files are allowed');
      }
      console.log('session');

      // This code runs on your server before upload
      const user = await getSession();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      const tokenI = files[0].name.split('.')[0];

      const tokenDetails = await fetchTokenById(tokenI);

      if (tokenDetails.owner !== user.address) {
        throw new UploadThingError('You are not the owner of this token');
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userAddress: user.address };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      const tokenI = file.name.split('.')[0];
      const currentCoin = await prisma.coins.findUnique({
        where: {
          identifier: tokenI
        }
      });
      try {
        await prisma.coins.upsert({
          create: {
            identifier: tokenI,
            img: file.url,
            owner: {
              connect: {
                address: metadata.userAddress
              }
            }
          },
          update: {
            img: file.url
          },
          where: {
            identifier: tokenI
          }
        });

        if (currentCoin) {
          const fileKey = currentCoin.img.split('/').pop();
          try {
            await utapi.deleteFiles(fileKey);
          } catch (error) {
            console.error(error);
          }
        }

        revalidateTag('CoinsPairs');
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userAddress };
      } catch (error) {
        throw new UploadThingError('Error updating database');
      }
    }),
  messageImage: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .input(
      z.object({
        pool: z.string(),
        message: z.string(),
        repliedMessage: z.number().optional()
      })
    )
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const user = await getSession();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userAddress: user.address,
        pool: input.pool,
        message: input.message,
        repliedMessage: input.repliedMessage
      };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      if (metadata.repliedMessage) {
        // reply
        try {
          await prisma.messagesReplies.create({
            data: {
              messageReplied: {
                connect: {
                  id: metadata.repliedMessage
                }
              },
              messageReplying: {
                create: {
                  content: metadata.message,
                  chat: {
                    connect: {
                      pool: metadata.pool
                    }
                  },
                  sender: {
                    connect: {
                      address: metadata.userAddress
                    }
                  }
                }
              }
            }
          });
        } catch (error) {
          throw new UploadThingError(
            `Failed to reply to the message: ` + error.message
          );
        }
      } else {
        // sendPoolMessage
        await prisma.messages.create({
          data: {
            content: metadata.message,
            image: file.url,
            chat: {
              connectOrCreate: {
                create: {
                  pool: metadata.pool
                },
                where: {
                  pool: metadata.pool
                }
              }
            },
            sender: {
              connect: {
                address: metadata.userAddress
              }
            }
          }
        });
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userAddress };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
