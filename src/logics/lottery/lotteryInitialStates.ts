import { currencies } from '../general/types';
import { tLotterySettings, tLotteryState } from './lotteryTypes';

// Lottery settings
export const lotterySettings: tLotterySettings = {
  validation: { name: { minLength: 2, maxLength: 35 } },
  defaultCurrency: currencies.AKCSE,
  gamePrice: 500,
  playerBudget: 10000,
  operatorBudget: 0,
};

// Initial state of lottery
export const lotteryInitialState: tLotteryState = {
  status: 'idle',
  player: {
    id: '',
    name: 'Player',
    budget: { [currencies.AKCSE]: lotterySettings.playerBudget },
    tickets: [],
  },
  operator: { budget: { [currencies.AKCSE]: lotterySettings.operatorBudget } },
  tickets: [],
};
