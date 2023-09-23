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
  const storedPlayer = getLocalStorage(tLotteryLocalStorages.player) as null | Omit<
    tLotteryState['player'],
    'tickets'
  >;
  if (storedPlayer) {
    // updating initial state with stored data of player
    const player = { ...lotteryInitialState.player, ...storedPlayer } as tLotteryState['player'];
    // loading all tickets from the game
    const tickets = getLocalStorage(tLotteryLocalStorages.tickets) as
      | null
      | tLotteryState['tickets'];
    // entering onyl if there are any tickets
    if (tickets && tickets.length) {
      // filtering player tickets from all tickets
      player.tickets = tickets.filter((ticket) => ticket.playerId === storedPlayer.id);
      // entering onyl if player has tickets
      if (player.tickets.length) {
        // reordering descending according to created date
        player.tickets = arrayReorder(player.tickets, 'created', false);
        // checking out tickets were played so nem ticket cannot be added
        player.addTicket = !player.tickets.find((ticket) => ticket.played);
      }
    }
    return player;
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
  // extracting only the necessary data to store
  const data = {
    id: player.id,
    name: player.name,
    budget: player.budget,
  };
  // updating player data in local storage
  setLocalStorage(tLotteryLocalStorages.player, data);
};

// Storing new tickets data into local storage
export const lotteryStoreTickets = (tickets: tLotteryState['tickets']) => {
  // getting previous tickets
  const allTickets = (getLocalStorage(tLotteryLocalStorages.tickets) ??
    []) as tLotteryState['tickets'];
  // adding new tickets
  setLocalStorage(tLotteryLocalStorages.tickets, [...allTickets, ...tickets]);
};

// Storing player ticket data
export const lotteryStorePlayerTicket = (
  playerId: tLotteryState['player']['id'],
  numbers: number[],
) => {
  // creating ticket object
  const ticket: tLotteryTicket = {
    id: uuidV4(),
    playerId: playerId,
    created: formatDate(settings.systemDateFormat, new Date()),
    numbers: numbers.map((number) => ({ value: number, match: false })),
    matches: 0,
    played: false,
  };
  // adding ticket to stored ones in local storage
  lotteryStoreTickets([ticket]);
  return ticket;
};
