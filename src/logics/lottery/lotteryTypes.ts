import { currencies, tActionMap } from '../general/types';

// Type of lottery settings
export type tLotterySettings = {
  validation: { name: { minLength: number; maxLength: number } };
  defaultCurrency: currencies.AKCSE;
  gamePrice: number;
  playerBudget: number;
  operatorBudget: number;
};

// Type of lottery budget
type tLotteryBudget = { [currencies.AKCSE]: number };

// Type of lottery ticket
type tLotteryTicket = {
  playerId: string;
  numbers: { value: number; matched: boolean }[];
  played: boolean;
};

// Type of state of lottery
export type tLotteryState = {
  status: 'idle' | 'loading';
  player: {
    id: string;
    name: string;
    budget: tLotteryBudget;
    tickets: tLotteryTicket[];
  };
  operator: { budget: tLotteryBudget }; // setting all currencies: { [C in currencies]: number })
  tickets: tLotteryTicket[];
};

// Types of actions for lottery reducer
export enum tLotteryActionTypes {
  lotterySetStatus = 'lotterySetStatus',
  lotterySetPlayer = 'lotterySetPlayer',
  lotteryUnsetPlayer = 'lotteryUnsetPlayer',
  lotterySetName = 'lotterySetName',
}

// Types of payloads of lottery actions
type tLotteryPayload = {
  [tLotteryActionTypes.lotterySetStatus]: tLotteryState['status'];
  [tLotteryActionTypes.lotterySetPlayer]: undefined;
  [tLotteryActionTypes.lotteryUnsetPlayer]: undefined;
  [tLotteryActionTypes.lotterySetName]: tLotteryState['player']['name'];
};

// Types of lottery actions
export type tLotteryActions = tActionMap<tLotteryPayload>[keyof tActionMap<tLotteryPayload>];
