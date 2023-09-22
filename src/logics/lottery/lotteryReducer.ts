import { tLotteryActionTypes, tLotteryActions, tLotteryState } from './lotteryTypes';
import {
  lotteryInitializePlayer,
  lotteryStorePlayer,
  lotteryStorePlayerTicket,
} from './lotteryMiddlewares';
import { lotteryInitialState } from './lotteryInitialStates';

// Lottery reducer
export const lotteryReducer = (state: tLotteryState, action: tLotteryActions) => {
  switch (action.type) {
    // change status
    case tLotteryActionTypes.lotterySetStatus:
      state = {
        ...state,
        status: action.payload,
      };
      return state;

    // set player data
    case tLotteryActionTypes.lotterySetPlayer:
      state = {
        ...state,
        player: lotteryInitializePlayer(),
      };
      return state;

    // unset player data
    case tLotteryActionTypes.lotteryUnsetPlayer:
      state = {
        ...state,
        player: lotteryInitialState.player,
      };
      return state;

    // change name of player
    case tLotteryActionTypes.lotterySetPlayerName:
      state = {
        ...state,
        player: {
          ...state.player,
          name: action.payload,
        },
      };
      lotteryStorePlayer(state.player);
      return state;

    // set player's new ticket
    case tLotteryActionTypes.lotterySetPlayerTicket:
      state = {
        ...state,
        tickets: [...state.tickets, lotteryStorePlayerTicket(state.player.id, action.payload)],
      };
      return state;

    default:
      return state;
  }
};
