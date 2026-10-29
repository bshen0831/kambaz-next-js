import { useState, type ReactNode } from "react";
import { TodosContext, useTodosContext, type Todo } from "./todosContext";

export function TodosProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Learn React context" },
        { id: 2, title: "Wire up add, update, and delete" },
    ]);

    const addTodo = (title: string) =>
        setTodos((prev) => [
            ...prev,
            { id: Math.max(0, ...prev.map((t) => t.id)) + 1, title },
        ]);

    const updateTodo = (id: number, title: string) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

    const deleteTodo = (id: number) =>
        setTodos((prev) => prev.filter((t) => t.id !== id));

    return (
        <TodosContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
            {children}
        </TodosContext.Provider>
    );
}

function TodoItems() {
    const { todos, updateTodo, deleteTodo } = useTodosContext();
    return (
        <ul id="wd-context-todo-items">
            {todos.map((todo) => (
                <li key={todo.id} className="mb-2 flex items-center gap-2">
                    <input
                        value={todo.title}
                        onChange={(e) => updateTodo(todo.id, e.target.value)}
                        className="rounded border px-2 py-1"
                    />
                    <button
                        type="button"
                        onClick={() => deleteTodo(todo.id)}
                        className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

function TodoAdd() {
    const { addTodo } = useTodosContext();
    const [title, setTitle] = useState("");
    const handleAdd = () => {
        if (!title.trim()) return;
        addTodo(title.trim());
        setTitle("");
    };
    return (
        <div className="mb-3 flex items-center gap-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New todo"
                className="rounded border px-2 py-1"
            />
            <button
                type="button"
                onClick={handleAdd}
                className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
            >
                Add
            </button>
        </div>
    );
}

export default function ReactContextTodoList() {
    return (
        <div id="wd-context-todo-list">
            <h3>Todo List (Context)</h3>
            <TodosProvider>
                <TodoAdd />
                <TodoItems />
            </TodosProvider>
        </div>
    );
}
