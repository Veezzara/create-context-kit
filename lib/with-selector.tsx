import { ReactNode, useMemo } from "react";

export type TWithSelectorProps<TComponentProps, TState, TSelectedState> = {
  Component: (
    props: TComponentProps,
    selectedState: TSelectedState
  ) => ReactNode;
  useState: () => TState;
  select: (state: TState) => TSelectedState;
};

export type TWithSelector<TComponentProps, TState, TSelectedState> = (
  props: TWithSelectorProps<TComponentProps, TState, TSelectedState>
) => (props: TComponentProps, selectedState: TSelectedState) => ReactNode;

export const withSelector = <TComponentProps, TState, TSelectedState>(
  props: TWithSelectorProps<TComponentProps, TState, TSelectedState>
) => {
  return (p: TComponentProps) => {
    const state = props.useState();
    const selectedState = props.select(state);

    const Component = useMemo(
      () => props.Component(p, selectedState),
      [p, selectedState]
    );

    return Component;
  };
};
