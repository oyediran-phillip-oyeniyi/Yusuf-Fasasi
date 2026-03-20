import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './fallback';
import CandlestickChart from '@/components/CandlestickChart';

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>('/coins/bitcoin', {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }),
      fetcher<OHLCData[]>('coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: '1',
        precision: 'full',
      }),
    ]);

    console.log('Coin data:', coin); // Debug log
    console.log('OHLC data:', coinOHLCData); // Debug log

    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLCData} coinId="bitcoin">
          <div className="header pt-2">
            <Image 
              src={coin?.image?.large || '/placeholder-coin.png'} 
              alt={coin?.name || 'Bitcoin'} 
              width={56} 
              height={56} 
            />
            <div className="info">
              <p>
                {coin?.name || 'Bitcoin'} / {coin?.symbol?.toUpperCase() || 'BTC'}
              </p>
              <h1>{formatCurrency(coin?.market_data?.current_price?.usd || 0)}</h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;