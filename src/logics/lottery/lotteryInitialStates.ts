import { currencies } from '../general/types';
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
    addTicket: true,
    tickets: [],
  },
  operator: { id: '', budget: { [currencies.AKCSE]: lotterySettings.operatorBudget } },
  tickets: [],
};
