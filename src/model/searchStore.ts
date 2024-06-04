import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { getCoffeeList } from "./coffeeStore";
import { hashStorage } from "../helpers/hashStorage";

type SearchState = {
  text: string;
};

type SearchActions = {
  setText: (text: string) => void;
};

const initialState = {
  text: "",
};
const searchSlice: StateCreator<
  SearchState & SearchActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  text: initialState.text,
  setText: (text: string) => set({ text }, false, "setText"),
});

export const useSearchStore = create<SearchState & SearchActions>()(
  devtools(
    persist(searchSlice, {
      name: "searchStore",
      storage: createJSONStorage(() => hashStorage),
      version: undefined,
    }),
    { name: "searchStore" }
  )
);

useSearchStore.subscribe((state, prev) => {
  console.log(state.text);
  if (state.text !== prev.text) {
    getCoffeeList({ text: state.text });
  }
});
