import { create, StateCreator } from "zustand";

type counterState = {
  counter: number;
};

type counterActions = {
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (value: number) => void;
};

const initialState: counterState = {
  counter: 0,
};

const counterSlice: StateCreator<counterState & counterActions> = (
  set,
  get
) => ({
  counter: initialState.counter,
  decrement: () => {
    const { counter } = get();
    set({ counter: counter - 1 });
  },
  increment: () => {
    const { counter } = get();
    set({ counter: counter + 1 });
  },
  incrementByAmount: (value: number) => {
    const { counter } = get();
    set({ counter: counter + value });
  },
});

export const useCounterStore = create<counterState & counterActions>(
  (...args) => ({
    ...counterSlice(...args),
  })
);

export const incrementByAmount = (value: number) => {
  useCounterStore.getState().incrementByAmount(value);
};

export const getCounter = () => useCounterStore.getState().counter;
