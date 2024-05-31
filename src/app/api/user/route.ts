import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export async function GET() {
  const session = await getSession();
  const data = await prisma.users.findUnique({
    where: {
      address: session.address
    }
  });

  return Response.json({ data });
}
