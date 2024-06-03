import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const data = await prisma.users.findUnique({
    where: {
      address: session.address
    }
  });

  return Response.json({ data });
}
