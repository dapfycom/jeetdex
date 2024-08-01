import PublicProfileView from '@/app/normie/views/PublicProfile/PublicProfileeView';
import { fetchUsersData } from '@/services/others/cache.server';
export const dynamicParams = true; // true | false,
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const users = await fetchUsersData();

  const generatedIdForUserPages = users.map((u) => ({
    address: u.address
  }));

  return generatedIdForUserPages;
}

async function Page({ params }: { params: { address: string } }) {
  return <PublicProfileView userAddress={params.address} />;
}

export default Page;
