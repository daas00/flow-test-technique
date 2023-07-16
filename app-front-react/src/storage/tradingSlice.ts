import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../storage/store';
import { fetchBestTimeToTradeData, fetchMonthlyAveragesData } from '../api/tradingApi';
import { MonthlyAveragesData } from '../interfaces/MonthlyAveragesData';
import { BestTimeToTrade } from '../interfaces/BestTimeToTrade';

interface TradingState {
  monthlyAveragesData: MonthlyAveragesData[];
  bestTimeToTradeData: BestTimeToTrade;
  loading: boolean;
  error: string | null;
}

const initialState: TradingState = {
  monthlyAveragesData: [],
  bestTimeToTradeData: {
    company: '',
    amount : 0,
    purchaseDate: 0,
    purchasePrice: 0,
    sellDate: 0,
    sellPrice: 0,
    profit: 0,
  },
  loading: false,
  error: null,
};

const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    fetchMonthlyAveragesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMonthlyAveragesSuccess(state, action: PayloadAction<MonthlyAveragesData[]>) {
      state.loading = false;
      state.monthlyAveragesData = action.payload;
    },
    fetchMonthlyAveragesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBestTimeToTradeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBestTimeToTradeSuccess(state, action: PayloadAction<BestTimeToTrade>) {
      state.loading = false;
      state.bestTimeToTradeData = action.payload;
    },
    fetchBestTimeToTradeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMonthlyAveragesStart,
  fetchMonthlyAveragesSuccess,
  fetchMonthlyAveragesFailure,
  fetchBestTimeToTradeStart,
  fetchBestTimeToTradeSuccess,
  fetchBestTimeToTradeFailure,
} = tradingSlice.actions;

export default tradingSlice.reducer;

export const fetchMonthlyAverages = ():AppThunk => async (dispatch) => {
  try {
    dispatch(fetchMonthlyAveragesStart());
    const data = await fetchMonthlyAveragesData();
    dispatch(fetchMonthlyAveragesSuccess(data));
  } catch (error : any) {
    dispatch(fetchMonthlyAveragesFailure(error.message));
  }
};

export const fetchBestTimeToTrade = (company: string, amount: number): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchBestTimeToTradeStart());
    const data = await fetchBestTimeToTradeData(company, amount);
    dispatch(fetchBestTimeToTradeSuccess(data));
  } catch (error : any) {
    dispatch(fetchBestTimeToTradeFailure(error.message));
  }
};



