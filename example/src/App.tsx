import { withProvider } from "create-context-state";
import {
  WithCount1,
  WithCount2,
  ExampleContextState,
} from "./example-context-state";

const App = () => (
  <>
    <Example />
    <WithSelectorExample />
  </>
);

export default App;

export const Example = withProvider({
  Provider: ExampleContextState.Provider,
  Component: () => {
    const state = ExampleContextState.useState();
    const actions = ExampleContextState.useActions();

    return (
      <div>
        <h1>create-context-state Example</h1>
        <span>count1: {state.count1}</span>
        <br />
        <span>count2: {state.count2}</span>
        <br />
        <button onClick={() => actions.increment1(1)}>Increment1</button>
        <button onClick={() => actions.increment2(1)}>Increment2</button>
      </div>
    );
  },
});

export const WithSelectorExample = withProvider({
  Provider: ExampleContextState.Provider,
  Component: () => {
    const actions = ExampleContextState.useActions();

    return (
      <div>
        <h1>create-context-state WithSelector Example</h1>
        <WithCount1 someProp={0} />
        <WithCount2 someProp={0} />
        <button onClick={() => actions.increment1(1)}>Increment1</button>
        <button onClick={() => actions.increment2(1)}>Increment2</button>
      </div>
    );
  },
});
