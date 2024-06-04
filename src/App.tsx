import "./App.css";
import { Card, Checkbox, Input } from "antd";
import { markAsCompleted, useToDoStore } from "./model/todoStore";
import { useState } from "react";

function App() {
  const { todos, addTodo } = useToDoStore();
  const [value, setValue] = useState<string>("");
  return (
    <div className="wrapper">
      <Input
        style={{ width: 300 }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(value);
            setValue("");
          }
        }}
      />
      {todos.map((todo, index) => (
        <Card className="card" key={todo.title}>
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => markAsCompleted(index)}
          />
          <span>{todo.title}</span>
        </Card>
      ))}
    </div>
  );
}

export default App;
