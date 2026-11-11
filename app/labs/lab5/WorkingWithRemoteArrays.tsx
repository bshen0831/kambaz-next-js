"use client";

import { useState } from "react";

export default function WorkingWithRemoteArrays() {
    const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
    const API = `${HTTP_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({ id: "1", title: "Task 1", completed: false, description: "This is task 1" });
    return (
        <>
            <br />
            <br />
            <a id="wd-retrieve-todos" href={API}>Get Todos</a>
            <br />
            <br />
            <a id="wd-retrieve-todo-by-id" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <input id="wd-todo-id" value={todo.id}
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
            <br />
            <a id="wd-retrieve-completed-todos" href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <br />
            <a id="wd-create-todo" href={`${API}/create`}>Create Todo</a>
            <br />
            <a id="wd-remove-todo" href={`${API}/${todo.id}/delete`}>
                Remove Todo with ID = {todo.id}
            </a>
            <br />
            <a href={`${API}/${todo.id}/title/${todo.title}`} id="wd-update-todo-title">
                Update Todo ID {todo.id} Title to {todo.title}
            </a>
            <input value={todo.id} onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
            <br />
            <input value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            <br />
            <input type="checkbox" checked={todo.completed} onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} />
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} id="wd-update-todo-completed">
                Update Todo ID {todo.id} Completed
            </a>
            <br />
            <a href={`${API}/${todo.id}/description/${todo.description}`} id="wd-update-todo-description">
                Update Todo ID {todo.id} Description
            </a>
            <input value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
            <br />

        </>
    );
};