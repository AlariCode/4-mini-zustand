import "../App.css";
import { Button, Card, Input, Rate, Tag } from "antd";
import { useCoffeeStore } from "./model/coffeeStore";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { useUrlParamsStore } from "./helpers/useUrlStorage";

// import { useSearchStore } from "../model/searchStore";

function App() {
  const {
    params,
    setParams,
    coffeeList,
    cart,
    addToCart,
    orderCoffee,
    setAddress,
    address,
    clearCart,
  } = useCoffeeStore();
  const handleSearch = (text: string) => {
    setParams({ text });
  };

  //   useEffect(() => {
  //     setParams(params);
  //   }, []);

  //   useEffect(() => {
  //     setParams({ text: queryParams.get("text") || undefined });
  //   }, [queryParams]);

  //   useCoffeeStore.subscribe((state, prev) => {
  //     if (state.params?.text) {
  //       console.log(state.params.text);
  //       queryParams.set("text", state.params.text);
  //       setQueryParams(queryParams);
  //     }

  //     if (state.params?.text !== prev.params?.text && !state.params?.text) {
  //       queryParams.delete("text");
  //       setQueryParams(queryParams);
  //     }
  //   });

  useUrlParamsStore(params, setParams);

  return (
    <div className="wrapper">
      <a href="/about">About</a>
      <Input
        placeholder="Search"
        value={params?.text}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="container">
        {coffeeList ? (
          <div className="cardsContainer">
            {coffeeList.map((coffee) => (
              <Card
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
            ))}
          </div>
        ) : (
          <span>По запросу не нашлось ни одного напитка</span>
        )}

        <aside className="sider">
          <h1>Cart</h1>
          {cart ? (
            <>
              {cart.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
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
          ) : (
            <span>Your cart is empty</span>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
