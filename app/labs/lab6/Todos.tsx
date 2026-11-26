"use client";
import { useState } from "react";
import * as client from "./client";
import type { Todo } from "./client";

const inputClass =
    "block w-full max-w-md border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600";
const secondaryButton = "bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2";

// Describes each field of a todo document as "field: Type"
const schemaOf = (todo: Todo) =>
    Object.entries(todo).map(([field, value]) => {
        const type = typeof value;
        return `${field}: ${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    });

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [retrieved, setRetrieved] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [schemaId, setSchemaId] = useState<string | null>(null);
    const [error, setError] = useState("");

    const run = async (action: () => Promise<void>) => {
        setError("");
        try {
            await action();
        } catch (e) {
            const err = e as { response?: { data?: { message?: string } }; message?: string };
            setError(err.response?.data?.message ?? err.message ?? "Request failed");
        }
    };
    const showRetrieved = (found: Todo[]) => {
        setTodos(found);
        setRetrieved(found.length);
        setSchemaId(null);
    };
    const findAll = () => run(async () => showRetrieved(await client.findAllTodos()));
    const findCompleted = () => run(async () => showRetrieved(await client.findCompletedTodos()));
    const create = () =>
        run(async () => {
            const todo = await client.createTodo(title, description);
            setTodos([...todos, todo]);
            setTitle("");
            setDescription("");
        });
    const toggleCompleted = (todo: Todo) =>
        run(async () => {
            const updated = await client.setTodoCompleted(todo._id, !todo.completed);
            setTodos((current) => current.map((t) => (t._id === updated._id ? updated : t)));
        });
    const remove = (todo: Todo) =>
        run(async () => {
            await client.deleteTodo(todo._id);
            setTodos((current) => current.filter((t) => t._id !== todo._id));
            setRetrieved((count) => (count === null ? null : Math.max(count - 1, 0)));
        });

    return (
        <div id="wd-lab6-todos">
            <h3>Lab 6 todos (Mongoose CRUD)</h3>
            <input
                id="wd-lab6-todo-title"
                className={inputClass}
                placeholder="New todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                id="wd-lab6-todo-description"
                className={inputClass}
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button type="button" id="wd-lab6-find-all" className={secondaryButton} onClick={findAll}>
                Find all
            </button>
            <button type="button" id="wd-lab6-find-completed" className={secondaryButton} onClick={findCompleted}>
                Find completed
            </button>
            <button
                type="button"
                id="wd-lab6-create"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 disabled:opacity-50"
                onClick={create}
                disabled={!title.trim()}
            >
                Create
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {retrieved !== null && (
                <p id="wd-lab6-retrieved-count" className="mt-2 text-gray-700">
                    Retrieved {retrieved} {retrieved === 1 ? "todo" : "todos"}
                </p>
            )}
            <ul className="mt-2 max-w-md border border-gray-300 rounded-md divide-y divide-gray-300">
                {todos.map((todo) => (
                    <li key={todo._id} className="px-3 py-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id={`wd-lab6-completed-${todo._id}`}
                                checked={todo.completed}
                                onChange={() => toggleCompleted(todo)}
                                className="mr-2"
                            />
                            <span className="flex-1">
                                {todo.title}
                                {todo.description && (
                                    <span className="block text-sm text-gray-500">{todo.description}</span>
                                )}
                            </span>
                            <button
                                type="button"
                                id={`wd-lab6-schema-${todo._id}`}
                                className={secondaryButton}
                                onClick={() => setSchemaId(schemaId === todo._id ? null : todo._id)}
                            >
                                Schema
                            </button>
                            <button
                                type="button"
                                id={`wd-lab6-delete-${todo._id}`}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1"
                                onClick={() => remove(todo)}
                            >
                                Delete
                            </button>
                        </div>
                        {schemaId === todo._id && (
                            <pre className="mt-2 bg-gray-100 rounded-md p-2 text-sm whitespace-pre-wrap">
                                {schemaOf(todo).join("\n")}
                                {"\n\n"}
                                {JSON.stringify(todo, null, 2)}
                            </pre>
                        )}
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}
