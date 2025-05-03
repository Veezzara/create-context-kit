"use client";

import {
  createContext,
  useContext,
  PropsWithChildren,
  useReducer,
  useMemo,
} from "react";
import {
  ContextStateInit,
  ContextActions,
  ContextState,
  ContextStateReducer,
} from "./types";
import { combineReducers, createActions } from "./utils";

export const createContextState = <
  T,
  D extends Record<string, ContextStateReducer<T>>
>(
  init: ContextStateInit<T, D>
): ContextState<T, D> => {
  const ValueContext = createContext(init.initialState);
  const ActionsContext = createContext<ContextActions<T, D> | undefined>(
    undefined
  );

  const reducer = combineReducers(init);

  const Provider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, init.initialState);
    const actions = useMemo(() => createActions(init, dispatch), []);

    return (
      <ValueContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>
          {children}
        </ActionsContext.Provider>
      </ValueContext.Provider>
    );
  };

  const useState = () => {
    const context = useContext(ValueContext);
    if (!context) throw new Error("useState must be used within a Provider");
    return context;
  };

  const useActions = () => {
    const context = useContext(ActionsContext);
    if (!context) throw new Error("useActions must be used within a Provider");
    return context;
  };

  return { Provider, useState, useActions };
};
