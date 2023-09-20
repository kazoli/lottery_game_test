// Validate an input
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
