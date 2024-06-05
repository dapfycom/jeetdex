import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const user = await prisma.users.findUnique({
    where: {
      address: session.address
    },
    include: {
      _count: {
        select: {
          likesReceived: true
        }
      },
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
      messages: {
        include: {
          likes: {
            include: {
              likedBy: true
            }
          },
          chat: true
        }
      }
    }
  });

  return Response.json({ data: user });
}
