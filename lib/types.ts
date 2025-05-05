import { PropsWithChildren, ReactNode } from "react";

/**
 * Type definition for a reducer function that updates state
 * @template T - The type of the state
 */
export type ContextStateReducer<T> = (state: T, payload?: any) => T;

/**
 * Type definition for the initialization object passed to createContextState
 * @template T - The type of the state
 * @template D - The type of the reducers object
 */
export type ContextStateInit<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = {
  /** Initial state value */
  initialState: T;
  /** Object containing reducer functions */
  reducers: D;
};

/**
 * Type that extracts the keys of the reducers object
 * @template T - The type of the state
 * @template D - The type of the reducers object
 */
export type ReducerKeys<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = keyof ContextStateInit<T, D>["reducers"];

/**
 * Type that creates an object of action functions from the reducers
 * @template T - The type of the state
 * @template D - The type of the reducers object
 */
export type ContextActions<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = {
  [K in ReducerKeys<T, D>]: (
    payload: Parameters<ContextStateInit<T, D>["reducers"][K]>[1]
  ) => void;
};

/**
 * Type that represents the complete context state object returned by createContextState
 * @template T - The type of the state
 * @template D - The type of the reducers object
 */
export type ContextState<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = {
  /** Provider component */
  Provider: (props: PropsWithChildren) => ReactNode;
  /** Hook to access the current state */
  useState: () => T;
  /** Hook to access the action functions */
  useActions: () => ContextActions<T, D>;
};
