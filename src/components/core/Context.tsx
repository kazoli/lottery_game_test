import { createContext, useContext, ReactNode, Dispatch, useReducer } from 'react';
import { tLotteryActions, tLotteryState } from '../../logics/lottery/lotteryTypes';
import { lotteryInitialState } from '../../logics/lottery/lotteryInitialStates';
import { lotteryReducer } from '../../logics/lottery/lotteryReducer';

// Type of context
type tContext = {
  lotteryState: tLotteryState;
  lotteryDispatch: Dispatch<tLotteryActions>;
};

// Type of props
type tProps = {
  children: ReactNode;
};

// Initial state of context
const contextInitialState = {} as tContext;

// Create context
const Context = createContext(contextInitialState);

// Context custom hook
const useAppContext = () => useContext(Context);

// Context provider
function ContextProvider(props: tProps) {
  // get state and dispatch from lottery reducer
  const [lotteryState, lotteryDispatch] = useReducer(lotteryReducer, lotteryInitialState);

  return (
    <Context.Provider value={{ lotteryState, lotteryDispatch }}>{props.children}</Context.Provider>
  );
}

export { ContextProvider, useAppContext };
