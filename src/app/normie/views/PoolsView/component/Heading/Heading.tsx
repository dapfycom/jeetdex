import { Button } from '@/components/ui/button';
import { faWaterLadder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Heading = () => {
  return (
    <div className='bg-card rounded-2xl p-6 flex flex-col gap-5 w-full'>
      <h1 className='text-sm  text-muted-foreground '>Pools</h1>
      <div>
        <FontAwesomeIcon
          icon={faWaterLadder}
          className='text-primary w-[60px] h-[60px]'
        />
      </div>

      <h2 className='text-4xl'>
        Provide liquidity, earn trading fees <br /> and token rewards.
      </h2>

      <Button className='w-fit'>Add liquidity</Button>
    </div>
  );
};

export default Heading;
