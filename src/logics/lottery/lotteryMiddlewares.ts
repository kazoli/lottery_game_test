import { tLotteryLocalStorages, tLotteryState, tLotteryTicket } from './lotteryTypes';
import { settings } from '../general/initialStates';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import {
  formatDate,
  generateRandomDistinctNumbers,
  getLocalStorage,
  numberArrayReorder,
  objectArrayReorder,
  setLocalStorage,
} from '../general/middlewares';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';

// Initializing player data
export const lotteryInitializePlayer = () => {
  const storedPlayer = getLocalStorage(tLotteryLocalStorages.player) as
    | null
    | tLotteryState['player'];
  // check player existed before
  if (storedPlayer && storedPlayer.id) {
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
  if (storedOperator && storedOperator.id) {
    return storedOperator;
  } else {
    const newOperator = { ...lotteryInitialState.operator };
    // creating an id to new operator
    newOperator.id = uuidV4();
    // storing the new operator in the local storage
    lotteryStoreOperator(newOperator);
    return newOperator;
  }
};

// Storing new operator data into local storage
export const lotteryStoreOperator = (operator: tLotteryState['operator']) => {
  setLocalStorage(tLotteryLocalStorages.operator, operator);
};

// Get all lottery tickets from local storage
const lotteryGetAllTickets = () => {
  return (getLocalStorage(tLotteryLocalStorages.tickets) ?? []) as tLotteryTicket[];
};

// Initializing ticket list
export const lotteryLoadTicketList = (
  playerId: tLotteryState['player']['id'],
  order: tLotteryState['ticketList']['order'],
  page: tLotteryState['ticketList']['page'],
) => {
  const ticketList: tLotteryState['ticketList'] = { ...lotteryInitialState.ticketList };
  // loading all tickets from the local storage (as like from a db)
  ticketList.tickets = lotteryGetAllTickets();
  // total results set base value
  ticketList.totalResults = ticketList.tickets.length;
  // entering onyl if there is a ticket at least
  if (ticketList.totalResults) {
    // currently if 1 ticket is played in a drawn, then all tickets too
    ticketList.played = ticketList.tickets[0].played;
    // if player id was not empty
    if (playerId) {
      // filtering player's tickets from all tickets
      ticketList.tickets = ticketList.tickets.filter((ticket) => ticket.playerId === playerId);
      // recalculate total results with player ticket max number
      ticketList.totalResults = ticketList.tickets.length;
    }
    // set order to return array
    ticketList.order = order;
    // split order to reordering
    const splittedOrder = order.split('-');
    // reordering according to the order
    ticketList.tickets = objectArrayReorder(
      ticketList.tickets,
      splittedOrder[0] as keyof tLotteryTicket,
      splittedOrder[1],
    );
    // set order to return array
    ticketList.page = page;
    // paginator values
    const paginator = {
      currentPage: parseInt(page),
      itemsPerPage: 60,
      startIndex: 0,
      maxIndex: ticketList.totalResults - 1,
    };
    // get start index based on page number
    paginator.startIndex = (paginator.currentPage - 1) * paginator.itemsPerPage;
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
export const lotteryProcessTickets = (
  playerId: tLotteryState['player']['id'],
  numberBlocks: number[][],
) => {
  // creating ticket objects
  const tickets: tLotteryTicket[] = numberBlocks.map((numbers) => ({
    id: uuidV4(),
    playerId: playerId,
    created: formatDate(settings.systemDateFormat, new Date()),
    numbers: numberArrayReorder(numbers).map((number) => ({ value: number, match: false })),
    matches: 0,
    played: false,
  }));
  // getting previous tickets from local storage
  const storedTickets = (getLocalStorage(tLotteryLocalStorages.tickets) ?? []) as tLotteryTicket[];
  // merge new tickets to local storage too
  lotteryStoreTickets([...storedTickets, ...tickets]);
  // return tickets
  return tickets;
};

// Storing new data of tickets into local storage
export const lotteryStoreTickets = (tickets: tLotteryState['ticketList']['tickets']) => {
  setLocalStorage(tLotteryLocalStorages.tickets, tickets);
};

// Generating auto tickets
export const lotteryGenerateAutoTickets = (ticketNumber: string) => {
  const ticketNumberInt = parseInt(ticketNumber);
  const distinctionChecker: { [key: string]: null } = {};
  const numberBlocks: number[][] = [];
  do {
    // generate a number array
    const numbers = generateRandomDistinctNumbers(
      lotterySettings.ticketStart,
      lotterySettings.ticketEnd,
      lotterySettings.ticketMaxNumbers,
    );
    const stringNumbers = numbers.toString();
    if (distinctionChecker[stringNumbers] === undefined) {
      distinctionChecker[stringNumbers] = null;
      numberBlocks.push(numbers);
    }
  } while (numberBlocks.length < ticketNumberInt);
  // store newly generated lottery tickets into local storage
  lotteryProcessTickets('', numberBlocks);
};

// Drawing lottery numbers
export const lotteryDrawNumbers = (operatorState: tLotteryState['operator']) => {
  // get all tickets from local storage
  const tickets = lotteryGetAllTickets();
  // enter only if there is ticket
  if (tickets.length) {
    // clone operator from state
    const operator = { ...operatorState };
    // generate a drawn number array
    const drawnNumbers = generateRandomDistinctNumbers(
      lotterySettings.ticketStart,
      lotterySettings.ticketEnd,
      lotterySettings.ticketMaxNumbers,
    );
    // loop through each tickets
    tickets.forEach((ticket) => {
      // loop through each drawn number
      drawnNumbers.forEach((drawnNumber) => {
        // loop through numbers of ticket
        ticket.numbers.forEach((ticketNumber) => {
          // if the ticket number matches the drawn number, then marks it as matched number
          if (ticketNumber.value === drawnNumber) {
            // number is marked as match
            ticketNumber.match = true;
            // count of matches
            ticket.matches++;
          }
        });
      });
    });
    console.log(operator);
    console.log(drawnNumbers);
    console.log(tickets);
  } else {
    // no ticket therefore, shows an error message
    toast.warning('There is no ticket to draw', {
      toastId: 'noTicketDraw',
    });
  }
};
