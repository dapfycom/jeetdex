import { Button } from '@/components/ui/button';

const PlaceTradeButton = () => {
  return (
    <Button
      type='submit'
      className=' focus-visible:ring-slate-300 bg-green-600 text-gray-200 hover:bg-green-600/90 h-10 w-full mt-3'
    >
      place trade
    </Button>
  );
};

export default PlaceTradeButton;
