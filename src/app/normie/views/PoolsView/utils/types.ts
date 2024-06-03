import { IPairContractData } from '@/types/routerTypes';
import { IElrondToken } from '@/types/scTypes';

export interface IPoolPair extends IPairContractData {
  firstToken?: IElrondToken;
  secondToken?: IElrondToken;
  firstTokenJeetdexPrice?: number;
  ratio?: string;
}
