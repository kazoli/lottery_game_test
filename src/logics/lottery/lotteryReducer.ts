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
    case tLotteryActionTypes.lotterySetName:
      state = {
        ...state,
        player: {
          ...state.player,
          name: action.payload,
        },
      };
      return state;
    default:
      return state;
  }
};
