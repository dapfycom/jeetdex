import swapReducer from '@/views/SwapAggregator/lib/swap-slice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dappReducer from './dapp/dapp-slice';
export function makeStore() {
  return configureStore({
    reducer: {
      dapp: dappReducer,
      swap: swapReducer
    }
  });
}
const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
