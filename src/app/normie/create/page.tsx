import { Suspense } from 'react';
import ListTokenView from '../views/ListTokenView/ListTokenView';

const ListTokenPage = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Suspense fallback='kaka'>
      <ListTokenView searchParams={searchParams} />
    </Suspense>
  );
};

export default ListTokenPage;
