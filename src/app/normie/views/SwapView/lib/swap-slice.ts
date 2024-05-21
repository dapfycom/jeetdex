import { tokensID } from '@/config';
import { AppState } from '@/redux/store';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

export interface SwapState {
  fromField: {
    value: string;
    valueDecimals: string;
    selectedToken: string;
  };
  toField: {
    value: string;
    selectedToken: string;
    valueDecimals: string;
  };
  normalDirection: boolean;
  rate: number;
  slipage: number;
}

const initialState: SwapState = {
  fromField: {
    value: '',
    valueDecimals: '',
    selectedToken: tokensID.firstTokenSwap
  },
  toField: {
    value: '',
    selectedToken: tokensID.jeet,
    valueDecimals: ''
  },
  normalDirection: true,
  rate: 0,
  slipage: 5
};

export const swapAggregator = createSlice({
  name: 'swap-aggregator',
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    changeFromFieldToken: (state, action: PayloadAction<string>) => {
      state.fromField.selectedToken = action.payload;
    },
    changeToFieldToken: (state, action: PayloadAction<string>) => {
      state.toField.selectedToken = action.payload;
    },
    onChageFromFieldValue: (state, action: PayloadAction<string>) => {
      state.fromField.value = action.payload;
    },
    onChageFromFieldValueDecimals: (state, action: PayloadAction<string>) => {
      state.fromField.valueDecimals = action.payload;
    },
    onChangeToField: (state, action: PayloadAction<string>) => {
      state.toField.value = action.payload;
    },
    onChangeToFieldValueDecimals: (state, action: PayloadAction<string>) => {
      state.toField.valueDecimals = action.payload;
    },
    onSwapFields: (state) => {
      const from = current(state.fromField);
      const to = current(state.toField);

      state.fromField.selectedToken = to.selectedToken;
      state.fromField.value = to.value;
      state.fromField.valueDecimals = to.valueDecimals;

      state.toField.selectedToken = from.selectedToken;

      state.normalDirection = !state.normalDirection;
    },

    onChangeSlippage: (state, action: PayloadAction<number>) => {
      state.slipage = action.payload;
    }
  }
});

export const selectFromFieldValue = (state: AppState) =>
  state.swap.fromField.value;
export const selectFromFieldValueDecimals = (state: AppState) =>
  state.swap.fromField.valueDecimals;
export const selectFromFieldSelectedToken = (state: AppState) =>
  state.swap.fromField.selectedToken;
export const selectToFieldValue = (state: AppState) => state.swap.toField.value;
export const selectToFieldSelectedToken = (state: AppState) =>
  state.swap.toField.selectedToken;
export const selectNormalDirection = (state: AppState) =>
  state.swap.normalDirection;

export const selectFromField = (state: AppState) => state.swap.fromField;
export const selectToField = (state: AppState) => state.swap.toField;
export const selectSlippage = (state: AppState) => state.swap.slipage;

export const {
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  changeFromFieldToken,
  changeToFieldToken,
  setRate,
  onChangeToFieldValueDecimals,
  onSwapFields,
  onChangeSlippage
} = swapAggregator.actions;
export default swapAggregator.reducer;