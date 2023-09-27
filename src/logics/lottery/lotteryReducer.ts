import {
  tLotteryActionTypes,
  tLotteryActions,
  tLotteryLocalStorages,
  tLotteryState,
} from './lotteryTypes';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import { setLocalStorage } from '../general/middlewares';
import {
  lotteryInitializeOperator,
  lotteryInitializePlayer,
  lotteryLoadTicketList,
  lotteryStoreOperator,
  lotteryStorePlayer,
  lotteryStoreTickets,
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
        ticketList: lotteryLoadTicketList(users.player.id, 'created-desc', state.ticketList.page),
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
      state = {
        ...state,
        operator: action.payload,
        ticketList: lotteryLoadTicketList('', 'playerId-desc', state.ticketList.page),
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
        player: {
          ...state.player,
          budget: state.player.budget - lotterySettings.gamePrice,
        },
        operator: {
          ...state.operator,
          budget: state.operator.budget + lotterySettings.gamePrice,
          statementData: {
            ...state.operator.statementData,
            totalIncome: state.operator.statementData.totalIncome + lotterySettings.gamePrice,
            totalProfit: state.operator.statementData.totalProfit + lotterySettings.gamePrice,
            noPrizeTickets: state.operator.statementData.noPrizeTickets + 1,
          },
        },
        ticketList: lotteryLoadTicketList(state.player.id, state.ticketList.order, '1'),
      };
      // storing player new data
      lotteryStorePlayer(state.player);
      // storing operator new data
      lotteryStoreOperator(state.operator);
      return state;

    // set ticket list view
    case tLotteryActionTypes.lotterySetListView:
      state = {
        ...state,
        ticketList: {
          ...state.ticketList,
          listView: action.payload,
        },
      };
      // strore list view in local storage
      setLocalStorage(tLotteryLocalStorages.listView, action.payload);
      return state;

    // set ticket list
    case tLotteryActionTypes.lotterySetList:
      state = {
        ...state,
        status: lotteryInitialState.status,
        ticketList: lotteryLoadTicketList(
          action.payload.playerId,
          action.payload.order,
          action.payload.page,
        ),
      };
      return state;

    // reset game
    case tLotteryActionTypes.lotteryResetGame:
      // storing operator initial data
      lotteryStoreOperator(lotteryInitialState.operator);
      // storing player initial data
      lotteryStorePlayer(lotteryInitialState.player);
      // storing initial data of tickets
      lotteryStoreTickets(lotteryInitialState.ticketList.tickets);
      // reset state too
      state = {
        ...state,
        player: lotteryInitialState.player,
        operator: lotteryInitializeOperator(), // reintialize operator
        ticketList: lotteryInitialState.ticketList,
      };
      return state;

    // set new round in game
    case tLotteryActionTypes.lotterySetNewRound:
      state = {
        ...state,
        operator: {
          ...state.operator,
          statementData: lotteryInitialState.operator.statementData,
        },
        ticketList: lotteryInitialState.ticketList,
      };
      // storing new state of tickets
      lotteryStoreTickets(state.ticketList.tickets);
      // storing operator's new state
      lotteryStoreOperator(state.operator);
      // load player from local storage
      const player = lotteryInitializePlayer();
      // set player prize to initial value
      player.totalPrize = lotteryInitialState.player.totalPrize;
      // storing player's new state
      lotteryStorePlayer(player);
      return state;

    // set lottery auto tickets
    case tLotteryActionTypes.lotterySetAutoTickets:
      const ticketNumber = parseInt(action.payload);
      const totalGamePrice = lotterySettings.gamePrice * ticketNumber;
      state = {
        ...state,
        status: lotteryInitialState.status,
        operator: {
          ...state.operator,
          budget: state.operator.budget + totalGamePrice,
          statementData: {
            ...state.operator.statementData,
            totalIncome: state.operator.statementData.totalIncome + totalGamePrice,
            totalProfit: state.operator.statementData.totalProfit + totalGamePrice,
            noPrizeTickets: state.operator.statementData.noPrizeTickets + ticketNumber,
          },
        },
        ticketList: lotteryLoadTicketList(
          state.player.id,
          state.ticketList.order,
          state.ticketList.page,
        ),
      };
      // storing operator data with new data
      lotteryStoreOperator(state.operator);
      return state;

    default:
      return state;
  }
};
