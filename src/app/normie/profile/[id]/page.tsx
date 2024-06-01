import { fetchUsersData } from '@/services/others/cache.server';
import PublicProfileView from '../../views/PublicProfile/PublicProfileeView';
export const dynamicParams = false; // true | false,
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const users = await fetchUsersData();

  return users.map((u) => ({
    u: u.id
  }));
}

async function Page({ params }: { params: { id: string } }) {
  return <PublicProfileView id={params.id} />;
}

export default Page;
