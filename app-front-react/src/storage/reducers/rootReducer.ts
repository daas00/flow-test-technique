import { combineReducers } from '@reduxjs/toolkit';
import tradingReducer from '../tradingSlice';

const rootReducer = combineReducers({
  trading: tradingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
