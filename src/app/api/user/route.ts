import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log(id);

  let data;
  if (!id) {
    data = await prisma.users.findUnique({
      where: {
        address: session.address
      },
      include: {
        followed: {
          include: {
            following: true
          }
        },
        following: {
          include: {
            followed: true
          }
        },
        _count: {
          select: {
            likesReceived: true
          }
        }
      }
    });
  } else {
    data = await prisma.users.findUnique({
      where: {
        id: id
      },
      include: {
        followed: {
          include: {
            following: true
          }
        },
        following: {
          include: {
            followed: true
          }
        },
        _count: {
          select: {
            likesReceived: true
          }
        }
      }
    });
  }

  return Response.json({ data });
}
