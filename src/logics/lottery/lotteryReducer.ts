import { tLotteryActionTypes, tLotteryActions, tLotteryState } from './lotteryTypes';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import {
  lotteryInitializeOperator,
  lotteryInitializePlayer,
  lotteryLoadTicketList,
  lotteryStoreOperator,
  lotteryStorePlayer,
} from './lotteryMiddlewares';

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
      // initalize operator too to budget changes
      const users = { player: lotteryInitializePlayer(), operator: lotteryInitializeOperator() };
      state = {
        ...state,
        player: users.player,
        operator: users.operator,
        ticketList: lotteryLoadTicketList(users.player.id, 'created-desc', '1'),
      };
      return state;

    // unset player data
    case tLotteryActionTypes.lotteryUnsetPlayer:
      state = {
        ...state,
        player: lotteryInitialState.player,
        operator: lotteryInitialState.operator,
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
      // storing player data with new name
      lotteryStorePlayer(state.player);
      return state;

    // set payment and reload ticket list
    case tLotteryActionTypes.lotterySetPlayerTicketPayment:
      state = {
        ...state,
        operator: {
          ...state.operator,
          budget: {
            [lotterySettings.defaultCurrency]:
              state.operator.budget[lotterySettings.defaultCurrency] + lotterySettings.gamePrice,
          },
        },
        ticketList: lotteryLoadTicketList(state.player.id, state.ticketList.order, '1'),
      };
      // storing operator data with new budget
      lotteryStoreOperator(state.operator);
      return state;

    // set ticket list
    case tLotteryActionTypes.lotterySetList:
      state = {
        ...state,
        ticketList: lotteryLoadTicketList(
          action.payload.playerId,
          action.payload.order,
          action.payload.page,
        ),
      };
      return state;

    // reset game
    case tLotteryActionTypes.lotteryResetGame:
      state = {
        ...state,
        player: {
          ...state.player,
          budget: lotteryInitialState.player.budget,
        },
        operator: {
          ...state.operator,
          budget: lotteryInitialState.operator.budget,
        },
        ticketList: lotteryInitialState.ticketList,
      };
      return state;

    // set new round in game
    case tLotteryActionTypes.lotterySetNewRound:
      state = {
        ...state,
        ticketList: lotteryInitialState.ticketList,
      };
      return state;

    default:
      return state;
  }
};
