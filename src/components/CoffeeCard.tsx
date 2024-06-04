import { Button, Card, Rate, Tag } from "antd";
import { CoffeeType } from "../types/coffeTypes";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../model/coffeeStore";
import "../App.css";

export const CoffeeCard = ({ coffee }: { coffee: CoffeeType }) => {
  return (
    <Card
      className="card"
      hoverable
      key={coffee.id}
      cover={<img src={coffee.image} />}
      actions={[
        <Button
          icon={<ShoppingCartOutlined />}
          key={coffee.name}
          onClick={() => addToCart(coffee)}
        >
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
  );
};
