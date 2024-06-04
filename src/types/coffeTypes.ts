export enum CoffeeTypeEnum {
  cappuccino = "cappuccino",
  latte = "latte",
  macchiato = "macchiato",
  americano = "americano",
}

export type CoffeeQueryParams = {
  text?: string;
  type?: CoffeeTypeEnum;
};

export enum CoffeSizeEnum {
  S = "S",
  M = "M",
  L = "L",
}

export type CoffeItem = {
  id: number;
  name: string;
  size: CoffeSizeEnum;
  quantity: number;
};
export type OrderCoffeeReq = {
  address: string;
  orderItems: CoffeItem[];
};

export type OrderCoffeeRes = {
  message: string;
  success: boolean;
};

export type CoffeeType = {
  id: number;
  name: string;
  subTitle: string;
  type: CoffeeTypeEnum;
  price: number;
  image: string;
  description: string;
  rating: number;
};
