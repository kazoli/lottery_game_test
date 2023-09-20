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
