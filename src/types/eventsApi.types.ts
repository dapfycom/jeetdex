export interface ISwapInEventData {
  id?: number;
  caller: string;
  tokenIn: string;
  tokenAmountIn: string;
  tokenOut: string;
  tokenAmountOut: string;
  fee: string;
  tokenInReserve: string;
  tokenOutReserve: string;
  block: number;
  epoch: number;
  timestamp: number;
  username?: string;
}

export interface IPairCreatedEventData {
  id?: number;
  caller: string;
  firstToken: string;
  secondToken: string;
  address: string;
  date: string;
  txHash: string;
}

export interface IEventTransaction {
  id: string;
  token: string;
  tokenIn: string;
  tokenOut: string;
  tokenAmountIn: string;
  tokenAmountOut: string;
  timestamp: number;
  hash: null | string;
  caller: string;
  epoch: number;
  block: number;
}
