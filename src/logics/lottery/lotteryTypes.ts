import { currencies, tActionMap } from '../general/types';

// Type of lottery budget
type tLotteryBudget = { [C in currencies]: number };

// Type of lottery settings
export type tLotterySettings = {
  validation: { name: { minLength: number; maxLength: number } };
  defaultCurrency: currencies.AKCSE;
  gamePrice: number;
  player: { name: string; budget: tLotteryBudget };
  operator: { budget: tLotteryBudget };
};

// Type of state of lottery
export type tLotteryState = Pick<tLotterySettings, 'player' | 'operator'> & {
  status: 'idle' | 'loading';
};

// Types of actions for lottery reducer
export enum tLotteryActionTypes {
  lotterySetStatus = 'lotterySetStatus',
  lotterySetName = 'lotterySetName',
}

// Types of payloads of lottery actions
type tLotteryPayload = {
  [tLotteryActionTypes.lotterySetStatus]: tLotteryState['status'];
  [tLotteryActionTypes.lotterySetName]: tLotteryState['player']['name'];
};

// Types of lottery actions
export type tLotteryActions = tActionMap<tLotteryPayload>[keyof tActionMap<tLotteryPayload>];
