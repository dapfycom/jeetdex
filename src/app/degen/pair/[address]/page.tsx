import Container from '@/components/Container/Container';
import { headers } from 'next/headers';
import PairDesktop from './PairDesktop';
import PairMobile from './PairMobile';

const PairPage = ({ searchParams }: { searchParams: { tab: string } }) => {
  // const withDefaultPool = useGetDefaultPool(poolPair);
  console.log(searchParams);
  const headersList = headers();
  const deviceType = headersList.get('x-device-type');
  const isMobile = deviceType === 'mobile';

  return (
    <Container className='flex flex-col items-center text-center w-full '>
      {isMobile ? <PairMobile tab={searchParams.tab} /> : <PairDesktop />}
    </Container>
  );
};

export default PairPage;
