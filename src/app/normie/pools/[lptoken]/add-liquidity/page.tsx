import AddLiquidity from '@/app/normie/views/AddLiquidityView/AddLiquidity';
import { fetchPoolsData } from '@/services/others/cache.server';
export const dynamicParams = false; // true | false,
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pools = await fetchPoolsData();

  const poolPageGenerator = pools.map((pool) => ({
    lptoken: pool.lpTokenIdentifier
  }));
  console.log(poolPageGenerator);

  return poolPageGenerator;
}

async function Page({ params }: { params: { lptoken: string } }) {
  const pools = await fetchPoolsData();
  const pool = pools.find((pool) => pool.lpTokenIdentifier === params.lptoken);

  return <AddLiquidity pool={pool} />;
}

export default Page;
