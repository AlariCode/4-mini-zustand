import { Button } from "antd";
import { CoffeeTypeEnum } from "../types/coffeTypes";
import { setParams, useCoffeeStore } from "../model/coffeeStore";
import { useShallow } from "zustand/react/shallow";

export const CategoryPicker = () => {
  const [params] = useCoffeeStore(useShallow((state) => [state.params]));

  return (
    <div>
      {Object.keys(CoffeeTypeEnum).map((key) => (
        <Button
          key={key}
          danger={params.type === key}
          onClick={() => {
            setParams({
              type: CoffeeTypeEnum[key as keyof typeof CoffeeTypeEnum],
            });
          }}
        >
          {key}
        </Button>
      ))}
    </div>
  );
};
