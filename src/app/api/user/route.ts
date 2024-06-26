import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET(request: Request) {
  const session = await getSession();

  const { searchParams } = new URL(request.url);
  const userAddress = searchParams.get('userAddress');
  console.log(userAddress);

  let data;
  if (!userAddress) {
    if (!session) {
      return Response.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

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
        address: userAddress
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
