// Validate a text input
export const validateText = (
  element: string,
  value: string,
  minLength: number,
  maxLength: number,
) => {
  if (!value) {
    return `${element} cannot be empty`;
  }
  if (value.length < minLength) {
    return `${element} needs to be at least ${minLength} characters long`;
  }
  if (value.length > maxLength) {
    return `${element} can be maximum ${maxLength} characters long`;
  }
  return '';
};

// Validate positive integers that can or cannot be zero
export const validatePositiveInteger = (
  element: string,
  value: string,
  acceptZero: boolean = true,
) => {
  if (!value) {
    return `${element} cannot be empty`;
  }
  if (!value.match(/^\d+$/)) {
    return `${element} can be a positive integer number`;
  }
  if (!acceptZero && value === '0') {
    return `${element} needs to be greater than zero`;
  }
  return '';
};

// Validate number range
export const validateNumberRange = (
  element: string,
  value: number,
  minValue: number,
  maxValue: number,
) => {
  if (value < minValue) {
    return `${element} minimum value can be ${maxValue}`;
  }
  if (value > maxValue) {
    return `${element} maximum value can be ${maxValue}`;
  }
  return '';
};
