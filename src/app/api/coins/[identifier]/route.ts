import prisma from '@/db';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  const identifier = params.identifier;

  try {
    const coin = await prisma.coins.findUnique({
      where: {
        identifier: identifier
      }
    });
    return Response.json({ data: coin });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
