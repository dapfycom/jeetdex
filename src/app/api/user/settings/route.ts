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

  const data = await prisma.userSettings.findUnique({
    where: {
      userId: user.id
    }
  });

  return Response.json({ data });
}
