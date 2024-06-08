import { AppState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PoolsState {
  searchInput: string;
}

const initialState: PoolsState = {
  searchInput: ''
};

export const poolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    onChangeSearchPoolInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    }
  }
});

export const selectSearchPoolsInput = (state: AppState) =>
  state.pools.searchInput;

export const { onChangeSearchPoolInput } = poolsSlice.actions;
export default poolsSlice.reducer;
