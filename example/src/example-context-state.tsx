import { createContextState, withSelector } from "create-context-state";

export const ExampleContextState = createContextState({
  initialState: {
    count1: 0,
    count2: 0,
  },
  reducers: {
    increment1: (state, payload) => ({
      ...state,
      count1: state.count1 + payload,
    }),
    increment2: (state, payload) => ({
      ...state,
      count2: state.count2 + payload,
    }),
  },
});

export const WithCount1 = withSelector({
  useState: ExampleContextState.useState,
  select: (state) => state.count1,
  Component: (props: { someProp: number }, selectedState) => {
    console.log("WithCount1 render");
    return (
      <div>
        <span>count1: {selectedState}</span>
      </div>
    );
  },
});

export const WithCount2 = withSelector({
  useState: ExampleContextState.useState,
  select: (state) => state.count2,
  Component: (props: { someProp: number }, selectedState) => {
    console.log("WithCount2 render");
    return (
      <div>
        <span>count2: {selectedState}</span>
      </div>
    );
  },
});
