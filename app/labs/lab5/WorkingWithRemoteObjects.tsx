"use client";

import { useState } from "react";

export default function WorkingWithRemoteObjects() {
    const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    const [module, setModule] = useState({
        id: 21, name: "On my own assignment",
        description: "something i did on my own",
        course: "Web Development",
    });
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
    return (
        <>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${HTTP_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <br />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${HTTP_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <br />
            <h4>Updating Properties</h4>
            <a id="wd-update-assignment-title"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <br />
            <br />
            <input id="wd-assignment-title" value={assignment.title} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />

            <h4>Retrieving Module</h4>
            <a id="wd-retrieve-module"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a>
            <br />
            <h4>Retrieving Module Properties</h4>
            <a id="wd-retrieve-assignment-name"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${MODULE_API_URL}/name`}>
                Get Module Name
            </a>
            <br />
            <h4>Updating Module name</h4>
            <a id="wd-update-assignment-name"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Module Name
            </a>
            <br />

            <br />
            <input id="wd-assignment-title" value={module.name} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setModule({ ...module, name: e.target.value })} />

            <h4>Updating Module description</h4>
            <a id="wd-update-assignment-description"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Module descrition
            </a>
            <br />

            <br />
            <input id="wd-assignment-description" value={module.description} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setModule({ ...module, description: e.target.value })} />

        </>
    );
} 