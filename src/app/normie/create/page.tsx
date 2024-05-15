import ListTokenView from '../views/ListTokenView/ListTokenView';

const ListTokenPage = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <ListTokenView searchParams={searchParams} />;
};

export default ListTokenPage;
