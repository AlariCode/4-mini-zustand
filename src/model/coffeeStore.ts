import { create, StateCreator } from "zustand";
import { CoffeeType } from "../types/coffeTypes";
import axios, { AxiosError } from "axios";
import { devtools } from "zustand/middleware";

const BASE_URL = "https://purpleschool.ru/coffee-api/";

type CoffeeState = {
  coffeeList?: CoffeeType[];
};

type CoffeeActions = {
  getCoffeeList: () => void;
};

const coffeeSlice: StateCreator<
  CoffeeActions & CoffeeState,
  [["zustand/devtools", never]]
> = (set) => ({
  coffeeList: undefined,
  getCoffeeList: async () => {
    try {
      const { data } = await axios.get<CoffeeType[]>(BASE_URL, {});
      set({ coffeeList: data }, false, "setCoffeeList");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  },
});

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
  devtools(coffeeSlice)
);
