import { useShallow } from "zustand/react/shallow";
import { useCoffeeStore } from "../model/coffeeStore";
import { CoffeeCard } from "./CoffeeCard";
import "../App.css";

export const CoffeList = () => {
  const [coffeeList] = useCoffeeStore(useShallow((s) => [s.coffeeList]));

  return (
    <>
      {coffeeList ? (
        <div className="cardsContainer">
          {coffeeList.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      ) : (
        <span>По запросу не нашлось ни одного напитка</span>
      )}
    </>
  );
};
