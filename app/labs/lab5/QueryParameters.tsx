"use client";

import { useState } from "react";

export default function PathParameters() {
    const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");
    return (
        <>
            <br />
            <div className="flex gap-2 mb-3">
                <input type="number" id="wd-path-parameter-a" value={a}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={(e) => setA(e.target.value)} />
                <input type="number" id="wd-path-parameter-b" value={b}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={(e) => setB(e.target.value)} />
            </div>
            <div className="flex flex-col items-start gap-2">
                <a id="wd-path-parameter-add"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
                    Add {a} + {b}
                </a>
                <a id="wd-path-parameter-subtract"
                    className="inline-block bg-red-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
                    Subtract {a} - {b}
                </a>
                <a id="wd-path-parameter-multiply"
                    className="inline-block bg-green-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
                    Multiply {a} * {b}
                </a>
                <a id="wd-path-parameter-divide"
                    className="inline-block bg-orange-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
                    Divide {a} / {b}
                </a>
            </div>

        </>
    );
};