import { currencies, tActionMap } from '../general/types';

// Types of lottery local storages
export enum tLotteryLocalStorages {
  player = 'LotteryPlayer',
  operator = 'LotteryOperator',
  tickets = 'LotteryTickets',
}

// Type of lottery budget
type tLotteryBudget = { [currencies.AKCSE]: number };

// Type of lottery ticket
export type tLotteryTicket = {
  id: string;
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
  };
  operator: {
    id: string;
    budget: tLotteryBudget; // setting all currencies: { [C in currencies]: number })
  };
  ticketList: {
    played: boolean;
    order: string;
    page: string;
    isNextPage: boolean;
    totalResults: number;
    tickets: tLotteryTicket[];
  };
};

// Types of actions for lottery reducer
export enum tLotteryActionTypes {
  lotterySetStatus = 'lotterySetStatus',
  lotterySetPlayer = 'lotterySetPlayer',
  lotteryUnsetPlayer = 'lotteryUnsetPlayer',
  lotterySetOperator = 'lotterySetOperator',
  lotteryUnsetOperator = 'lotteryUnsetOperator',
  lotterySetPlayerName = 'lotterySetPlayerName',
  lotterySetPlayerTicket = 'lotterySetPlayerTicket',
  lotterySetListOrder = 'lotterySetListOrder',
  lotterySetListPage = 'lotterySetListPage',
}

// Types of payloads of lottery actions
type tLotteryPayload = {
  [tLotteryActionTypes.lotterySetStatus]: tLotteryState['status'];
  [tLotteryActionTypes.lotterySetPlayer]: undefined;
  [tLotteryActionTypes.lotteryUnsetPlayer]: undefined;
  [tLotteryActionTypes.lotterySetOperator]: undefined;
  [tLotteryActionTypes.lotteryUnsetOperator]: undefined;
  [tLotteryActionTypes.lotterySetPlayerName]: tLotteryState['player']['name'];
  [tLotteryActionTypes.lotterySetPlayerTicket]: tLotteryTicket[];
  [tLotteryActionTypes.lotterySetListOrder]: tLotteryState['ticketList']['order'];
  [tLotteryActionTypes.lotterySetListPage]: tLotteryState['ticketList']['page'];
};

// Types of lottery actions
export type tLotteryActions = tActionMap<tLotteryPayload>[keyof tActionMap<tLotteryPayload>];
