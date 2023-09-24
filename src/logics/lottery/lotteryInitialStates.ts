import { currencies, tDropDownOption } from '../general/types';
import { tLotteryState } from './lotteryTypes';

// Lottery settings
export const lotterySettings = {
  defaultCurrency: currencies.AKCSE,
  gamePrice: 500,
  ticketMaxSelectable: 5,
  ticketStart: 1,
  ticketEnd: 39,
  playerBudget: 10000,
  operatorBudget: 0,
  validation: { name: { minLength: 2, maxLength: 35 } },
};

// Initial state of lottery
export const lotteryInitialState: tLotteryState = {
  status: 'idle',
  player: {
    id: '',
    name: 'Player',
    budget: { [currencies.AKCSE]: lotterySettings.playerBudget },
  },
  operator: { id: '', budget: { [currencies.AKCSE]: lotterySettings.operatorBudget } },
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
  { key: 'playerId-asc', value: 'Auto first' },
  { key: 'playerId-desc', value: 'Player first' },
  { key: 'created-asc', value: 'Created increasing' },
  { key: 'created-desc', value: 'Created decreasing' },
];
