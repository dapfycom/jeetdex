'use server';
import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export const sendPoolMessage = async (message: string, pool: string) => {
  console.log('sendPoolMessage');

  const session = await getSession();

  console.log(session);

  if (!session) {
    return Response.json(
      {
        error: 'You must be logged in to view this page.'
      },
      { status: 403 }
    );
  }
  console.log(session);

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

    console.log(data);

    return Response.json({ data: data });
  } catch (error) {
    console.log(error);

    return Response.json({ error: error.message }, { status: 500 });
  }
};
