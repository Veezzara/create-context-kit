import { PropsWithChildren, ReactNode } from "react";

export type TWithProviderProps<TComponentProps> = {
  Component: (props: TComponentProps) => ReactNode;
  Provider: (props: PropsWithChildren) => ReactNode;
};

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
