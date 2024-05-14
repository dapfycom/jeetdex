import { AppState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type stepsType = 'create-pool' | 'set-lp' | 'set-roles';

export interface CreatePoolState {
  activeStep: stepsType;
  token1: string;
  token2: string;
}

const initialState: CreatePoolState = {
  activeStep: 'create-pool',
  token1: '',
  token2: ''
};

export const dapp = createSlice({
  name: 'create-pools',
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<stepsType>) => {
      state.activeStep = action.payload;
    },
    setToke1: (state, action: PayloadAction<string>) => {
      state.token1 = action.payload;
    },

    setToken2: (state, action: PayloadAction<string>) => {
      state.token2 = action.payload;
    }
  }
});

export const selectActiveCreatePoolStep = (state: AppState) =>
  state.createPools.activeStep;
export const selectToken1 = (state: AppState) => state.createPools.token1;
export const selectToken2 = (state: AppState) => state.createPools.token2;

export const { setActiveStep, setToke1, setToken2 } = dapp.actions;
export default dapp.reducer;
