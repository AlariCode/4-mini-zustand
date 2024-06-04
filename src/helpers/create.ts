import { create as _create } from "zustand";
import type { StateCreator } from "zustand";

const resetStoreFnSet = new Set<() => void>();

export const resetAllStores = () => {
  resetStoreFnSet.forEach((resetFn) => {
    resetFn();
  });
};

export const create = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = _create(stateCreator);
    const initialState = store.getInitialState();
    const resetState = () => {
      store.setState(initialState, true);
    };
    resetStoreFnSet.add(resetState);
    return store;
  };
}) as typeof _create;
