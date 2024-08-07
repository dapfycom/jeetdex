import prisma from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get('page');
  try {
    const page = parseInt(pageParam) || 1;
    const pageSize = 100000;
    const degenCoins = await prisma.coins.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        degenId: {
          not: null
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            address: true,
            username: true
          }
        }
      }
    });

    const chats = await prisma.chats.findMany({
      where: {
        pool: {
          in: degenCoins.map((c) => c.identifier)
        }
      },
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      }
    });

    const data = degenCoins.map((coin) => {
      const chatForThisCoin = chats.find(
        (chat) => chat.pool === coin.identifier
      );
      return {
        ...coin,
        replies: chatForThisCoin?._count.messages || 0
      };
    });

    return Response.json({ data: data }, { status: 200 });
  } catch (error) {
    console.log('Error fetching coins:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
