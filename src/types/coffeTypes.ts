export enum CoffeeTypeEnum {
  cappuccino = "cappuccino",
  latte = "latte",
  macchiato = "macchiato",
  americano = "americano",
}

export type CoffeeQueryParams = {
  text: string;
  type: CoffeeTypeEnum;
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
