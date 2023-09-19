import { tActionMap } from '../general/types';

// Type of state of lottery
export type tLotteryState = {
  status: 'idle' | 'loading';
};

// Types of actions for lottery reducer
export enum tLotteryActionTypes {
  lotterySetStatus = 'lotterySetStatus',
}

// Types of payloads of lottery actions
type tLotteryPayload = {
  [tLotteryActionTypes.lotterySetStatus]: tLotteryState['status'];
};

// Types of lottery actions
export type tLotteryActions = tActionMap<tLotteryPayload>[keyof tActionMap<tLotteryPayload>];
