import store from '@/redux/store';
import { IElrondToken } from '@/types/scTypes';
import { setElrondBalance } from '@/utils/mx-utils';
import {
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  onChangeToFieldValueDecimals
} from './swap-slice';

// Delete all this
export const handleSwap = () => {};

export const getSwapPairs = async () => {};

export const smartSwapRoutes = async () => {};

export const changeField = (
  value: string,
  onChangeFieldValue: (value: string) => {
    payload: string;
    type: string;
  },
  onChangeFieldValueDecimals: (valueDecimals: string) => {
    payload: string;
    type: string;
  },
  token?: IElrondToken
) => {
  if (token) {
    store.dispatch(onChangeFieldValue(value));

    const valueDecimals = setElrondBalance(value, token.decimals);

    store.dispatch(onChangeFieldValueDecimals(valueDecimals.toString()));
  }
};

export const clearInputs = () => {
  const dispatch = store.dispatch;
  dispatch(onChageFromFieldValue(''));
  dispatch(onChageFromFieldValueDecimals(''));
  dispatch(onChangeToFieldValueDecimals(''));
  dispatch(onChangeToField(''));
};

export const clearToInputs = () => {
  const dispatch = store.dispatch;

  dispatch(onChangeToFieldValueDecimals(''));
  dispatch(onChangeToField(''));
};
