import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Buy from './Buy';
import Sell from './Sell';

const Swap = () => {
  return (
    <div className='grid gap-4 h-auto'>
      <div className='bg-[#2e303a] p-4 rounded-lg border border-none text-gray-400 grid gap-4'>
        <div className='grid gap-2 mb-4'>
          <Tabs defaultValue='buy' className='w-full'>
            <TabsList className='grid grid-cols-2 gap-2 bg-transparent p-0'>
              <TabsTrigger
                value='buy'
                className='data-[state=active]:bg-green-600 bg-gray-800 h-8'
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value='sell'
                className='data-[state=active]:bg-green-600 bg-gray-800  h-8'
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
