import prisma from '@/db';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  const identifier = params.identifier;
  console.log(identifier);

  try {
    const coin = await prisma.coins.findUnique({
      where: {
        identifier: identifier,
        OR: [
          {
            degenId: identifier
          }
        ]
      },

      include: {
        owner: true
      }
    });
    console.log(coin);

    return Response.json({ data: coin });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
