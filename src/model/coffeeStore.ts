import { create, StateCreator } from "zustand";
import {
  CoffeeQueryParams,
  CoffeeType,
  CoffeItem,
  CoffeSizeEnum,
  OrderCoffeeReq,
  OrderCoffeeRes,
} from "../types/coffeTypes";
import axios, { AxiosError } from "axios";
import { devtools, persist } from "zustand/middleware";

const BASE_URL = "https://purpleschool.ru/coffee-api/";

type CoffeeState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  cart?: CoffeItem[];
  address?: string;
  params: CoffeeQueryParams;
};

type CoffeeActions = {
  setAddress: (address: string) => void;
  getCoffeeList: (params?: CoffeeQueryParams) => void;
  addToCart: (item: CoffeeType) => void;
  orderCoffee: () => void;
  clearCart: () => void;
  setParams: (params?: CoffeeQueryParams) => void;
};

const coffeeSlice: StateCreator<
  CoffeeActions & CoffeeState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  cart: undefined,
  address: undefined,
  params: { text: undefined, type: undefined },

  setParams: (params) => {
    const { getCoffeeList } = get();
    set({ params: { ...get().params, ...params } }), getCoffeeList(params);
  },

  clearCart: () => set({ cart: undefined }),

  setAddress: (address) => set({ address }),

  addToCart: (item) => {
    const { cart } = get();
    const preparedItem: CoffeItem = {
      id: item.id,
      name: `${item.name} ${item.subTitle}`,
      quantity: 1,
      size: CoffeSizeEnum.M,
    };
    set({ cart: cart ? [...cart, preparedItem] : [preparedItem] });
  },

  orderCoffee: async () => {
    const { cart, address } = get();
    const order: OrderCoffeeReq = {
      address: address!,
      orderItems: cart!,
    };
    try {
      const { data } = await axios.post<OrderCoffeeRes>(
        BASE_URL + "order",
        order
      );
      if (data.success) {
        alert(data.message);
        get().clearCart();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  },

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
  devtools(
    persist(coffeeSlice, {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    {
      name: "coffeeStore",
    }
  )
);

export const getCoffeeList = (params?: CoffeeQueryParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
