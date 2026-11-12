"use client";
import { useState, useEffect } from "react";
import * as client from "./client";
import { FaPlusCircle, FaTrash, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";


type Todo = {
    id: number;
    title: string;
    completed: boolean;
    description?: string;
    editing?: boolean;
};

export default function WorkingWithRemoteArraysAsync() {
    const [todos, setTodos] = useState<Todo[]>([{ id: 1, title: "Task 1", completed: false, description: "This is task 1" }]);
    const fetchTodos = async () => {
        setTodos(await client.fetchTodos());
    };
    const removeTodo = async (todo: Todo) => {
        setTodos(await client.removeTodo(todo));
    };
    const createNewTodo = async () => {
        setTodos(await client.createNewTodo());
    };
    const postNewTodo = async () => {
        const newTodo = await client.postNewTodo({
            title: "New Posted Todo",
            completed: false,
        });
        setTodos([...todos, newTodo]);
    };
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const deleteTodo = async (todo: Todo) => {
        try {
            await client.deleteTodo(todo);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error) {
            const e = error as { response?: { data?: { message?: string } } };
            setErrorMessage(e.response?.data?.message ?? "Something went wrong");
        }
    };
    const editTodo = (todo: Todo) => {
        setTodos(todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t)));
    };
    const updateTodo = async (todo: Todo) => {
        await client.updateTodo(todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    };

    useEffect(() => { fetchTodos(); }, []);
    return (<><br /> <br />
        <h3>Todos</h3><FaPlusCircle onClick={() => createNewTodo()} id="wd-create-todo"
            className="cursor-pointer text-green-600" />
        <FaPlusCircle onClick={postNewTodo} id="wd-post-todo"
            className="cursor-pointer text-blue-600" />
        {todos.map((todo) => (
            <li key={todo.id}>
                <input type="checkbox" defaultChecked={todo.completed} />
                <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
                <FaTrash onClick={() => removeTodo(todo)} id="wd-remove-todo"
                    className="cursor-pointer text-red-600" />

                <TiDelete onClick={() => deleteTodo(todo)} id="wd-delete-todo"
                    className="cursor-pointer text-2xl text-red-600" />
                <FaPencilAlt onClick={() => editTodo(todo)} className="cursor-pointer text-blue-600" />
                <input type="checkbox" checked={todo.completed}
                    onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })} />
            </li>
        ))}
        {errorMessage && (
            <p id="wd-todo-error-message" className="rounded bg-red-100 px-3 py-2 text-red-800">
                {errorMessage}
            </p>
        )}
    </>);
}
