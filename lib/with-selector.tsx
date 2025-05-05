import { ReactNode, useMemo } from "react";

/**
 * Props type for the withSelector HOC
 * @template TComponentProps - Type of the component props
 * @template TState - Type of the state
 * @template TSelectedState - Type of the selected state
 */
export type TWithSelectorProps<TComponentProps, TState, TSelectedState> = {
  Component: (
    props: TComponentProps,
    selectedState: TSelectedState
  ) => ReactNode;
  useState: () => TState;
  select: (state: TState) => TSelectedState;
};

/**
 * Type definition for the withSelector HOC
 * @template TComponentProps - Type of the component props
 * @template TState - Type of the state
 * @template TSelectedState - Type of the selected state
 */
export type TWithSelector<TComponentProps, TState, TSelectedState> = (
  props: TWithSelectorProps<TComponentProps, TState, TSelectedState>
) => (props: TComponentProps, selectedState: TSelectedState) => ReactNode;

/**
 * Higher-order component that creates a component that only re-renders when the selected state changes
 * 
 * @template TComponentProps - Type of the component props
 * @template TState - Type of the state
 * @template TSelectedState - Type of the selected state
 * @param {TWithSelectorProps<TComponentProps, TState, TSelectedState>} props - Configuration object
 * @returns A component that only re-renders when the selected state changes
 * 
 * @example
 * const NameDisplay = withSelector({
 *   useState: UserContext.useState,
 *   select: (state) => state.name,
 *   Component: (props, selectedState) => (
 *     <div>Name: {selectedState}</div>
 *   ),
 * });
 */
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
