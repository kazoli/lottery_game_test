import { tDropDownOption } from '../general/types';
import { tLotteryState } from './lotteryTypes';

// Lottery settings
export const lotterySettings = {
  defaultCurrency: 'AKCSE',
  gamePrice: 500,
  playerBudget: 10000,
  operatorBudget: 0,
  ticketMaxNumbers: 5,
  ticketStart: 1,
  ticketEnd: 39,
  validation: { name: { minLength: 2, maxLength: 35 }, maxTicketNumber: 1000 },
};

// Initial state of lottery
export const lotteryInitialState: tLotteryState = {
  status: 'idle',
  player: {
    id: '',
    name: 'Player',
    budget: lotterySettings.playerBudget,
  },
  operator: {
    id: '',
    budget: lotterySettings.operatorBudget,
    statementData: {
      match5: { players: 0, playerPayment: 0, totalPayment: 0 },
      match4: { players: 0, playerPayment: 0, totalPayment: 0 },
      match3: { players: 0, playerPayment: 0, totalPayment: 0 },
      match2: { players: 0, playerPayment: 0, totalPayment: 0 },
      noPrizeTickets: 0,
      totalIncome: 0,
      totalPayment: 0,
      totalProfit: 0,
    },
  },
  ticketList: {
    played: false,
    order: 'created-desc',
    page: '1',
    isNextPage: false,
    totalResults: 0,
    tickets: [],
  },
};

// Player list order
export const lotteryPlayerListOrder: tDropDownOption[] = [
  { key: 'created-asc', value: 'Created increasing' },
  { key: 'created-desc', value: 'Created decreasing' },
];

// Operator list order
export const lotteryOperatorListOrder: tDropDownOption[] = [
  { key: 'playerId-asc', value: 'Auto tickets first' },
  { key: 'playerId-desc', value: 'Player tickets first' },
  { key: 'created-asc', value: 'Created increasing' },
  { key: 'created-desc', value: 'Created decreasing' },
  { key: 'matches-asc', value: 'Matches increasing' },
  { key: 'matches-desc', value: 'Matches decreasing' },
];
