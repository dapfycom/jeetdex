import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET(
  request: Request,
  { params }: { params: { pool: string } }
) {
  console.log('params', params);

  const session = await getSession();
  if (!session) {
    return Response.json(
      {
        error: 'You must be logged in to view this page.'
      },
      { status: 403 }
    );
  }
  console.log(session);

  const pool = params.pool;

  try {
    const chat = await prisma.chats.findUnique({
      where: {
        pool: pool
      },
      include: {
        messages: {
          include: {
            _count: {
              select: {
                likes: true
              }
            },
            sender: true
          }
        }
      }
    });
    console.log(chat);
    return Response.json({ data: chat });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
