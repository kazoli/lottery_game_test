// General type mapping of actions for any reducer
export type tActionMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: T[Key];
      };
};

// General type of drop-down option
export type tDropDownOption = {
  key: string | number;
  value: string | JSX.Element;
};
