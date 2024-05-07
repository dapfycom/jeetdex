import {
  ISortOrder,
  ITransacation,
  ITransactionStatuts
} from '@/types/scTypes';
import mxApi from '.';

export interface IFetchTransactionParams {
  from?: number;
  size?: number;
  sender?: string;
  receiver?: string;
  token?: string;
  senderShard?: number;
  receiverShard?: number;
  miniBlockHash?: string;
  hashes?: string;
  status?: ITransactionStatuts;
  function?: string;
  before?: number;
  after?: number;
  order?: ISortOrder;
  fields?: string;
  withScResults?: boolean;
  withOperations?: boolean;
  withLogs?: boolean;
  withScamInfo?: boolean;
  withUsername?: boolean;
  withBlockInfo?: boolean;
}
export const fetchTransactions = async (
  params?: IFetchTransactionParams
): Promise<ITransacation[]> => {
  const res = await mxApi.get<ITransacation[]>('/transactions', {
    params: params
  });
  return res.data;
};

export const fetchTransactionByHash = async (
  txHash: string
): Promise<ITransacation> => {
  const res = await mxApi.get<ITransacation>(`/transactions/${txHash}`);
  return res.data;
};

export const fetchTransfers = async (
  params?: IFetchTransactionParams
): Promise<ITransacation[]> => {
  const res = await mxApi.get<ITransacation[]>('/transfers', {
    params: params
  });
  return res.data;
};
