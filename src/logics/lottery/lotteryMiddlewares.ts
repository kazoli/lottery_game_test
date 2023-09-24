import { tLotteryLocalStorages, tLotteryState, tLotteryTicket } from './lotteryTypes';
import { settings } from '../general/initialStates';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import { arrayReorder, formatDate, getLocalStorage, setLocalStorage } from '../general/middlewares';
import { validateText } from '../general/validations';
import { v4 as uuidV4 } from 'uuid';

// Validating name
export const lotteryValidatePlayer = (formData: { name: string }, labels: { name: string }) => {
  const errors = { name: '' };
  errors.name = validateText(
    labels.name,
    formData.name,
    lotterySettings.validation.name.minLength,
    lotterySettings.validation.name.maxLength,
  );
  return errors;
};

// Initializing player data
export const lotteryInitializePlayer = () => {
  const storedPlayer = getLocalStorage(tLotteryLocalStorages.player) as
    | null
    | tLotteryState['player'];
  // check player existed before
  if (storedPlayer) {
    return storedPlayer;
  } else {
    const newPlayer = { ...lotteryInitialState.player };
    // creating an id to new player
    newPlayer.id = uuidV4();
    // storing the new player in local storage
    lotteryStorePlayer(newPlayer);
    return newPlayer;
  }
};

// Storing new player data into local storage
export const lotteryStorePlayer = (player: tLotteryState['player']) => {
  setLocalStorage(tLotteryLocalStorages.player, player);
};

// Initializing operator data
export const lotteryInitializeOperator = () => {
  const storedOperator = getLocalStorage(tLotteryLocalStorages.operator) as
    | null
    | tLotteryState['operator'];
  // check operator existed before
  if (storedOperator) {
    return storedOperator;
  } else {
    const newOperator = { ...lotteryInitialState.player };
    // creating an id to new operator
    newOperator.id = uuidV4();
    // storing the new operator in the local storage
    setLocalStorage(tLotteryLocalStorages.operator, newOperator);
    return newOperator;
  }
};

// Initializing ticket list
export const lotteryLoadTicketList = (
  playerId: tLotteryState['player']['id'],
  order: tLotteryState['ticketList']['order'],
  page: tLotteryState['ticketList']['page'],
) => {
  const ticketList: tLotteryState['ticketList'] = { ...lotteryInitialState.ticketList };
  // loading all tickets from the local storage (as like from a db)
  ticketList.tickets = (getLocalStorage(tLotteryLocalStorages.tickets) ?? []) as tLotteryTicket[];
  // total count set base value
  ticketList.totalResults = ticketList.tickets.length;
  // entering onyl if there is a ticket at least
  if (ticketList.totalResults) {
    // checking out tickets were played so actions need to block
    ticketList.played = !!ticketList.tickets.find((ticket) => ticket.played);
    // if player id was not empty
    if (playerId) {
      // filtering player's tickets from all tickets
      ticketList.tickets = ticketList.tickets.filter((ticket) => ticket.playerId === playerId);
      // recalculate total count by player ticket max number
      ticketList.totalResults = ticketList.tickets.length;
    }
    // set order to return array
    ticketList.order = order;
    // split order to reordering
    const splittedOrder = order.split('-');
    // reordering according to the order
    ticketList.tickets = arrayReorder(
      ticketList.tickets,
      splittedOrder[0] as keyof tLotteryTicket,
      splittedOrder[1],
    );
    // paginator values
    const paginator = {
      currentPage: parseInt(page),
      itemsPerPage: 480,
      startIndex: 0,
      maxIndex: ticketList.totalResults - 1,
    };
    // get start index based on page number
    paginator.startIndex = (paginator.currentPage - 1) * paginator.itemsPerPage;
    // handle fall back if page is over the max pages
    if (paginator.startIndex > paginator.maxIndex) {
      // falling back to first page
      paginator.startIndex = 0;
      // set back page to default 1st page
      ticketList.page = '1';
      // send a warning message about fall back
      // TODO ticketList.message = 'Redirect to first page because requested page cannot be found';
    }
    // check out next page exists
    ticketList.isNextPage = paginator.startIndex + paginator.itemsPerPage < ticketList.totalResults;
    // get the part of the array according to paginator values
    ticketList.tickets = ticketList.tickets.slice(
      paginator.startIndex,
      paginator.startIndex + paginator.itemsPerPage,
    );
  }
  return ticketList;
};

// Storing data of created tickets
export const lotteryStoreTicket = (
  playerId: tLotteryState['player']['id'],
  numberBlocks: number[][],
) => {
  // creating ticket objects
  const tickets: tLotteryTicket[] = numberBlocks.map((numbers) => ({
    id: uuidV4(),
    playerId: playerId,
    created: formatDate(settings.systemDateFormat, new Date()),
    numbers: numbers.sort((a, b) => a - b).map((number) => ({ value: number, match: false })),
    matches: 0,
    played: false,
  }));
  // getting previous tickets from local storage
  const storedTickets = (getLocalStorage(tLotteryLocalStorages.tickets) ?? []) as tLotteryTicket[];
  // merge new tickets to local storage too
  setLocalStorage(tLotteryLocalStorages.tickets, [...storedTickets, ...tickets]);
  // return tickets
  return tickets;
};
