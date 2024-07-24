'use client';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { formatTokenI } from '@/utils/mx-utils';
import { useFetchCoinsData } from '../../../../hooks';
import CoinItem from './CoinItem';

export const coinsData = [
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmNM5KxaFcvv1cFaZQCK1iHS8LBZ7YNq8XJcfCBTCVXA69?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'Little Blackrock',
    ticker: 'LBRK',
    marketCap: '31.36K',
    replies: 219,
    description: 'The cutest little token on the Solana block!'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmZDaUmrKoiwFWzs4X5u6bjFQYRf5qsRrKVG9nyZTDumQq',
    name: 'PlonkBotAd',
    ticker: 'PlonkBotAd',
    marketCap: '4.49K',
    replies: 25,
    description:
      'This is an Advertisement. PlonkBot is the ultimate pump.fun trading partner, trade your tokens direct from telegram at lightning speed. Refer friends to earn SOL on every transaction. Win 2 Sol a day! Free Monitors & Alerts. Join TG: https://t.me/PlonkBotPortal Alerts: https://t.me/PlonkBotAlerts'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmakdcYVLuHppQKesRVSLpQfpACD71wbRZANfda1577Vig?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'DoYouKnowDaWae',
    ticker: 'Wae',
    marketCap: '7.16K',
    replies: 1,
    description: '' // Description is empty in the HTML provided
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmZVXarwRiXfCeUsNjGnUM7z9WS9Q3zdPsyqk8Znv9tEh4?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'RYÚ Coin',
    ticker: 'RYU',
    marketCap: '5.30K',
    replies: 1,
    description: '$RYU dragon - official Japanese mascot of 2024 龍'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmcgmrhLb9EBuVpZ8ik5eFuYwv3rWgbGoWKw1y2feT1av4?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'MrSol Cat',
    ticker: 'MRCAT',
    marketCap: '10.06K',
    replies: 9,
    description: "don't let the suit fool you, mrcat's all play"
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmNM5KxaFcvv1cFaZQCK1iHS8LBZ7YNq8XJcfCBTCVXA69?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'Little Blackrock',
    ticker: 'LBRK',
    marketCap: '31.36K',
    replies: 219,
    description: 'The cutest little token on the Solana block!'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmZDaUmrKoiwFWzs4X5u6bjFQYRf5qsRrKVG9nyZTDumQq',
    name: 'PlonkBotAd',
    ticker: 'PlonkBotAd',
    marketCap: '4.49K',
    replies: 25,
    description:
      'This is an Advertisement. PlonkBot is the ultimate pump.fun trading partner, trade your tokens direct from telegram at lightning speed. Refer friends to earn SOL on every transaction. Win 2 Sol a day! Free Monitors & Alerts. Join TG: https://t.me/PlonkBotPortal Alerts: https://t.me/PlonkBotAlerts'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmakdcYVLuHppQKesRVSLpQfpACD71wbRZANfda1577Vig?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'DoYouKnowDaWae',
    ticker: 'Wae',
    marketCap: '7.16K',
    replies: 1,
    description: '' // Description is empty in the HTML provided
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmZVXarwRiXfCeUsNjGnUM7z9WS9Q3zdPsyqk8Znv9tEh4?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'RYÚ Coin',
    ticker: 'RYU',
    marketCap: '5.30K',
    replies: 1,
    description: '$RYU dragon - official Japanese mascot of 2024 龍'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmcgmrhLb9EBuVpZ8ik5eFuYwv3rWgbGoWKw1y2feT1av4?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'MrSol Cat',
    ticker: 'MRCAT',
    marketCap: '10.06K',
    replies: 9,
    description: "don't let the suit fool you, mrcat's all play"
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmNM5KxaFcvv1cFaZQCK1iHS8LBZ7YNq8XJcfCBTCVXA69?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'Little Blackrock',
    ticker: 'LBRK',
    marketCap: '31.36K',
    replies: 219,
    description: 'The cutest little token on the Solana block!'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmZDaUmrKoiwFWzs4X5u6bjFQYRf5qsRrKVG9nyZTDumQq',
    name: 'PlonkBotAd',
    ticker: 'PlonkBotAd',
    marketCap: '4.49K',
    replies: 25,
    description:
      'This is an Advertisement. PlonkBot is the ultimate pump.fun trading partner, trade your tokens direct from telegram at lightning speed. Refer friends to earn SOL on every transaction. Win 2 Sol a day! Free Monitors & Alerts. Join TG: https://t.me/PlonkBotPortal Alerts: https://t.me/PlonkBotAlerts'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmakdcYVLuHppQKesRVSLpQfpACD71wbRZANfda1577Vig?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'DoYouKnowDaWae',
    ticker: 'Wae',
    marketCap: '7.16K',
    replies: 1,
    description: '' // Description is empty in the HTML provided
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmZVXarwRiXfCeUsNjGnUM7z9WS9Q3zdPsyqk8Znv9tEh4?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'RYÚ Coin',
    ticker: 'RYU',
    marketCap: '5.30K',
    replies: 1,
    description: '$RYU dragon - official Japanese mascot of 2024 龍'
  },
  {
    imageUrl:
      'https://pump.mypinata.cloud/ipfs/QmcgmrhLb9EBuVpZ8ik5eFuYwv3rWgbGoWKw1y2feT1av4?img-width=128&img-dpr=2&img-onerror=redirect',
    name: 'MrSol Cat',
    ticker: 'MRCAT',
    marketCap: '10.06K',
    replies: 9,
    description: "don't let the suit fool you, mrcat's all play"
  }
];

const Coins = () => {
  const { currentParams } = useUpdateUrlParams(['search']);
  console.log(currentParams);

  const { coinsData } = useFetchCoinsData({ search: currentParams[0] });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
      {coinsData.map((coin, index) => (
        <CoinItem
          key={index}
          imageUrl={coin.img}
          name={coin.title}
          ticker={formatTokenI(coin.firstTokenId)}
          marketCap={coin.marketCap}
          replies={236}
          description={coin.description}
          username={coin.owner.username}
          address={coin.address}
        />
      ))}
    </div>
  );
};

export default Coins;
