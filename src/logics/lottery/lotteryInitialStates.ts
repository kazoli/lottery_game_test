import { currencies } from '../general/types';
import { tLotterySettings, tLotteryState } from './lotteryTypes';
import { lotteryInitializeUserData } from './lotteryMiddlewares';

// Initial state of lottery settings
export const lotterySettings: tLotterySettings = {
  validation: { name: { minLength: 2, maxLength: 35 } },
  defaultCurrency: currencies.AKCSE,
  gamePrice: 500,
  player: { name: 'Player', budget: { [currencies.AKCSE]: 10000 } },
  operator: { budget: { [currencies.AKCSE]: 0 } },
};

// Initial state of lottery
export const lotteryInitialState: tLotteryState = {
  status: 'idle',
  player: lotteryInitializeUserData('player'),
  operator: lotteryInitializeUserData('operator'),
};
