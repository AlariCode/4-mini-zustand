import { StateCreator } from "zustand";
import {
  CoffeeCartActions,
  CoffeeCartState,
  CoffeeListActions,
  CoffeeListState,
} from "./storeTypes";
import { CoffeeQueryParams, CoffeeType } from "../types/coffeTypes";
import axios from "axios";
import { BASE_URL } from "../api/CoreApi";

export const listSlice: StateCreator<
  CoffeeListActions & CoffeeListState & CoffeeCartActions & CoffeeCartState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never]],
  CoffeeListActions & CoffeeListState
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  params: { text: undefined, type: undefined },

  setParams: (params) => {
    set({ params: { ...get().params, ...params } });
  },

  getCoffeeList: async (params?: CoffeeQueryParams) => {
    const { controller } = get();

    if (controller) {
      controller.abort();
    }

    const newController = new AbortController();
    set({ controller: newController });
    const { signal } = newController;
    const { data } = await axios.get<CoffeeType[]>(BASE_URL, {
      params,
      signal,
    });
    set({ coffeeList: data });
    return data;
  },
});
