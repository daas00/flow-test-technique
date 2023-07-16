import {  ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import  { RootState } from './reducers/rootReducer';

// Définition du type pour les fonctions asynchrones (thunk)
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;