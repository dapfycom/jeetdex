import prisma from '@/db';

export async function GET(
  request: Request,
  { params }: { params: { pool: string } }
) {
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
            sender: true,
            messageReplied: true,
            messageReplying: true
          }
        }
      }
    });
    return Response.json({ data: chat });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
