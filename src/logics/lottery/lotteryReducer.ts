import { tLotteryActionTypes, tLotteryActions, tLotteryState } from './lotteryTypes';
import {
  lotteryInitializeOperator,
  lotteryInitializePlayer,
  lotteryLoadTicketList,
  lotteryStorePlayer,
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
      const player = lotteryInitializePlayer();
      state = {
        ...state,
        player: player,
        ticketList: lotteryLoadTicketList(player.id, 'created-desc', '1'),
      };
      return state;

    // unset player data
    case tLotteryActionTypes.lotteryUnsetPlayer:
      state = {
        ...state,
        player: lotteryInitialState.player,
        ticketList: lotteryInitialState.ticketList,
      };
      return state;

    // set operator data
    case tLotteryActionTypes.lotterySetOperator:
      const operator = lotteryInitializeOperator();
      state = {
        ...state,
        operator: operator,
        ticketList: lotteryLoadTicketList('', 'playerId-desc', '1'),
      };
      return state;

    // unset operator data
    case tLotteryActionTypes.lotteryUnsetOperator:
      state = {
        ...state,
        operator: lotteryInitialState.operator,
        ticketList: lotteryInitialState.ticketList,
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
        ticketList: {
          ...state.ticketList,
          tickets: [...action.payload, ...state.ticketList.tickets],
        },
      };
      return state;

    // set list order
    case tLotteryActionTypes.lotterySetListOrder:
      state = {
        ...state,
        ticketList: {
          ...state.ticketList,
          order: action.payload,
        },
      };
      return state;

    // set list page
    case tLotteryActionTypes.lotterySetListPage:
      state = {
        ...state,
        ticketList: {
          ...state.ticketList,
          page: action.payload,
        },
      };
      return state;

    default:
      return state;
  }
};
