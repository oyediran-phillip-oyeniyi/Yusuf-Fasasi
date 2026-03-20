"use client"

import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG } from '@/constants'
import React, { useState, useRef, useTransition, useEffect } from 'react'
import { CandlestickSeries, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { fetcher } from '@/lib/coingecko.actions';
import { convertOHLCData } from '@/lib/utils';

const CandleStickChart = ({
  children, 
  data, 
  coinId, 
  height = 360, 
  initialPeriod = "daily" 
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState(initialPeriod);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>(data ?? []);
  const [isPending, startTransition] = useTransition();

  const fetchOHLCData = async (selectedPeriod: Period) => {
    try {
      setLoading(true);
      const { days } = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: 'usd',
        days: String(days),
        precision: 'full',
      });

      startTransition(() => {
        setOhlcData(newData ?? []);
      });
    } catch (e) {
      console.error('Failed to fetch OHLC Data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period || loading) return;

    setPeriod(newPeriod);
    fetchOHLCData(newPeriod);
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container || !ohlcData || ohlcData.length === 0) return;

    const showTime = ['daily', 'weekly', 'monthly'].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });
    
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    const convertedData = convertOHLCData(ohlcData);
    series.setData(convertedData);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [height, period, ohlcData]);

  return (
    <div id='candlestick-chart'>
      <div className="chart-header">
        <div className="flex-1">{children}</div>
        <div className="button-group">
          <span className="text-sm mx-2 font-medium text-purple-100/50">Period: </span>
          {PERIOD_BUTTONS.map(each => (
            <button 
              key={each.value} 
              className={period === each.value ? "config-button-active" : "config-button"} 
              onClick={() => handlePeriodChange(each.value)} 
              disabled={loading || isPending}
            >
              {each.label}
            </button>
          ))}                
        </div>
      </div>

      <div className="chart" ref={chartContainerRef} style={{height}} />
    </div>
  );
};

export default CandleStickChart;