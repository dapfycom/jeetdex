import prisma from '@/db';
import { fetchTokenById } from '@/services/rest/elrond/tokens';
import { getSession } from '@/utils/server-utils/sessions';
import { utapi } from '@/utils/server-utils/uploadthing';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  userAvatar: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({}) => {
      console.log('Image upload route hit');

      // This code runs on your server before upload
      const user = await getSession();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userAddress: user.address };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userAddress);

      console.log('file url', file.url);
      console.log(file);
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
        console.log(fileKey);

        await utapi.deleteFiles(fileKey);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userAddress };
    }),

  coinImage: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(async ({ files, req }) => {
      console.log('Image upload route hit');
      console.log(req.body);

      // Only allow png or svg
      if (files[0].type !== 'image/png' && files[0].type !== 'image/svg+xml') {
        throw new UploadThingError('Only png or svg files are allowed');
      }

      console.log('after check 1');

      // This code runs on your server before upload
      const user = await getSession();

      console.log('after check 2');

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      const tokenI = files[0].name.split('.')[0];

      const tokenDetails = await fetchTokenById(tokenI);

      if (tokenDetails.owner !== user.address) {
        throw new UploadThingError('You are not the owner of this token');
      }

      console.log('pass');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userAddress: user.address };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log(metadata);
      console.log(file);
      const tokenI = file.name.split('.')[0];
      const currentCoin = await prisma.coins.findUnique({
        where: {
          identifier: tokenI
        }
      });

      await prisma.coins.create({
        data: {
          identifier: tokenI,
          img: file.url,
          owner: {
            connect: {
              address: metadata.userAddress
            }
          }
        }
      });

      if (currentCoin) {
        const fileKey = currentCoin.img.split('/').pop();
        console.log(fileKey);

        await utapi.deleteFiles(fileKey);
      }

      revalidateTag('CoinsPairs');
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userAddress };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
