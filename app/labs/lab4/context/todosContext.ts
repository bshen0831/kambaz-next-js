import { createContext, useContext } from "react";

export type Todo = {
    id: number;
    title: string;
};

export type TodosContextValue = {
    todos: Todo[];
    addTodo: (title: string) => void;
    updateTodo: (id: number, title: string) => void;
    deleteTodo: (id: number) => void;
};

export const TodosContext = createContext<TodosContextValue | null>(null);

export function useTodosContext() {
    const value = useContext(TodosContext);
    if (!value) {
        throw new Error("useTodosContext must be used inside TodosProvider");
    }
    return value;
}
