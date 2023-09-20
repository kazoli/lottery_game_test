import { tLotteryState } from './lotteryTypes';
import { lotterySettings } from './lotteryInitialStates';
import { getLocalStorage } from '../general/middlewares';
import { validateText } from '../general/validations';

// Initialize user data from local storage
export const lotteryInitializeUserData = <T extends 'player' | 'operator'>(userType: T) => {
  const data = getLocalStorage(userType) as null | tLotteryState[T];
  return data ?? lotterySettings[userType];
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
