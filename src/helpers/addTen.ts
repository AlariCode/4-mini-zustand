import { getCounter, incrementByAmount } from "../model/counterStore";

export const addTen = () => {
  const counter = getCounter();
  console.log(counter);
  if (counter >= 0) {
    incrementByAmount(10);
  } else {
    incrementByAmount(-10);
  }
};
