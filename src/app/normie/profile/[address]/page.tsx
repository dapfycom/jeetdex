import { fetchUsersData } from '@/services/others/cache.server';
import PublicProfileView from '../../views/PublicProfile/PublicProfileeView';
export const dynamicParams = true; // true | false,
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const users = await fetchUsersData();

  const generatedIdForUserPages = users.map((u) => ({
    address: u.address
  }));

  console.log(generatedIdForUserPages);

  return generatedIdForUserPages;
}

async function Page({ params }: { params: { address: string } }) {
  return <PublicProfileView userAddress={params.address} />;
}

export default Page;
