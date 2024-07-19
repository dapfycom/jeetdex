import prisma from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get('page');
  try {
    const page = parseInt(pageParam) || 1;
    const pageSize = 20;
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
    return Response.json({ data: degenCoins }, { status: 200 });
  } catch (error) {
    console.error('Error fetching coins:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
