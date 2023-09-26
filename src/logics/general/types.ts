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

// General type of drop-down menu
export type tDropDown = { selected: tDropDownOption['value']; options: tDropDownOption[] };

// General type to button block
export type tButtonBlock = {
  disabled?: boolean;
  title?: string;
  content: string | JSX.Element;
  action: () => void;
}[];
