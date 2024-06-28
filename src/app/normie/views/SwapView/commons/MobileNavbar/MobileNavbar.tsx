'use client';

import ChartCard from '@/components/ChartCard/ChartCard';
import Chats from '@/components/ChatsCard/Chats';
import HoldersList from '@/components/HoldersList/HoldersList';
import Trades from '@/components/Trades/Trades';
import UserTrades from '@/components/Trades/UserTrades';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { IPoolPair } from '../../../PoolsView/utils/types';
import SwapCardContainer from '../SwapCard/SwapCardContainer';
import TokenSocials from '../SwapCard/commons/Socials/TokenSocials';

type NavItem = 'info' | 'chart' | 'buy/sell' | 'txs';

const nav: NavItem[] = ['info', 'chart', 'buy/sell', 'txs'];

const MobileNavbar = ({ poolPair }: { poolPair: IPoolPair }) => {
  console.log(poolPair);

  const navItemStyle = `bg-none data-[state=active]:bg-transparent px-4 py-2 data-[state=active]:text-white data-[state=active]:font-bold  text-gray-400`;

  return (
    <Tabs defaultValue={nav[2]}>
      <TabsList className='bg-[#08111b] px-6 py-5 flex justify-between fixed bottom-0 left-0 right-0 w-full h-[80px] z-10'>
        {nav.map((item) => {
          return (
            <TabsTrigger value={item} className={navItemStyle} key={item}>
              [{item}]
            </TabsTrigger>
          );
        })}
      </TabsList>

      <TabsContent value={nav[0]} className='w-full'>
        <TokenSocials tokenIdentifier={poolPair?.firstTokenId} />
        <HoldersList tokenIdentifier={poolPair?.firstTokenId} />
      </TabsContent>
      <TabsContent value={nav[1]} className='w-full'>
        <div
          className='h-full'
          style={{
            height: 'calc(100vh - 300px)'
          }}
        >
          <ChartCard poolPair={poolPair} />
        </div>
      </TabsContent>
      <TabsContent value={nav[2]} className='w-full'>
        <SwapCardContainer />
        <div className='mt-6'>
          <Tabs
            defaultValue='chats'
            className={cn('w-full rounded-sm bg-[#1C243E] border-none p-4')}
          >
            <TabsList className='w-full justify-start flex bg-transparent'>
              <TabsTrigger value='chats'>chats</TabsTrigger>
              <TabsTrigger value='trades'>trades</TabsTrigger>
            </TabsList>
            <TabsContent value='chats'>
              {' '}
              <Chats poolPair={poolPair?.lpTokenIdentifier} />
            </TabsContent>
            <TabsContent value='trades'>
              <Trades poolPair={poolPair} />
            </TabsContent>
          </Tabs>
        </div>
      </TabsContent>
      <TabsContent value={nav[3]} className='w-full'>
        <Tabs
          defaultValue='trades'
          className={cn('w-full rounded-sm bg-[#1C243E] border-none  p-4')}
        >
          <TabsList className='w-full justify-start flex bg-transparent'>
            <TabsTrigger value='trades'>trades</TabsTrigger>
            <TabsTrigger value='my-trades'>my trades</TabsTrigger>
          </TabsList>

          <TabsContent value='trades'>
            <Trades poolPair={poolPair} />
          </TabsContent>
          <TabsContent value='my-trades'>
            <UserTrades poolPair={poolPair} />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default MobileNavbar;
