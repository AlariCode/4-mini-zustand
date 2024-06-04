import { create, StateCreator } from "zustand";

type ToDoType = {
  title: string;
  isCompleted: boolean;
};

type ToDoState = {
  todos: ToDoType[];
};

type ToDoActions = {
  addTodo: (title: string) => void;
  markAsCompleted: (index: number) => void;
};

const toDoSlice: StateCreator<ToDoState & ToDoActions> = (set, get) => ({
  todos: [],
  addTodo: (title: string) => {
    const { todos } = get();
    set({ todos: [...todos, { title, isCompleted: false }] });
  },
  markAsCompleted: (index: number) => {
    const { todos } = get();
    const newTodos = [
      ...todos.slice(0, index),
      { ...todos[index], isCompleted: !todos[index].isCompleted },
      ...todos.slice(index + 1),
    ];
    set({
      todos: newTodos,
    });
  },
});

export const useToDoStore = create<ToDoState & ToDoActions>((...args) => ({
  ...toDoSlice(...args),
}));
