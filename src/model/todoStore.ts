import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type ToDoType = {
  title: string;
  isCompleted: boolean;
};

type ToDoState = {
  todos: ToDoType[];
};

type ToDoActions = {
  addTodo: (title: string) => void;
  changeIsCompleted: (index: number) => void;
};

const toDoSlice: StateCreator<
  ToDoState & ToDoActions,
  [["zustand/devtools", never]]
> = (set, get) => ({
  todos: [],
  addTodo: (title: string) => {
    const { todos } = get();

    set(
      { todos: [...todos, { title, isCompleted: false }] },
      false,
      `add ${title}`
    );
  },
  changeIsCompleted: (index: number) => {
    const { todos } = get();
    const newTodos = [
      ...todos.slice(0, index),
      { ...todos[index], isCompleted: !todos[index].isCompleted },
      ...todos.slice(index + 1),
    ];
    set(
      {
        todos: newTodos,
      },
      false,
      `chengeStatus of ${todos[index].title} to ${!todos[index].isCompleted}`
    );
  },
});

// `chengeStatus of ${todos[index].title} to ${!todos[index].isCompleted}`

export const useToDoStore = create<ToDoState & ToDoActions>()(
  devtools((...args) => ({
    ...toDoSlice(...args),
  }))
);

export const markAsCompleted = (index: number) => {
  const todos = useToDoStore.getState().todos;
  useToDoStore.setState(
    {
      todos: [
        ...todos.slice(0, index),
        { ...todos[index], isCompleted: !todos[index].isCompleted },
        ...todos.slice(index + 1),
      ],
    },
    false,
    `chengeStatus of ${todos[index].title} to ${!todos[index].isCompleted}`
  );
};
