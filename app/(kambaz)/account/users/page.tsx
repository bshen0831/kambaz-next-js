"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../courses/[cid]/people/Table";
import * as client from "../client";
import type { Person } from "../../users/client";
import { ROLE_OPTIONS } from "../roles";

export default function Users() {
    const [users, setUsers] = useState<Person[]>([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => {
        client.findAllUsers().then(setUsers);
    }, []);
    const [role, setRole] = useState("");
    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const [name, setName] = useState("");
    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const createUser = async () => {
        const user = await client.createUser({
            firstName: "New",
            lastName: `User ${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
        });
        // functional update so back-to-back clicks don't overwrite each other's new row
        setUsers((current) => [...current, user]);
    };
    return (
        <div>

            <button
                type="button"
                onClick={createUser}
                className="wd-add-people float-end inline-flex cursor-pointer items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
            >
                <FaPlus /> Users
            </button>
            <h3>Users</h3>
            <select
                value={role}
                onChange={(e) => filterUsersByRole(e.target.value)}
                className="wd-select-role mb-2 w-1/4 rounded border border-neutral-300 px-2 py-1"
            >
                <option value="">All Roles</option>
                {ROLE_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <input
                className="wd-filter-by-name me-2 mb-2 w-1/4 rounded border border-neutral-300 px-2 py-1"
                placeholder="Search people"
                value={name}
                onChange={(e) => filterUsersByName(e.target.value)}
            />
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}
