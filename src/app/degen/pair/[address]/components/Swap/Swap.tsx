import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TradeOnDexBox from '../TradeOnDexBox/TradeOnDexBox';
import Buy from './Buy';
import Sell from './Sell';

const Swap = () => {
  return (
    <div className='grid gap-4 h-auto'>
      <TradeOnDexBox />
      <div className='bg-[#2e303a] p-4 rounded-lg border border-none text-gray-400 grid gap-4'>
        <div className='grid gap-2 '>
          <Tabs defaultValue='buy' className='w-full '>
            <TabsList className='grid grid-cols-2 gap-2 bg-transparent p-0 '>
              <TabsTrigger
                value='buy'
                className='data-[state=active]:bg-green-400 bg-gray-800 h-10 p-2 text-center rounded data-[state=active]:text-gray-700 text-gray-400'
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value='sell'
                className='data-[state=active]:bg-red-400 bg-gray-800 h-10 p-2 text-center rounded data-[state=active]:text-gray-200 text-gray-400'
              >
                Sell
              </TabsTrigger>
            </TabsList>
            <TabsContent value='buy' className='w-full'>
              <Buy />
            </TabsContent>
            <TabsContent value='sell'>
              <Sell />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Swap;
