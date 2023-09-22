import moment from 'moment';

// ~ 5 mbytes is the maximum size of local storage values
export const storageMaxLengthExceeded = (value: object) => JSON.stringify(value).length > 5000000;

// Set data into localstorage
export const setLocalStorage = (key: string, value: string | object | object[]) => {
  if (typeof value !== 'string') value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

// Get data from localstorage
export const getLocalStorage = (key: string): null | string | object => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      const parsed: object = JSON.parse(value);
      return parsed;
    } catch (e) {
      return value;
    }
  } else {
    return null;
  }
};

// Scroll to element
export const scrollToElement = (
  behavior: 'auto' | 'smooth' = 'auto',
  element: Element | (Window & typeof globalThis) = window,
) => {
  element.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior,
  });
};

// Create formatted date string
export const formatDate = (dateStyle: string, date: string | Date) => {
  const d: Date = typeof date === 'string' ? new Date(date) : date;
  const dateFormatted = moment(d).format(dateStyle);
  return dateFormatted;
};

// General reorder with alphabetic order
export const arrayReorder = <T extends { [key: string | number]: any }>(
  array: T[],
  key: keyof T,
  ascend: boolean = true,
) => {
  // simple alphabetic order
  const sortFunction = (a: T, b: T) =>
    a[key].toString().localeCompare(b[key].toString(), undefined, {
      sensitivity: 'accent',
    });
  // creating a clone of the array
  const clonedArray = [...array];
  // return with sorted array
  return ascend
    ? clonedArray.sort((a, b) => sortFunction(a, b))
    : clonedArray.sort((a, b) => sortFunction(b, a));
};
