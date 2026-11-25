"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { useAccountContext, type User } from "../../../../account/AccountContext";
import * as usersClient from "../../../../users/client";
import type { Person } from "../../../../users/client";
import PersonEditor from "./PersonEditor";

const FACULTY_ROLES = ["FACULTY", "ADMIN"];

export default function PeopleTable() {
    const { cid } = useParams<{ cid: string }>();
    const { currentUser, setCurrentUser } = useAccountContext();
    const isFaculty = !!currentUser && FACULTY_ROLES.includes(currentUser.role);
    const [people, setPeople] = useState<Person[]>([]);
    // undefined: editor closed, null: creating a new person, Person: editing
    const [editing, setEditing] = useState<Person | null | undefined>(undefined);

    useEffect(() => {
        const load = async () => {
            setPeople(await usersClient.findUsersForCourse(cid));
        };
        load();
    }, [cid]);

    const onSave = async (person: Omit<Person, "_id"> & { _id?: string }) => {
        if (person._id) {
            const saved = await usersClient.updateUser({ ...person, _id: person._id });
            setPeople(people.map((p) => (p._id === saved._id ? saved : p)));
            if (saved._id === currentUser?._id) setCurrentUser(saved as User);
        } else {
            const created = await usersClient.createUserForCourse(cid, person);
            setPeople([...people, created]);
        }
    };
    const onDelete = async (userId: string) => {
        await usersClient.deleteUser(userId);
        setPeople(people.filter((p) => p._id !== userId));
    };

    return (
        <div id="wd-people-table" className="overflow-x-auto">
            {isFaculty && (
                <div className="mb-3 flex justify-end">
                    <button
                        type="button"
                        id="wd-add-person"
                        className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                        onClick={() => setEditing(null)}
                    >
                        <FaPlus /> People
                    </button>
                </div>
            )}
            <table className="w-full border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-neutral-300">
                        <th className="p-2">Name</th>
                        <th className="p-2">Login ID</th>
                        <th className="p-2">Section</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Last Activity</th>
                        <th className="p-2">Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((user) => (
                        <tr key={user._id} className="odd:bg-neutral-50">
                            <td className="wd-full-name p-2 text-nowrap">
                                <FaUserCircle className="me-2 inline align-middle text-3xl text-neutral-500" />
                                {isFaculty ? (
                                    <button
                                        type="button"
                                        className="text-red-700 hover:underline"
                                        onClick={() => setEditing(user)}
                                    >
                                        <span className="wd-first-name">{user.firstName}</span>{" "}
                                        <span className="wd-last-name">{user.lastName}</span>
                                    </button>
                                ) : (
                                    <>
                                        <span className="wd-first-name">{user.firstName}</span>{" "}
                                        <span className="wd-last-name">{user.lastName}</span>
                                    </>
                                )}
                            </td>
                            <td className="wd-login-id p-2">{user.loginId}</td>
                            <td className="wd-section p-2">{user.section}</td>
                            <td className="wd-role p-2">{user.role}</td>
                            <td className="wd-last-activity p-2">{user.lastActivity}</td>
                            <td className="wd-total-activity p-2">{user.totalActivity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editing !== undefined && (
                <PersonEditor
                    key={editing?._id ?? "new"}
                    person={editing ?? undefined}
                    canDelete={editing?._id !== currentUser?._id}
                    onSave={onSave}
                    onDelete={onDelete}
                    onClose={() => setEditing(undefined)}
                />
            )}
        </div>
    );
}
