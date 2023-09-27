import { tActionMap, tListView } from '../general/types';

// Types of lottery local storages
export enum tLotteryLocalStorages {
  listView = 'LotteryListViewr',
  player = 'LotteryPlayer',
  operator = 'LotteryOperator',
  tickets = 'LotteryTickets',
}

// Type of lottery ticket
export type tLotteryTicket = {
  id: string;
  playerId: string;
  created: string;
  numbers: { value: number; match: boolean }[];
  matches: number;
  prize: number;
  played: boolean;
};

// Type of state of lottery
export type tLotteryState = {
  status: 'idle' | 'loading';
  player: {
    id: string;
    name: string;
    budget: number;
    totalPrize: number;
  };
  operator: {
    id: string;
    budget: number;
    statementData: {
      drawnNumbers: number[];
      match5: { players: number; playerPayment: number; totalPayment: number };
      match4: { players: number; playerPayment: number; totalPayment: number };
      match3: { players: number; playerPayment: number; totalPayment: number };
      match2: { players: number; playerPayment: number; totalPayment: number };
      noPrizeTickets: number;
      totalIncome: number;
      totalPayment: number;
      totalProfit: number;
    };
  };
  ticketList: {
    played: boolean;
    listView: tListView;
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
  lotterySetPlayerTicketPayment = 'lotterySetPlayerTicketPayment',
  lotterySetListView = 'lotterySetListView',
  lotterySetList = 'lotterySetList',
  lotteryResetGame = 'lotteryResetGame',
  lotterySetNewRound = 'lotterySetNewRound',
  lotterySetAutoTickets = 'lotterySetAutoTickets',
}

// Types of payloads of lottery actions
type tLotteryPayload = {
  [tLotteryActionTypes.lotterySetStatus]: tLotteryState['status'];
  [tLotteryActionTypes.lotterySetPlayer]: undefined;
  [tLotteryActionTypes.lotteryUnsetPlayer]: undefined;
  [tLotteryActionTypes.lotterySetOperator]: tLotteryState['operator'];
  [tLotteryActionTypes.lotteryUnsetOperator]: undefined;
  [tLotteryActionTypes.lotterySetPlayerName]: tLotteryState['player']['name'];
  [tLotteryActionTypes.lotterySetPlayerTicketPayment]: undefined;
  [tLotteryActionTypes.lotterySetListView]: tLotteryState['ticketList']['listView'];
  [tLotteryActionTypes.lotterySetList]: {
    playerId: tLotteryState['player']['id'];
    order: tLotteryState['ticketList']['order'];
    page: tLotteryState['ticketList']['page'];
  };
  [tLotteryActionTypes.lotteryResetGame]: undefined;
  [tLotteryActionTypes.lotterySetNewRound]: undefined;
  [tLotteryActionTypes.lotterySetAutoTickets]: string;
};

// Types of lottery actions
export type tLotteryActions = tActionMap<tLotteryPayload>[keyof tActionMap<tLotteryPayload>];
