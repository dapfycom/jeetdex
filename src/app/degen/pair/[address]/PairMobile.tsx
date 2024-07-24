import MobileNav from './components/MobileContent/MobileContent';

const PairMobile = ({ tab }: { tab: string }) => {
  return (
    <div className='w-full'>
      <MobileNav tab={tab} />
    </div>
  );
};

export default PairMobile;
