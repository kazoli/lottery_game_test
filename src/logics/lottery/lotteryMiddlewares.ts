import { tLotteryState } from './lotteryTypes';
import { lotteryInitialState, lotterySettings } from './lotteryInitialStates';
import { getLocalStorage, setLocalStorage } from '../general/middlewares';
import { validateText } from '../general/validations';
import { v4 as uuidV4 } from 'uuid';

// Initialize player data
export const lotteryInitializePlayer = () => {
  const storedPlayer = getLocalStorage('player') as null | Omit<tLotteryState['player'], 'tickets'>;
  if (storedPlayer) {
    const player = { ...storedPlayer, tickets: [] } as tLotteryState['player'];
    const tickets = getLocalStorage('tickets') as null | tLotteryState['tickets'];
    if (tickets) {
      player.tickets = tickets.filter((ticket) => ticket.playerId === storedPlayer.id);
    }
    return player;
  } else {
    const newPlayer = { ...lotteryInitialState.player };
    // creating an id to new player
    newPlayer.id = uuidV4();
    return newPlayer;
  }
};

// Store player data into local storage
export const lotteryStorePlayer = (player: tLotteryState['player']) => {
  // detach tickets from player
  const { tickets, ...data } = player;
  setLocalStorage('player', data);
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
