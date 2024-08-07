import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface GeneralState {
  isLoginModal: boolean;

  userAddress: string;
  shard: number;
  globalData: {
    coins: any[];
    pools: IPoolPair[];
  };
}

const initialState: GeneralState = {
  isLoginModal: false,
  userAddress: '',
  shard: 1,
  globalData: {
    coins: [],
    pools: []
  }
};

export const dapp = createSlice({
  name: 'dapp',
  initialState,
  reducers: {
    openLogin: (state, action: PayloadAction<boolean>) => {
      state.isLoginModal = action.payload;
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    setShard: (state, action: PayloadAction<number>) => {
      state.shard = action.payload;
    },
    setGlobalData: (
      state,
      action: PayloadAction<{ coins: any[]; pools: IPoolPair[] }>
    ) => {
      state.globalData = {
        coins: action.payload?.coins || [],
        pools: action.payload?.pools || []
      };
    }
  }
});
export const selectIsLoginModal = (state: AppState) => state.dapp.isLoginModal;

export const selectUserAddress = (state: AppState) => state.dapp.userAddress;
export const selectShard = (state: AppState) => state.dapp.shard;
export const selectGlobalData = (state: AppState) => state.dapp.globalData;

export const { openLogin, setGlobalData, setUserAddress, setShard } =
  dapp.actions;
export default dapp.reducer;
