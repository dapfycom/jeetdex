import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Thread from '../Thread/Thread';
import Trades from '../Trades/Trades';

export default function BottoomTabs() {
  return (
    <Tabs defaultValue='threads' className='w-full'>
      <TabsList className=''>
        <TabsTrigger value='threads'>Thread</TabsTrigger>
        <TabsTrigger value='trades'>Trades</TabsTrigger>
      </TabsList>
      <TabsContent value='threads'>
        <Thread />
      </TabsContent>
      <TabsContent value='trades'>
        <Trades />
      </TabsContent>
    </Tabs>
  );
}
