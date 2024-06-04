import { create, StateCreator } from "zustand";
import { CoffeeQueryParams, CoffeeType } from "../types/coffeTypes";
import axios, { AxiosError } from "axios";
import { devtools } from "zustand/middleware";

const BASE_URL = "https://purpleschool.ru/coffee-api/";

type CoffeeState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
};

type CoffeeActions = {
  getCoffeeList: (params?: CoffeeQueryParams) => void;
};

const coffeeSlice: StateCreator<
  CoffeeActions & CoffeeState,
  [["zustand/devtools", never]]
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,

  getCoffeeList: async (params?: CoffeeQueryParams) => {
    const { controller } = get();

    if (controller) {
      controller.abort();
    }

    const newController = new AbortController();
    set({ controller: newController });
    const { signal } = newController;

    try {
      const { data } = await axios.get<CoffeeType[]>(BASE_URL, {
        params,
        signal,
      });
      set({ coffeeList: data }, false, "setCoffeeListWithSearch");
    } catch (error) {
      if (axios.isCancel(error)) return;

      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  },
});

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
  devtools(coffeeSlice)
);
