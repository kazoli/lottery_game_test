import { tLotteryLocalStorages, tLotteryState, tLotteryTicket } from './lotteryTypes';
import { settings } from '../general/initialStates';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import {
  formatDate,
  generateRandomDistinctNumbers,
  getLocalStorage,
  objectArrayReorder,
  setLocalStorage,
  storageMaxLengthExceeded,
} from '../general/middlewares';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';

// Initializing player data
export const lotteryInitializePlayer = () => {
  const storedPlayer = getLocalStorage(tLotteryLocalStorages.player) as
    | null
    | tLotteryState['player'];
  // checking out that player existed before
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
  // checking out that operator existed before
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

// Getting all lottery tickets from the local storage
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
  // setting base value of total results
  ticketList.totalResults = ticketList.tickets.length;
  // setting base value of list view
  ticketList.listView = (getLocalStorage(tLotteryLocalStorages.listView) ??
    lotteryInitialState.ticketList.listView) as tLotteryState['ticketList']['listView'];
  // entering onyl if there is a ticket at least
  if (ticketList.totalResults) {
    // currently if 1 ticket is played in a drawn, then all tickets too
    ticketList.played = ticketList.tickets[0].played;
    // if player id was not empty
    if (playerId) {
      // filtering player's tickets from all tickets
      ticketList.tickets = ticketList.tickets.filter((ticket) => ticket.playerId === playerId);
      // getting total results from number of player's tickets
      ticketList.totalResults = ticketList.tickets.length;
    }
    // setting order to return array
    ticketList.order = order;
    // splitting order to reordering
    const splittedOrder = order.split('-');
    // reordering according to the order
    objectArrayReorder(
      ticketList.tickets,
      splittedOrder[0] as keyof tLotteryTicket,
      splittedOrder[1],
    );
    // adding current page to return array
    ticketList.page = page;
    // paginator values
    const paginator = {
      currentPage: parseInt(page),
      itemsPerPage: 60,
      startIndex: 0,
      endIndex: 0,
      maxIndex: ticketList.totalResults - 1,
    };
    // getting start index based on page number
    paginator.startIndex = (paginator.currentPage - 1) * paginator.itemsPerPage;
    // calculating last index of current item range
    paginator.endIndex = paginator.startIndex + paginator.itemsPerPage;
    // checking out next page exists
    ticketList.isNextPage = paginator.endIndex < ticketList.totalResults;
    // getting the part of the array according to paginator values
    ticketList.tickets = ticketList.tickets.slice(paginator.startIndex, paginator.endIndex);
  }
  return ticketList;
};

// Storing data of created tickets
export const lotteryProcessTickets = (
  playerId: tLotteryState['player']['id'],
  numberBlocks: number[][],
) => {
  // generating created date
  const created = formatDate(settings.systemDateFormat, new Date());
  // creating ticket objects
  const tickets: tLotteryTicket[] = numberBlocks.map((numbers) => ({
    id: uuidV4(),
    playerId: playerId,
    created: created,
    numbers: numbers.map((number) => ({ value: number, match: false })),
    matches: 0,
    prize: 0,
    played: false,
  }));
  // getting previous tickets from local storage
  const storedTickets = (getLocalStorage(tLotteryLocalStorages.tickets) ?? []) as tLotteryTicket[];
  // checking out storage max length
  if (storageMaxLengthExceeded([...storedTickets, ...tickets])) {
    // showing an error message
    toast.warning(
      'The number of lottery tickets in local storage exceeded the maximum allowed value so they could not be created',
    );
    return false;
  } else {
    // merging new tickets to local storage too
    lotteryStoreTickets([...storedTickets, ...tickets]);
    return true;
  }
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
    // generating a number array
    const numbers = generateRandomDistinctNumbers(
      lotterySettings.ticketStart,
      lotterySettings.ticketEnd,
      lotterySettings.ticketMaxNumbers,
    );
    // converting to string to check out the existence in this generation round
    const stringNumbers = numbers.toString();
    if (distinctionChecker[stringNumbers] === undefined) {
      distinctionChecker[stringNumbers] = null;
      numberBlocks.push(numbers);
    }
  } while (numberBlocks.length < ticketNumberInt);
  // storing newly generated lottery tickets into local storage
  return lotteryProcessTickets('', numberBlocks);
};

// Drawing lottery numbers
export const lotteryDrawNumbers = () => {
  // getting all tickets from local storage
  const tickets = lotteryGetAllTickets();
  // entering only if there is one ticket at least
  if (tickets.length) {
    // getting player data
    const player = lotteryInitializePlayer();
    // getting operator data
    const operator = lotteryInitializeOperator();
    // resetting unwinning ticket number because it was counted at the adding of every new ticket
    operator.statementData.noPrizeTickets = 0;
    // generating a drawn number array and storing into operator statement data
    operator.statementData.drawnNumbers = generateRandomDistinctNumbers(
      lotterySettings.ticketStart,
      lotterySettings.ticketEnd,
      lotterySettings.ticketMaxNumbers,
    );
    // looping through each tickets
    tickets.forEach((ticket, index1) => {
      // setting played true
      tickets[index1].played = true;
      // looping through each drawn number
      operator.statementData.drawnNumbers.forEach((drawnNumber) => {
        // looping through numbers of ticket
        ticket.numbers.every((ticketNumber, index2) => {
          // if the ticket number matches the drawn number, then marks it as a matched number
          if (ticketNumber.value === drawnNumber) {
            // number is marked as matched
            tickets[index1].numbers[index2].match = true;
            // counting of matches
            tickets[index1].matches++;
            // number matched so loop of ticket numbers is stopped
            return false;
          } else {
            // loop runs further
            return true;
          }
        });
      });
      // players' total number for different matches
      switch (ticket.matches) {
        case 5:
          operator.statementData.match5.players++;
          break;
        case 4:
          operator.statementData.match4.players++;
          break;
        case 3:
          operator.statementData.match3.players++;
          break;
        case 2:
          operator.statementData.match2.players++;
          break;
        default:
          operator.statementData.noPrizeTickets++;
          break;
      }
    });
    // match types
    const matchTypes = Object.keys(
      lotterySettings.prizes,
    ) as (keyof typeof lotterySettings.prizes)[];
    // match 5 value if only 1 player won
    const prizeMatch5 = Math.floor(
      operator.statementData.totalIncome * lotterySettings.prizes.match5.incomePercent,
    );
    // calculating players' prize values and operator's incomes and payments
    // basic is relative to 5-match prize
    // perPlayer is max prize pool divided with players' number related to matches
    matchTypes.forEach((matchType) => {
      const prizes = { basic: 0, perPlayer: 0 };
      if (matchType === 'match5') {
        prizes.basic = prizeMatch5;
        prizes.perPlayer = prizeMatch5 / operator.statementData.match5.players;
      } else {
        // if the total prize pool divided per players' number would result too high prize per player
        prizes.basic = prizeMatch5 * lotterySettings.prizes[matchType].playerMaxToMatch5;
        // if the sum of basic prize per player would be over the prize pool because of too many winner players
        prizes.perPlayer =
          (operator.statementData.totalIncome * lotterySettings.prizes[matchType].incomePercent) /
          operator.statementData[matchType].players;
      }
      // setting payment per player to matches
      operator.statementData[matchType].playerPayment = Math.floor(
        prizes.perPlayer > prizes.basic ? prizes.basic : prizes.perPlayer,
      );
      // setting total payment to matches
      operator.statementData[matchType].totalPayment =
        operator.statementData[matchType].playerPayment * operator.statementData[matchType].players;
      // adding together operator's total payment
      operator.statementData.totalPayment += operator.statementData[matchType].totalPayment;
    });
    // setting profit to operator
    operator.statementData.totalProfit =
      operator.statementData.totalIncome - operator.statementData.totalPayment;
    // decreasing operator's final budget with the total payment
    operator.budget -= operator.statementData.totalPayment;
    // setting prize on all tickets and player's total price
    tickets.forEach((ticket, index) => {
      // adding every prize to tickets
      switch (ticket.matches) {
        case 5:
          tickets[index].prize = operator.statementData.match5.playerPayment;
          break;
        case 4:
          tickets[index].prize = operator.statementData.match4.playerPayment;
          break;
        case 3:
          tickets[index].prize = operator.statementData.match3.playerPayment;
          break;
        case 2:
          tickets[index].prize = operator.statementData.match2.playerPayment;
          break;
      }
      // adding together all prizes that player won
      if (player.id === ticket.playerId) {
        player.totalPrize += tickets[index].prize;
      }
    });
    // adding player's total prize to budget
    player.budget += player.totalPrize;
    // store player data into local storage
    lotteryStorePlayer(player);
    // store operator data into local storage
    lotteryStoreOperator(operator);
    // store tickets data into local storage
    lotteryStoreTickets(tickets);
    // return operator data
    return operator;
  } else {
    // no ticket therefore, it shows a warning message
    toast.warning('There is no ticket to draw', {
      toastId: 'noTicketDraw',
    });
    return false;
  }
};
