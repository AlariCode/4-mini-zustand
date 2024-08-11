import { useCoffeeStore } from "../model/coffeeStore";
import { useShallow } from "zustand/react/shallow";

export const Cart = () => {
  const [cart] = useCoffeeStore(useShallow((state) => [state.cart]));

  return (
    <>
      {cart ? (
        <>
          {cart.map((item, index) => (
            <span key={item.id + index + item.name}>{`${item.name}${
              item.quantity > 1 ? ` x ${item.quantity}` : ""
            }`}</span>
          ))}
        </>
      ) : (
        <span>Your cart is empty</span>
      )}
    </>
  );
};
