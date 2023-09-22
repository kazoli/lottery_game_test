import { currencies, tActionMap } from '../general/types';

// Type of lottery settings
export type tLotterySettings = {
  dateFormat: string;
  defaultCurrency: currencies.AKCSE;
  gamePrice: number;
  ticketMaxSelectable: number;
  ticketStart: number;
  ticketEnd: number;
  playerBudget: number;
  operatorBudget: number;
  validation: { name: { minLength: number; maxLength: number } };
};

// Type of lottery budget
type tLotteryBudget = { [currencies.AKCSE]: number };

// Type of lottery ticket
export type tLotteryTicket = {
  playerId: string;
  created: string;
  numbers: { value: number; match: boolean }[];
  matches: number;
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
  lotterySetPlayerName = 'lotterySetPlayerName',
  lotterySetPlayerTicket = 'lotterySetPlayerTicket',
}

// Types of payloads of lottery actions
type tLotteryPayload = {
  [tLotteryActionTypes.lotterySetStatus]: tLotteryState['status'];
  [tLotteryActionTypes.lotterySetPlayer]: undefined;
  [tLotteryActionTypes.lotteryUnsetPlayer]: undefined;
  [tLotteryActionTypes.lotterySetPlayerName]: tLotteryState['player']['name'];
  [tLotteryActionTypes.lotterySetPlayerTicket]: number[];
};

// Types of lottery actions
export type tLotteryActions = tActionMap<tLotteryPayload>[keyof tActionMap<tLotteryPayload>];
