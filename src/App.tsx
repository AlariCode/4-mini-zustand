import "./App.css";
import { Button, Card, Input, Rate, Tag } from "antd";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCounterStore } from "./model/counterStore";
import { addTen } from "./helpers/addTen";
import { resetAllStores } from "./helpers/create";
import { useToDoStore } from "./model/todoStore";

function App() {
  const { getCoffeeList, coffeeList } = useCoffeeStore();
  const [text, setText] = useState<string>("");
  const handleSearch = (text: string) => {
    setText(text);
    getCoffeeList({ text });
  };
  useEffect(() => {
    getCoffeeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { counter, decrement, increment, persistedCounter } = useCounterStore();
  const { addTodo, todos } = useToDoStore();
  return (
    <div className="wrapper">
      <button onClick={decrement}>-</button>
      <span>{counter}</span>
      <span>{persistedCounter}</span>
      <button onClick={increment}>+</button>
      <button onClick={resetAllStores}>reset</button>
      <hr />
      <button onClick={() => addTodo("some")}>addTodo</button>
      {todos && todos.map((todo) => <div key={todo.title}>{todo.title}</div>)}
      {/* <Input
        placeholder="Search"
        value={text}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {coffeeList && (
        <div className="cardsContainer">
          {coffeeList.map((coffee) => (
            <Card
              hoverable
              key={coffee.id}
              cover={<img src={coffee.image} />}
              actions={[
                <Button icon={<ShoppingCartOutlined />} key={coffee.name}>
                  {coffee.price}
                </Button>,
              ]}
            >
              <Card.Meta title={coffee.name} description={coffee.subTitle} />
              <Tag style={{ marginTop: "24px" }} color="purple">
                {coffee.type}
              </Tag>
              <Rate
                defaultValue={coffee.rating}
                disabled
                allowHalf
                style={{ marginTop: "24px" }}
              />
            </Card>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default App;
