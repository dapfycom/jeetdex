import {
  faLock,
  faRotate,
  faWaterLadder
} from '@fortawesome/free-solid-svg-icons';
import ActionsBox from './components/ActionsBox/ActionsBox';

const ListTokenView = () => {
  return (
    <div className='w-full max-w-[800px]'>
      <h1 className='text-3xl mb-4'>List token</h1>

      <div className='grid grid-cols-2 gap-6 w-full'>
        <ActionsBox
          icon={faWaterLadder}
          title='Create Pool'
          description='Create a pools using the tokens you minted'
          path='/create/create-pool'
        />
        <ActionsBox
          icon={faRotate}
          title='Enable Tarde'
          description='Enable trade for your pools'
          path='/create/enable-swap'
        />
        <ActionsBox
          icon={faLock}
          title='Lock LP'
          description='Lock liquidity pool token'
          path='/create/lock-lp'
        />
      </div>
    </div>
  );
};

export default ListTokenView;
