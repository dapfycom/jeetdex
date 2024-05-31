import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export interface GeneralState {
  userAddress: string;
  shard: number;
  globalData: {
    coins: any[];
  };
}

const initialState: GeneralState = {
  userAddress: '',
  shard: 1,
  globalData: {
    coins: []
  }
};

export const dapp = createSlice({
  name: 'dapp',
  initialState,
  reducers: {
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    setShard: (state, action: PayloadAction<number>) => {
      state.shard = action.payload;
    },
    setGlobalData: (state, action: PayloadAction<{ coins: any[] }>) => {
      state.globalData = action.payload;
    }
  }
});

export const selectUserAddress = (state: AppState) => state.dapp.userAddress;
export const selectShard = (state: AppState) => state.dapp.shard;
export const selectGlobalData = (state: AppState) => state.dapp.globalData;

export const { setGlobalData, setUserAddress, setShard } = dapp.actions;
export default dapp.reducer;
