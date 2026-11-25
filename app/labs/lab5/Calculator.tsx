"use client";

import { useState } from "react";

export default function Calculator() {
    const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");
    const [operation, setOperation] = useState("add");
    return (
        <>
            <br />
            <h3> Calculator</h3>
            <div className="flex gap-2 mb-3">
                <label htmlFor="wd-path-parameter-b" className="text-gray-700">A:</label>
                <input type="number" id="wd-path-parameter-a" value={a}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={(e) => setA(e.target.value)} />
                <br />
                <label htmlFor="wd-path-parameter-b" className="text-gray-700">B:</label>
                <input type="number" id="wd-path-parameter-b" value={b}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={(e) => setB(e.target.value)} />
                <br />
                <label htmlFor="wd-path-parameter-operation" className="text-gray-700">Operation:</label>
                <select id="wd-path-parameter-operation" value={operation}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={(e) => setOperation(e.target.value)}>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
                <a id="wd-path-parameter-calculate"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
                    href={`http://localhost:3000/api/lab5/calculator?a=${a}&b=${b}&operation=${operation}`}>
                    Calculate {a} {operation} {b}
                </a>
            </div>

        </>);
};