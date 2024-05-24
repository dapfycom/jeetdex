export default function Page({ params }: { params: { lptoken: string } }) {
  return <div>My Post: {params.lptoken}</div>;
}
