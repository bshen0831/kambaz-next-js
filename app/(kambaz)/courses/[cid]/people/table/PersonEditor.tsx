"use client";

import { useState } from "react";
import type { Person } from "../../../../users/client";

const ROLES = ["STUDENT", "TA", "FACULTY", "ADMIN"];

export const emptyPerson: Omit<Person, "_id"> = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
    loginId: "",
    section: "",
    lastActivity: "",
    totalActivity: "",
};

export default function PersonEditor({
    person,
    canDelete,
    onSave,
    onDelete,
    onClose,
}: {
    /** undefined means "create a new person" */
    person?: Person;
    canDelete: boolean;
    onSave: (person: Omit<Person, "_id"> & { _id?: string }) => Promise<void>;
    onDelete: (userId: string) => Promise<void>;
    onClose: () => void;
}) {
    const isNew = !person;
    const [draft, setDraft] = useState<Omit<Person, "_id"> & { _id?: string }>(
        person ? { ...person, password: "" } : emptyPerson,
    );
    const [error, setError] = useState("");

    const run = async (action: () => Promise<void>) => {
        setError("");
        try {
            await action();
            onClose();
        } catch (e) {
            const message = (e as { response?: { data?: { message?: string } } })
                .response?.data?.message;
            setError(message ?? "Something went wrong. Please try again.");
        }
    };

    const save = () => {
        if (!draft.username.trim() || (isNew && !draft.password)) {
            setError("Username and password are required.");
            return;
        }
        // A blank password while editing means "leave it unchanged"
        const toSave = { ...draft };
        if (!isNew && !toSave.password) delete toSave.password;
        run(() => onSave(toSave));
    };

    const field = (key: keyof typeof draft, label: string, type = "text") => (
        <label className="block text-sm">
            <span className="mb-1 block font-medium">{label}</span>
            <input
                id={`wd-person-${key}`}
                type={type}
                className="w-full rounded border border-neutral-300 px-3 py-1.5"
                value={(draft[key] as string) ?? ""}
                placeholder={key === "password" && !isNew ? "Leave blank to keep current" : ""}
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
            />
        </label>
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            id="wd-person-editor"
        >
            <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
                    <h3 className="m-0 text-lg font-semibold">
                        {isNew ? "Add Person" : `${person.firstName} ${person.lastName}`}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl leading-none text-neutral-500"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-2">
                    {field("firstName", "First name")}
                    {field("lastName", "Last name")}
                    {field("username", "Username")}
                    {field("password", "Password", "password")}
                    {field("email", "Email", "email")}
                    {field("loginId", "Login ID")}
                    {field("section", "Section")}
                    <label className="block text-sm">
                        <span className="mb-1 block font-medium">Role</span>
                        <select
                            id="wd-person-role"
                            className="w-full rounded border border-neutral-300 px-3 py-1.5"
                            value={draft.role}
                            onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                        >
                            {ROLES.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                {error && <p className="px-4 text-sm text-red-600">{error}</p>}
                <div className="flex justify-between gap-2 border-t border-neutral-200 px-4 py-3">
                    <div>
                        {!isNew && canDelete && (
                            <button
                                type="button"
                                id="wd-person-delete"
                                className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                                onClick={() => {
                                    if (window.confirm(`Delete ${person.firstName} ${person.lastName}?`)) {
                                        run(() => onDelete(person._id));
                                    }
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            id="wd-person-save"
                            onClick={save}
                            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
