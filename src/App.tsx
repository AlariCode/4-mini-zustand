import "./App.css";
import { Button, Card, Input, Rate, Tag } from "antd";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

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
  return (
    <div className="wrapper">
      <Input
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
      )}
    </div>
  );
}

export default App;
