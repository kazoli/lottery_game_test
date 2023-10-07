import { validateNumberRange, validatePositiveInteger, validateText } from '../general/validations';
import { lotterySettings } from './lotteryInitialStates';

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

// Validating amount of ticket numbers
export const lotteryValidateMaxTicketNumbers = (value: string, element: string) => {
  let error = validatePositiveInteger(element, value, false);
  if (!error) {
    error = validateNumberRange(
      element,
      parseInt(value),
      1,
      lotterySettings.validation.maxTicketNumber,
    );
  }
  return error;
};
