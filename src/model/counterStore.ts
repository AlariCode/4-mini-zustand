import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type counterState = {
  counter: number;
  persistedCounter: number;
};

type counterActions = {
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (value: number) => void;
};

const initialState: counterState = {
  counter: 0,
  persistedCounter: 0,
};

const counterSlice: StateCreator<
  counterState & counterActions,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  counter: initialState.counter,
  persistedCounter: initialState.persistedCounter,
  decrement: () => {
    const { counter, persistedCounter } = get();
    set({ counter: counter - 1, persistedCounter: persistedCounter - 1 });
  },
  increment: () => {
    const { counter, persistedCounter } = get();
    set({ counter: counter + 1, persistedCounter: persistedCounter + 1 });
  },
  incrementByAmount: (value: number) => {
    const { counter } = get();
    set({ counter: counter + value });
  },
});

export const useCounterStore = create<counterState & counterActions>()(
  persist((...args) => ({ ...counterSlice(...args) }), {
    name: "counterStore",
    partialize: (state) => ({ persistedCounter: state.persistedCounter }),
  })
);

export const incrementByAmount = (value: number) => {
  useCounterStore.getState().incrementByAmount(value);
};

export const getCounter = () => useCounterStore.getState().counter;
