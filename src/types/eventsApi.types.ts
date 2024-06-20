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
}
