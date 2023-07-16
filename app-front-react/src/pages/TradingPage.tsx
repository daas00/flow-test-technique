import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../storage/reducers/rootReducer';
import { fetchBestTimeToTrade, fetchMonthlyAverages } from '../storage/tradingSlice';
import Chart from '../components/TradeMonthlyAveragesChart';
import TradeForm from '../components/TradeForm';
import BestTimeToTrade from '../components/BestTimeToTrade';

const TradingPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any,any>>(); // Ajoutez le typage explicite ici
  const monthlyAveragesData = useSelector((state: RootState) => state.trading.monthlyAveragesData);
  const bestTimeToTradeData = useSelector((state: RootState) => state.trading.bestTimeToTradeData);
  const loading = useSelector((state: RootState) => state.trading.loading);
  const error = useSelector((state: RootState) => state.trading.error);

  const handleTrade = (company: string, amount: number) =>  {
    // Fetch the best time to trade data when the trade button is clicked
   dispatch(fetchBestTimeToTrade(company, amount));
  };


  // Appellez fetchMonthlyAverages lors du montage initial de l'application
  useEffect(() => {
    dispatch(fetchMonthlyAverages());
  }, [dispatch]);

  return (
    <div className="trading-page">
      <h1>Evolution du prix des actionns Amonze et Google sur 2023</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Chart series={monthlyAveragesData}></Chart>
      <TradeForm handleTrade={handleTrade}></TradeForm>
      <BestTimeToTrade bestTimeToTradeData={bestTimeToTradeData}></BestTimeToTrade>
    </div>
  );
};

export default TradingPage;