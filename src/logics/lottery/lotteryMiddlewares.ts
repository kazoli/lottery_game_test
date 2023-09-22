import { tLotteryState, tLotteryTicket } from './lotteryTypes';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import { arrayReorder, getLocalStorage, setLocalStorage } from '../general/middlewares';
import { validateText } from '../general/validations';
import { v4 as uuidV4 } from 'uuid';

// Initialize player data
export const lotteryInitializePlayer = () => {
  const storedPlayer = getLocalStorage('player') as null | Omit<tLotteryState['player'], 'tickets'>;
  if (storedPlayer) {
    const player = { ...storedPlayer, tickets: [] } as tLotteryState['player'];
    const tickets = getLocalStorage('tickets') as null | tLotteryState['tickets'];
    if (tickets) {
      // filter player tickets from all tickets
      player.tickets = tickets.filter((ticket) => ticket.playerId === storedPlayer.id);
      // reorder descending according to created date
      player.tickets = arrayReorder(player.tickets, 'created', false);
    }
    return player;
  } else {
    const newPlayer = { ...lotteryInitialState.player };
    // creating an id to new player
    newPlayer.id = uuidV4();
    // store the new player in local storage
    lotteryStorePlayer(newPlayer);
    return newPlayer;
  }
};

// Store player data into local storage
export const lotteryStorePlayer = (player: tLotteryState['player']) => {
  // detach tickets from player
  const { tickets, ...data } = player;
  setLocalStorage('LotteryPlayer', data);
};

// Validate name
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

// Store player ticket data
export const lotteryStorePlayerTicket = (
  playerId: tLotteryState['player']['id'],
  numbers: number[],
) => {
  const ticket: tLotteryTicket = {
    playerId: playerId,
    created: Date.now().toString(),
    numbers: [],
    matches: 0,
    played: false,
  };
  ticket.numbers = numbers.map((number) => ({ value: number, match: false }));
  return ticket;
};
