import { tDropDownOption } from '../general/types';
import { tLotteryState } from './lotteryTypes';

// Lottery settings
export const lotterySettings = {
  defaultCurrency: 'AKCSE',
  gamePrice: 500,
  playerBudget: 10000,
  operatorBudget: 0,
  prizes: {
    match5: { incomePercent: 0.15 },
    match4: { incomePercent: 0.15, playerMaxToMatch5: 0.2 },
    match3: { incomePercent: 0.35, playerMaxToMatch5: 0.015 },
    match2: { incomePercent: 0.3, playerMaxToMatch5: 0.001 },
  },
  ticketMaxNumbers: 5,
  ticketStart: 1,
  ticketEnd: 39,
  validation: { name: { minLength: 2, maxLength: 35 }, maxTicketNumber: 5000 },
};

// Initial state of lottery
export const lotteryInitialState: tLotteryState = {
  status: 'idle',
  player: {
    id: '',
    name: 'Player',
    budget: lotterySettings.playerBudget,
    totalPrize: 0,
  },
  operator: {
    id: '',
    budget: lotterySettings.operatorBudget,
    statementData: {
      drawnNumbers: [],
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
    listView: 'grid',
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
  { key: 'prize-asc', value: 'Prize increasing' },
  { key: 'prize-desc', value: 'Prize decreasing' },
];
