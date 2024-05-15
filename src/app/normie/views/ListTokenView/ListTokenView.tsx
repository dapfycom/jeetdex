import Container from '@/components/Container/Container';
import {
  faLock,
  faRotate,
  faWaterLadder
} from '@fortawesome/free-solid-svg-icons';
import ActionsBox from './components/ActionsBox/ActionsBox';

const ListTokenView = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Container className='mt-8'>
      <div className='w-full max-w-[800px] mx-auto'>
        <h1 className='text-lg sm:text-3xl mb-4'>List token</h1>

        <div className='grid grid-cols-2 gap-6 w-full'>
          <ActionsBox
            icon={faWaterLadder}
            title='Create Pool'
            description='Create a pools using the tokens you minted'
            path='/create/create-pool'
            completed={searchParams['create-pool'] === 'true'}
          />
          <ActionsBox
            icon={faLock}
            title='Lock LP'
            description='Lock liquidity pool token'
            path='/create/lock-lp'
            completed={searchParams['lock-lp'] === 'true'}
          />
          <ActionsBox
            icon={faRotate}
            title='Enable Tarde'
            description='Enable trade for your pools'
            path='/create/enable-swap'
            completed={searchParams['enable-swap'] === 'true'}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListTokenView;
