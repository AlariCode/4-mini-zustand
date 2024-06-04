import { Button, Input } from "antd";
import {
  clearCart,
  orderCoffee,
  setAddress,
  useCoffeeStore,
} from "../model/coffeeStore";
import { useShallow } from "zustand/react/shallow";

export const CartActions = () => {
  const [address] = useCoffeeStore(useShallow((state) => [state.address]));
  return (
    <>
      <Input
        placeholder="Adress"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button onClick={orderCoffee} disabled={!address} type="primary">
        Order coffee
      </Button>
      <Button onClick={clearCart}>Clear cart</Button>
    </>
  );
};
