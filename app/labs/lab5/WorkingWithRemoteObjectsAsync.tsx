"use client";
import { useState, useEffect } from "react";
import * as client from "./client";

export default function WorkingWithRemoteObjectsAsync() {
    const [assignment, setAssignment] = useState({ title: "On my own assignment", description: "something i did on my own", due: "2021-10-10", completed: false, score: 0 });
    const fetchAssignment = async () => {
        setAssignment(await client.fetchAssignment());
    };
    const updateTitle = async () => {
        setAssignment(await client.updateTitle(assignment.title));
    };
    useEffect(() => { fetchAssignment(); }, []);
    return (<>

        <p>Assignment: <b>{assignment.title}</b></p>
        <br />
        <h4>Updating Assignment Title</h4>
        <input id="wd-assignment-title" value={assignment.title} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
        <button type="button" onClick={updateTitle}>Update Title</button>
        <p>Updated Assignment Title : <b>{assignment.title}</b></p>
        <input id="wd-assignment-description" value={assignment.description} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
        <span id="wd-assignment-description">Assignment description: {assignment.description}</span>
        <br />
        <input id="wd-assignment-due" value={assignment.due} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
        <span id="wd-assignment-due">Assignment due date: {assignment.due}</span>
        <br />
        <input id="wd-assignment-completed" type="checkbox" checked={assignment.completed} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
        <span id="wd-assignment-completed">Assignment completed: {assignment.completed ? "Yes" : "No"}</span>
        <br />
        <input id="wd-assignment-score" value={assignment.score} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
        <span id="wd-assignment-score">Assignment score: {assignment.score}</span>
    </>);
}

