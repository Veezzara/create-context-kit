import { PropsWithChildren, ReactNode } from "react";

/**
 * Props type for the withProvider HOC
 * @template TComponentProps - Type of the component props
 */
export type TWithProviderProps<TComponentProps> = {
  Component: (props: TComponentProps) => ReactNode;
  Provider: (props: PropsWithChildren) => ReactNode;
};

/**
 * Higher-order component that wraps a component with a context provider
 * 
 * @template TComponentProps - Type of the component props
 * @param {TWithProviderProps<TComponentProps>} props - Configuration object
 * @returns A component wrapped with the specified provider
 * 
 * @example
 * const UserProfile = withProvider({
 *   Provider: UserContext.Provider,
 *   Component: () => {
 *     const state = UserContext.useState();
 *     const actions = UserContext.useActions();
 *     return (
 *       <div>
 *         <NameDisplay />
 *         <button onClick={() => actions.updateName('Jane')}>
 *           Update Name
 *         </button>
 *       </div>
 *     );
 *   },
 * });
 */
export const withProvider = <TComponentProps extends Record<string, unknown>>(
  props: TWithProviderProps<TComponentProps>
) => {
  return (componentProps: TComponentProps) => {
    return (
      <props.Provider>
        <props.Component {...componentProps} />
      </props.Provider>
    );
  };
};
