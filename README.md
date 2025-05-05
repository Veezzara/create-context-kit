# React Context Kit

A lightweight and efficient state management solution for React applications, inspired by Redux Toolkit's `createSlice`. This library provides a simple and intuitive way to manage state using React Context with built-in support for selective re-renders.

## Features

- 🚀 Simple and intuitive API similar to Redux Toolkit's `createSlice`
- 🔍 Built-in support for selective re-renders with `withSelector`
- 🎯 TypeScript support out of the box
- 📦 Small bundle size

## Installation

```bash
npm install react-context-kit
# or
yarn add react-context-kit
# or
pnpm add react-context-kit
```

## Quick Start

### Basic Usage

```tsx
import { createContextState } from 'react-context-kit';

// Define your state and reducers
const CounterContext = createContextState({
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, payload: number) => ({
      ...state,
      count: state.count + payload,
    }),
  },
});

// Use in your components
const Counter = () => {
  const state = CounterContext.useState();
  const actions = CounterContext.useActions();

  return (
    <div>
      <span>Count: {state.count}</span>
      <button onClick={() => actions.increment(1)}>Increment</button>
    </div>
  );
};

// Wrap your app with the Provider
const App = () => (
  <CounterContext.Provider>
    <Counter />
  </CounterContext.Provider>
);
```

### Selective Re-renders with withSelector

```tsx
import { createContextState, withSelector } from 'react-context-kit';

const UserContext = createContextState({
  initialState: {
    name: 'John',
    age: 30,
  },
  reducers: {
    updateName: (state, payload: string) => ({
      ...state,
      name: payload,
    }),
  },
});

// Component will only re-render when name changes
const NameDisplay = withSelector({
  useState: UserContext.useState,
  select: (state) => state.name,
  Component: (props, selectedState) => (
    <div>Name: {selectedState}</div>
  ),
});
```

### Using withProvider for Clean Component Structure

```tsx
import { withProvider } from 'react-context-kit';

const UserProfile = withProvider({
  Provider: UserContext.Provider,
  Component: () => {
    const state = UserContext.useState();
    const actions = UserContext.useActions();

    return (
      <div>
        <NameDisplay />
        <button onClick={() => actions.updateName('Jane')}>
          Update Name
        </button>
      </div>
    );
  },
});
```

## API Reference

### createContextState

Creates a new context state with initial state and reducers.

```tsx
const context = createContextState({
  initialState: T,
  reducers: {
    [actionName: string]: (state: T, payload: P) => T
  }
});
```

### withSelector

Creates a component that only re-renders when the selected state changes.

```tsx
const Component = withSelector({
  useState: Context.useState,
  select: (state) => selectedState,
  Component: (props, selectedState) => JSX.Element
});
```

### withProvider

Wraps a component with a context provider.

```tsx
const Component = withProvider({
  Provider: Context.Provider,
  Component: () => JSX.Element
});
```
