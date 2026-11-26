"use client";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { FaUserCircle } from "react-icons/fa";
import { FaCheck, FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";
import type { Person } from "../../../users/client";
import { ROLE_OPTIONS } from "../../../account/roles";

export default function PeopleDetails({
    uid,
    onClose,
}: {
    uid: string | null;
    onClose: () => void;
}) {
    const [user, setUser] = useState<Person | null>(null);
    const [error, setError] = useState("");
    useEffect(() => {
        if (!uid) return;
        let cancelled = false;
        client.findUserById(uid).then((user: Person) => {
            // ignore a slow response for a user that is no longer selected
            if (!cancelled) setUser(user);
        });
        return () => {
            cancelled = true;
        };
    }, [uid]);
    const deleteUser = async (userId: string) => {
        try {
            await client.deleteUser(userId);
            // closing also makes the table refetch, so the deleted user disappears
            onClose();
        } catch (e) {
            const message = isAxiosError(e) ? e.response?.data?.message : undefined;
            setError(message ?? "Could not delete this user");
        }
    };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editing, setEditing] = useState(false);
    // Start editing with the inputs prefilled from the current user
    const startEditing = () => {
        if (!user) return;
        setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
        setEmail(user.email ?? "");
        setRole(user.role);
        setEditing(true);
    };
    const saveUser = async () => {
        if (!user) return;
        // First word is the first name; everything after it is the last name ("Janet Van Dyne")
        const [firstName = "", ...rest] = name.trim().split(/\s+/);
        const updatedUser = {
            ...user,
            firstName,
            lastName: rest.join(" "),
            email: email.trim(),
            role,
        };
        try {
            const saved: Person = await client.updateUser(updatedUser);
            setUser(saved);
            setEditing(false);
            // closing makes People Table refetch, so the row shows the new name
            onClose();
        } catch (e) {
            const message = isAxiosError(e) ? e.response?.data?.message : undefined;
            setError(message ?? "Could not save this user");
        }
    };
    if (!uid) return null;

    return (
        <div className="wd-people-details fixed top-0 end-0 bottom-0 z-20 w-full max-w-sm bg-white p-4 shadow">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="wd-close-details absolute end-2 top-2 cursor-pointer border-0 bg-transparent p-0"
            >
                <IoCloseSharp className="text-3xl" />
            </button>
            <div className="mt-2 text-center">
                <FaUserCircle className="me-2 text-4xl text-neutral-500" />
            </div>
            <hr />
            {!editing && (
                <>
                    <div className="flex items-center gap-2 text-lg">
                        <span
                            className="wd-name cursor-pointer text-red-700"
                            onClick={startEditing}
                        >
                            {user?.firstName} {user?.lastName}
                        </span>
                        <button
                            type="button"
                            onClick={startEditing}
                            aria-label="Edit user"
                            className="wd-edit ms-auto cursor-pointer border-0 bg-transparent p-0"
                        >
                            <FaPencil />
                        </button>
                    </div>
                    <b>Email:</b> <span className="wd-email">{user?.email}</span>
                    <br />
                    <b>Roles:</b> <span className="wd-roles">{user?.role}</span>
                    <br />
                </>
            )}
            {editing && (
                // A form so Enter in any field saves, and the browser validates the email first
                <form
                    className="mb-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveUser();
                    }}
                >
                    <div className="mb-2 flex items-center gap-2 text-lg">
                        <input
                            className="wd-edit-name w-full rounded border border-neutral-300 px-2 py-1"
                            aria-label="Name"
                            value={name}
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            type="submit"
                            aria-label="Save user"
                            className="wd-save cursor-pointer border-0 bg-transparent p-0 text-green-600"
                        >
                            <FaCheck />
                        </button>
                    </div>
                    <label className="mb-2 block">
                        <b>Email:</b>
                        <input
                            type="email"
                            className="wd-edit-email mt-1 w-full rounded border border-neutral-300 px-2 py-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="mb-2 block">
                        <b>Role:</b>
                        <select
                            className="wd-edit-role mt-1 w-full rounded border border-neutral-300 px-2 py-1"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            {ROLE_OPTIONS.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>
                </form>
            )}
            <b>Login ID:</b> <span className="wd-login-id">{user?.loginId}</span>
            <br />
            <b>Section:</b> <span className="wd-section">{user?.section}</span>
            <br />
            <b>Total Activity:</b>{" "}
            <span className="wd-total-activity">{user?.totalActivity}</span>
            <hr />
            {error && <div className="wd-delete-error mb-2 text-sm text-red-700">{error}</div>}
            <button
                type="button"
                onClick={() => deleteUser(uid)}
                className="wd-delete float-end rounded bg-red-600 px-3 py-1 text-sm text-white"
            >
                Delete
            </button>
            <button
                type="button"
                onClick={onClose}
                className="wd-cancel float-end me-2 rounded bg-neutral-200 px-3 py-1 text-sm"
            >
                Cancel
            </button>
        </div>
    );
}