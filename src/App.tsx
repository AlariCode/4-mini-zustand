import "./App.css";
import { addTen } from "./helpers/addTen";
import { useCounterStore } from "./model/counterStore";

function App() {
  const { counter, decrement, increment } = useCounterStore();
  return (
    <div className="wrapper">
      <button onClick={increment}>+</button>
      <span>{counter}</span>
      <button onClick={decrement}>-</button>
      <button onClick={addTen}>add 10</button>
    </div>
  );
}

export default App;
