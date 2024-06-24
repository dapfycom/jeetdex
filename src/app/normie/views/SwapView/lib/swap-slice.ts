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
  poolPair: string;

  isOPenChats: boolean;
  isOpenCharts: boolean;
  isOpenTokenSocials: boolean;
  isOpenTokenHolders: boolean;
}

const initialState: SwapState = {
  fromField: {
    value: '',
    valueDecimals: '',
    selectedToken: tokensID.wegld
  },
  toField: {
    value: '',
    selectedToken: tokensID.bsk,
    valueDecimals: ''
  },
  normalDirection: false,
  rate: 0,
  poolPair: '',
  isOpenCharts: true,
  isOPenChats: true,
  isOpenTokenSocials: true,
  isOpenTokenHolders: true
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

    onChangePoolPair: (state, action: PayloadAction<string>) => {
      state.poolPair = action.payload;
    },
    onChangeDirection: (state, action: PayloadAction<boolean>) => {
      state.normalDirection = action.payload;
    },

    onToggleChats: (state) => {
      state.isOPenChats = !state.isOPenChats;
    },

    OnToggleCharts: (state) => {
      state.isOpenCharts = !state.isOpenCharts;
    },
    OnToggleTokenSocials: (state) => {
      state.isOpenTokenSocials = !state.isOpenTokenSocials;
    },
    OnToggleTokenHolders: (state) => {
      state.isOpenTokenHolders = !state.isOpenTokenHolders;
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
export const selectPoolPair = (state: AppState) => state.swap.poolPair;

export const selectIsOpenChats = (state: AppState) => state.swap.isOPenChats;
export const selectIsOpenCharts = (state: AppState) => state.swap.isOpenCharts;
export const selectIsOpenTokenSocials = (state: AppState) =>
  state.swap.isOpenTokenSocials;
export const selectIsOpenTokenHolders = (state: AppState) =>
  state.swap.isOpenTokenHolders;

export const {
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  changeFromFieldToken,
  changeToFieldToken,
  setRate,
  onChangeToFieldValueDecimals,
  onSwapFields,
  onChangePoolPair,
  onChangeDirection,
  onToggleChats,
  OnToggleCharts,
  OnToggleTokenSocials,
  OnToggleTokenHolders
} = swapAggregator.actions;
export default swapAggregator.reducer;
