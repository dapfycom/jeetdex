import prisma from '@/db';

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  const identifier = params.identifier;
  console.log(identifier);
  const ifFromNormie = identifier.includes('-');

  let coin;
  try {
    if (ifFromNormie) {
      coin = await prisma.coins.findUnique({
        where: {
          identifier: identifier
        },
        include: {
          owner: true
        }
      });
    } else {
      coin = await prisma.coins.findFirst({
        where: {
          degenId: identifier
        },

        include: {
          owner: true
        }
      });
    }
    console.log(coin);

    return Response.json({ data: coin });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
