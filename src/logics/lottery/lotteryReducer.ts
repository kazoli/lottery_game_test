import { tLotteryActionTypes, tLotteryActions, tLotteryState } from './lotteryTypes';

// Lottery reducer
export const lotteryReducer = (state: tLotteryState, action: tLotteryActions) => {
  switch (action.type) {
    case tLotteryActionTypes.lotterySetStatus:
      state = {
        ...state,
        status: action.payload,
      };
      return state;
    default:
      return state;
  }
};
