import { create, StateCreator } from "zustand";

type counterState = {
  counter: number;
};

type counterActions = {
  increment: () => void;
  decrement: () => void;
};

const counterSlice: StateCreator<counterState & counterActions> = (
  set,
  get
) => ({
  counter: 0,
  decrement: () => {
    const { counter } = get();
    set({ counter: counter - 1 });
  },
  increment: () => {
    const { counter } = get();
    set({ counter: counter + 1 });
  },
});

export const useCounterStore = create<counterState & counterActions>(
  counterSlice
);
