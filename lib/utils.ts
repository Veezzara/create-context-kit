import {
  ContextStateInit,
  ContextActions,
  ContextStateReducer,
  ReducerKeys,
} from "./types";

export const combineReducers = <
  T,
  D extends Record<string, ContextStateReducer<T>>
>(
  init: ContextStateInit<T, D>
) => {
  return (
    state: ContextStateInit<T, D>["initialState"],
    action: { type: ReducerKeys<T, D>; payload?: any }
  ) => {
    const actionHandler = init.reducers[action.type];
    return actionHandler ? actionHandler(state, action.payload) : state;
  };
};

export const createActions = <
  T,
  D extends Record<string, ContextStateReducer<T>>
>(
  init: ContextStateInit<T, D>,
  dispatch: (action: { type: ReducerKeys<T, D>; payload?: any }) => void
): ContextActions<T, D> => {
  const actions = {} as any;
  for (const key in init.reducers) {
    actions[key] = (payload: any) => dispatch({ type: key, payload });
  }
  return actions as ContextActions<T, D>;
};
