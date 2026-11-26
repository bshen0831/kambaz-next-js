"use client";
import { useEffect, useRef, useState } from "react";
import * as client from "./client";
import type { LabUser } from "./client";

const inputClass =
    "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600";
const secondaryButton = "bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2";
const ROLES = ["STUDENT", "TA", "FACULTY", "ADMIN"];

const fullName = (user: LabUser) => `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

// Turns a failed request into a message for the page
const errorMessage = (e: unknown) => {
    const err = e as { response?: { status?: number; data?: { message?: string } }; message?: string };
    const status = err.response?.status;
    if (status === 401 || status === 403) return "Sign in to Kambaz as faculty or admin to do that.";
    return err.response?.data?.message ?? err.message ?? "Request failed";
};

export default function Users() {
    const [users, setUsers] = useState<LabUser[]>([]);
    const [name, setName] = useState(""); // search text
    const [role, setRole] = useState(""); // role picked in the dropdown
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    // Only the latest search may update the list (typing fires a request per keystroke)
    const latestRequest = useRef(0);

    const run = async (action: () => Promise<void>) => {
        setError("");
        try {
            await action();
        } catch (e) {
            setError(errorMessage(e));
        }
    };

    // The server filters by role or by name; with both, ask for the role and narrow by name here
    const loadUsers = (nameText: string, roleValue: string) =>
        run(async () => {
            const request = ++latestRequest.current;
            let found: LabUser[];
            if (roleValue) {
                const needle = nameText.trim().toLowerCase();
                found = (await client.findUsers({ role: roleValue })).filter(
                    (u) => !needle || fullName(u).toLowerCase().includes(needle),
                );
            } else {
                found = await client.findUsers({ name: nameText.trim() });
            }
            if (request === latestRequest.current) setUsers(found);
        });

    useEffect(() => {
        client
            .findUsers()
            .then(setUsers)
            .catch((e) => setError(errorMessage(e)));
    }, []);

    const search = (text: string) => {
        setName(text);
        loadUsers(text, role);
    };
    // Picking a role filters right away
    const filterByRole = (roleValue: string) => {
        setRole(roleValue);
        loadUsers(name, roleValue);
    };

    const addUser = () =>
        run(async () => {
            const n = users.length + 1;
            const user = await client.createUser({
                firstName: "New",
                lastName: `User ${n}`,
                username: `newuser${Date.now()}`, // unique even for back-to-back clicks
                password: "password123",
                email: `email${n}@neu.edu`,
                section: "S101",
                role: "STUDENT",
            });
            setUsers((current) => [...current, user]);
        });

    const selected = users.find((u) => u._id === selectedId) ?? null;

    const select = (user: LabUser) => {
        setSelectedId(user._id);
        setEditing(false);
        setError("");
    };
    const closeDetails = () => {
        setSelectedId(null);
        setEditing(false);
    };
    const startEditing = () => {
        if (!selected) return;
        setFirstName(selected.firstName ?? "");
        setLastName(selected.lastName ?? "");
        setEditing(true);
    };
    const save = () =>
        run(async () => {
            if (!selected) return;
            await client.updateUser({
                _id: selected._id,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            });
            // Read the user back so the page shows what the database now holds
            const saved = await client.findUserById(selected._id);
            setUsers((current) => current.map((u) => (u._id === saved._id ? saved : u)));
            setEditing(false);
        });
    const remove = () =>
        run(async () => {
            if (!selected) return;
            await client.deleteUser(selected._id);
            setUsers((current) => current.filter((u) => u._id !== selected._id));
            closeDetails();
        });

    return (
        <div id="wd-lab6-users">
            <h3>Lab 6 users</h3>
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <input
                    id="wd-lab6-users-search"
                    className={inputClass}
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => search(e.target.value)}
                />
                <select
                    id="wd-lab6-users-role"
                    className={inputClass}
                    value={role}
                    onChange={(e) => filterByRole(e.target.value)}
                >
                    <option value="">All roles</option>
                    {ROLES.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    id="wd-lab6-users-add"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1"
                    onClick={addUser}
                >
                    + Users
                </button>
            </div>
            {error && <p id="wd-lab6-users-error" style={{ color: "red" }}>{error}</p>}
            <p id="wd-lab6-users-count" className="text-gray-700">
                {users.length} {users.length === 1 ? "user" : "users"}
            </p>
            <ul className="mt-2 max-w-md border border-gray-300 rounded-md divide-y divide-gray-300">
                {users.map((user) => (
                    <li key={user._id} className="flex items-center px-3 py-2">
                        <button
                            type="button"
                            className={`wd-lab6-user-name flex-1 text-left hover:underline ${
                                user._id === selectedId ? "font-semibold text-blue-700" : "text-blue-600"
                            }`}
                            onClick={() => select(user)}
                        >
                            {fullName(user) || user.username}
                        </button>
                        {/* inline margins: Tailwind isn't loaded on the labs pages */}
                        <span
                            className="wd-lab6-user-email mx-3 text-sm text-gray-700"
                            style={{ margin: "0 0.75rem" }}
                        >
                            {user.email}
                        </span>
                        <span className="text-sm text-gray-500" style={{ color: "#6b7280" }}>
                            {user.role}
                        </span>
                    </li>
                ))}
            </ul>

            {selected && (
                <div
                    id="wd-lab6-user-details"
                    className="mt-4 max-w-md border border-gray-300 rounded-md p-3"
                >
                    {editing ? (
                        <div className="mb-2 flex gap-2">
                            <input
                                id="wd-lab6-user-first-name"
                                className={`${inputClass} w-1/2`}
                                aria-label="First name"
                                value={firstName}
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && save()}
                            />
                            <input
                                id="wd-lab6-user-last-name"
                                className={`${inputClass} w-1/2`}
                                aria-label="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && save()}
                            />
                        </div>
                    ) : (
                        <h4 id="wd-lab6-user-full-name" className="mb-2 text-lg font-semibold">
                            {fullName(selected) || selected.username}
                        </h4>
                    )}
                    <dl className="mb-3 grid grid-cols-[auto_1fr] gap-x-3 text-sm">
                        <dt className="font-semibold">Username</dt>
                        <dd>{selected.username}</dd>
                        <dt className="font-semibold">Email</dt>
                        <dd>{selected.email}</dd>
                        <dt className="font-semibold">Role</dt>
                        <dd>{selected.role}</dd>
                        <dt className="font-semibold">Section</dt>
                        <dd>{selected.section}</dd>
                        <dt className="font-semibold">Login ID</dt>
                        <dd>{selected.loginId}</dd>
                    </dl>
                    {editing ? (
                        <button
                            type="button"
                            id="wd-lab6-user-save"
                            className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1 mr-2"
                            onClick={save}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            type="button"
                            id="wd-lab6-user-edit"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 mr-2"
                            onClick={startEditing}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        type="button"
                        id="wd-lab6-user-delete"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 mr-2"
                        onClick={remove}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        id="wd-lab6-user-cancel"
                        className={secondaryButton}
                        onClick={closeDetails}
                    >
                        Cancel
                    </button>
                </div>
            )}
            <hr />
        </div>
    );
}
