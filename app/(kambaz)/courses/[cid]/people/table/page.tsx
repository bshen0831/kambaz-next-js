"use client";

import { useState } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { emptyUser, type User } from "../../../../account/AccountContext";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";
import { useUsersStore } from "../../../../store/usersStore";

const textFields: { key: keyof User; label: string }[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "username", label: "Username" },
    { key: "password", label: "Password" },
    { key: "email", label: "Email" },
    { key: "loginId", label: "Login ID" },
    { key: "section", label: "Section" },
];

export default function PeopleTable() {
    const { cid } = useParams<{ cid: string }>();
    const users = useUsersStore((state) => state.users);
    const addUser = useUsersStore((state) => state.addUser);
    const enrollments = useEnrollmentsStore((state) => state.enrollments);
    const enroll = useEnrollmentsStore((state) => state.enroll);
    const [draft, setDraft] = useState<User>(emptyUser);
    const [showForm, setShowForm] = useState(false);

    const enrolled = users.filter((usr) =>
        enrollments.some(
            (enrollment) => enrollment.user === usr._id && enrollment.course === cid,
        ),
    );

    const handleAdd = () => {
        if (!draft.username || !draft.password) return;
        const userId = addUser(draft);
        enroll(userId, cid);
        setDraft(emptyUser);
        setShowForm(false);
    };

    return (
        <div id="wd-people-table" className="overflow-x-auto">
            <div className="mb-3 flex justify-end">
                <button
                    type="button"
                    id="wd-add-person"
                    className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                    onClick={() => setShowForm(!showForm)}
                >
                    <FaPlus /> Person
                </button>
            </div>
            {showForm && (
                <div id="wd-add-person-form" className="mb-4 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                    {textFields.map(({ key, label }) => (
                        <label key={key} className="block text-sm font-medium">
                            {label}
                            <input
                                type={key === "password" ? "password" : "text"}
                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal"
                                value={draft[key]}
                                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                            />
                        </label>
                    ))}
                    <label className="block text-sm font-medium">
                        Role
                        <select
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal"
                            value={draft.role}
                            onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                        >
                            <option value="STUDENT">Student</option>
                            <option value="TA">TA</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </label>
                    <div className="sm:col-span-2">
                        <button
                            type="button"
                            id="wd-save-person"
                            className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                            onClick={handleAdd}
                        >
                            Add Person
                        </button>
                    </div>
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
                    {enrolled.map((user) => (
                        <tr key={user._id} className="odd:bg-neutral-50">
                            <td className="wd-full-name p-2 text-nowrap">
                                <FaUserCircle className="me-2 inline align-middle text-3xl text-neutral-500" />
                                <span className="wd-first-name">{user.firstName}</span>{" "}
                                <span className="wd-last-name">{user.lastName}</span>
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
        </div>
    );
}
