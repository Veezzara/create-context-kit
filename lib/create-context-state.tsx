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

/**
 * Creates a new context state with initial state and reducers.
 * 
 * @template T - The type of the state
 * @template D - The type of the reducers object
 * @param {ContextStateInit<T, D>} init - The initialization object containing initial state and reducers
 * @returns {ContextState<T, D>} An object containing Provider component and hooks for state and actions
 * 
 * @example
 * const CounterContext = createContextState({
 *   initialState: { count: 0 },
 *   reducers: {
 *     increment: (state, payload: number) => ({
 *       ...state,
 *       count: state.count + payload,
 *     }),
 *   },
 * });
 */
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

  /**
   * Provider component that provides state and actions to children
   */
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

  /**
   * Hook to access the current state
   * @throws Error if used outside of Provider
   * @returns {T} The current state
   */
  const useState = () => {
    const context = useContext(ValueContext);
    if (!context) throw new Error("useState must be used within a Provider");
    return context;
  };

  /**
   * Hook to access the actions for updating state
   * @throws Error if used outside of Provider
   * @returns {ContextActions<T, D>} Object containing action functions
   */
  const useActions = () => {
    const context = useContext(ActionsContext);
    if (!context) throw new Error("useActions must be used within a Provider");
    return context;
  };

  return { Provider, useState, useActions };
};
