import { Input } from "antd";
import { setParams, useCoffeeStore } from "../model/coffeeStore";
import { useUrlParamsStore } from "../helpers/useUrlStorage";

export const SearchInput = () => {
  const [params] = useCoffeeStore((state) => [state.params]);
  useUrlParamsStore();

  return (
    <Input
      placeholder="Search"
      value={params?.text}
      onChange={(e) => setParams({ text: e.target.value })}
    />
  );
};
