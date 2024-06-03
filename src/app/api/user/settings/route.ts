import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const user = await prisma.users.findUniqueOrThrow({
    where: {
      address: session.address
    }
  });
  console.log(user);
  try {
    const data = await prisma.userSettings.findUnique({
      where: {
        userId: user.id
      },
      include: {
        pools: {
          include: {
            pool: true
          }
        }
      }
    });
    console.log(data);

    return Response.json({ data });
  } catch (error) {
    console.log(error);
  }
}
