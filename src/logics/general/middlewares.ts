import { tDropDown, tDropDownOption } from './types';
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
  const options = { top: 0, left: 0, behavior: behavior };
  // checking if the element is a window object
  if (!(element instanceof Window)) {
    // getting the bounding rectangle of the element
    const rect = element.getBoundingClientRect();
    // getting the height of the header
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    // scrolling to the element's position minus header height
    options.top = rect.top + window.scrollY - headerHeight;
  }
  window.scrollTo(options);
};

// Create formatted date string
export const formatDate = (dateStyle: string, date: string | Date) => {
  const d: Date = typeof date === 'string' ? new Date(date) : date;
  const dateFormatted = moment(d).format(dateStyle);
  return dateFormatted;
};

// General alphabetic reorder of object array
export const objectArrayReorder = <T extends { [key: string | number]: any }>(
  array: T[],
  key: keyof T,
  order = 'asc',
) => {
  // simple alphabetic order
  const sortFunction = (a: T, b: T) =>
    JSON.stringify(a[key]).localeCompare(JSON.stringify(b[key]), undefined, {
      sensitivity: 'accent',
    });
  // return with sorted array (default is ascend)
  return order === 'desc'
    ? array.sort((a, b) => sortFunction(b, a))
    : array.sort((a, b) => sortFunction(a, b));
};

// General number array reorder
export const numberArrayReorder = (array: number[], order = 'asc') => {
  // creating a clone of the array
  const clonedArray = [...array];
  // return with sorted array (default is ascend)
  return order === 'desc' ? clonedArray.sort((a, b) => b - a) : clonedArray.sort((a, b) => a - b);
};

// Drop down content calculator
export const dropDownCalculator = (
  selected: tDropDownOption['key'],
  options: tDropDown['options'],
) => {
  const dropDown: tDropDown = { selected: '', options: [] };
  options.forEach((option) => {
    if (option.key === selected) {
      dropDown.selected = option.value;
    } else {
      dropDown.options.push(option);
    }
  });
  if (!dropDown.selected) {
    // selecting first option if empty or wrong default value
    dropDown.selected = options[0].value;
    // dropping the first option from list
    dropDown.options.shift();
  }
  return dropDown;
};

// Generating random number array with distinctive values
export const generateRandomDistinctNumbers = (
  minRange: number,
  maxRange: number,
  arrayLength: number,
) => {
  // initializing an empty number array
  const numbers: number[] = [];
  // looping until the numbers has the given number of elements
  while (numbers.length < arrayLength) {
    // generating a random number between minRange and maxRange
    const num = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    // checking if the number is already among the numbers
    if (!numbers.includes(num)) {
      // pushing the number to the numbers
      numbers.push(num);
    }
  }
  // return the increasingly ordered numbers
  return numberArrayReorder(numbers);
};
