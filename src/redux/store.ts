import poolsReducer from '@/app/normie/views/PoolsView/utils/pools-slice';
import swapReducer from '@/app/normie/views/SwapView/lib/swap-slice';
import createPoolsReducer from '@/components/CreatePool/utils/slice';
import defiReducer from '@/views/DefiView/utils/defi-slice';
import dustReducer from '@/views/DustView/lib/dust-slice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dappReducer from './dapp/dapp-slice';
export function makeStore() {
  return configureStore({
    reducer: {
      dapp: dappReducer,
      swap: swapReducer,
      createPools: createPoolsReducer,
      dust: dustReducer,
      pools: poolsReducer,
      defi: defiReducer
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
