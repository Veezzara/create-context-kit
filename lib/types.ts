import { PropsWithChildren, ReactNode } from "react";

export type ContextStateReducer<T> = (state: T, payload?: any) => T;

export type ContextStateInit<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = {
  initialState: T;
  reducers: D;
};

export type ReducerKeys<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = keyof ContextStateInit<T, D>["reducers"];

export type ContextActions<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = {
  [K in ReducerKeys<T, D>]: (
    payload: Parameters<ContextStateInit<T, D>["reducers"][K]>[1]
  ) => void;
};

export type ContextState<
  T,
  D extends Record<string, ContextStateReducer<T>>
> = {
  Provider: (props: PropsWithChildren) => ReactNode;
  useState: () => T;
  useActions: () => ContextActions<T, D>;
};
