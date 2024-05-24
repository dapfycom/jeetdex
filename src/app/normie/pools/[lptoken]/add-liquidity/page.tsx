import AddLiquidity from '@/app/normie/views/AddLiquidityView/AddLiquidity';
import { fetchPoolsData } from '@/services/others/pools.server';
export const dynamicParams = false; // true | false,
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pools = await fetchPoolsData();

  return pools.map((pool) => ({
    lptoken: pool.lpTokenIdentifier
  }));
}

export default function Page({ params }: { params: { lptoken: string } }) {
  return <AddLiquidity lpToken={params.lptoken} />;
}
