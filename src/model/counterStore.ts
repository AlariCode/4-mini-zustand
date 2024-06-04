import { create, StateCreator } from "zustand";

type counterState = {
  counter: number;
};

const counterSlice: StateCreator<counterState> = () => ({
  counter: 0,
});

export const useCounterStore = create<counterState>(counterSlice);
