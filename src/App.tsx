import "../App.css";
import { SearchInput } from "./components/SearchInput";
import { CoffeList } from "./components/CoffeeList";
import { Cart } from "./components/Cart";
import { CartActions } from "./components/CartActions";

// import { useSearchStore } from "../model/searchStore";

function App() {
  return (
    <div className="wrapper">
      <a href="/about">About</a>
      <SearchInput />
      <div className="container">
        <CoffeList />
        <aside className="sider">
          <h1>Cart</h1>
          <Cart />
          <CartActions />
        </aside>
      </div>
    </div>
  );
}

export default App;
