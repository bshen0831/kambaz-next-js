"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePazzaStore, type Folder } from "../../../../store/pazzaStore";
import { useCourseAccess } from "../users";

// Returns an error message, or "" when the name is fine
function validateFolderName(name: string, folders: Folder[], ignoreId?: string) {
    if (!name) return "Folder name is required.";
    if (/\s/.test(name)) return "Folder names can't contain spaces (use _ instead).";
    if (folders.some((f) => f._id !== ignoreId && f.name.toLowerCase() === name.toLowerCase())) {
        return `A folder named "${name}" already exists.`;
    }
    return "";
}

export default function ManageClass() {
    const { cid } = useParams<{ cid: string }>();
    const access = useCourseAccess(cid);
    const allFolders = usePazzaStore((state) => state.folders);
    const addFolder = usePazzaStore((state) => state.addFolder);
    const renameFolder = usePazzaStore((state) => state.renameFolder);
    const moveFolder = usePazzaStore((state) => state.moveFolder);
    const deleteFolders = usePazzaStore((state) => state.deleteFolders);
    const folders = allFolders.filter((folder) => folder.course === cid);

    const [newName, setNewName] = useState("");
    const [addError, setAddError] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [editing, setEditing] = useState<{ id: string; name: string; error: string } | null>(null);

    // Only this course's instructors may see this screen, even if the URL is typed in directly
    if (!access.instructor) {
        return (
            <div id="wd-pazza-manage-class-screen" className="wd-pazza-mcs">
                <h2 className="wd-pazza-form-title">Manage Class</h2>
                <p className="wd-pazza-error">Only instructors of this course can access Manage Class.</p>
                <Link href={`/courses/${cid}/pazza`} className="wd-pazza-link">
                    Back to Q &amp; A
                </Link>
            </div>
        );
    }

    const add = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = newName.trim();
        const error = validateFolderName(name, folders);
        setAddError(error);
        if (error) return;
        addFolder(cid, name);
        setNewName("");
    };

    const save = () => {
        if (!editing) return;
        const name = editing.name.trim();
        const error = validateFolderName(name, folders, editing.id);
        if (error) {
            setEditing({ ...editing, error });
            return;
        }
        renameFolder(editing.id, name);
        setEditing(null);
    };

    const toggleSelected = (folderId: string, checked: boolean) =>
        setSelected(checked ? [...selected, folderId] : selected.filter((id) => id !== folderId));

    const removeSelected = () => {
        const count = selected.length;
        const message = `Delete ${count} folder${count === 1 ? "" : "s"}? Posts stay, but lose these folder tags.`;
        if (!window.confirm(message)) return;
        deleteFolders(selected);
        if (editing && selected.includes(editing.id)) setEditing(null);
        setSelected([]);
    };

    return (
        <div id="wd-pazza-manage-class-screen" className="wd-pazza-mcs">
            {/* MCS tabs: only Manage Folders is required */}
            <div className="wd-pazza-mcs-tabs">
                <span className="wd-pazza-mcs-tab wd-active">Manage Folders</span>
            </div>

            <h2 className="wd-pazza-form-title">Configure Class Folders</h2>

            {/* Add a folder */}
            <form className="wd-pazza-add-folder" onSubmit={add}>
                <label htmlFor="wd-pazza-new-folder" className="wd-pazza-sr-only">
                    New folder name
                </label>
                <input
                    type="text"
                    id="wd-pazza-new-folder"
                    className="wd-pazza-input"
                    placeholder="Add a folder, e.g. hw7"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                />
                <button type="submit" id="wd-pazza-add-folder-btn" className="wd-pazza-primary-btn">
                    Add Folder
                </button>
            </form>
            {addError && <p className="wd-pazza-error wd-pazza-add-folder-error">{addError}</p>}

            {/* Folder list (in display order) */}
            {folders.length === 0 ? (
                <p className="wd-pazza-empty">No folders yet. Add one above.</p>
            ) : (
                <ul id="wd-pazza-folder-list" className="wd-pazza-folder-list">
                    {folders.map((folder, index) => (
                        <li key={folder._id} className="wd-pazza-folder-row">
                            <input
                                type="checkbox"
                                aria-label={`Select folder ${folder.name}`}
                                checked={selected.includes(folder._id)}
                                onChange={(event) => toggleSelected(folder._id, event.target.checked)}
                            />
                            {editing?.id === folder._id ? (
                                <>
                                    <div className="wd-pazza-folder-name-field">
                                        <input
                                            type="text"
                                            value={editing.name}
                                            aria-label="Folder name"
                                            className="wd-pazza-input"
                                            autoFocus
                                            onChange={(event) =>
                                                setEditing({ ...editing, name: event.target.value, error: "" })
                                            }
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") save();
                                                if (event.key === "Escape") setEditing(null);
                                            }}
                                        />
                                        {editing.error && <p className="wd-pazza-error">{editing.error}</p>}
                                    </div>
                                    <button type="button" className="wd-pazza-primary-btn" onClick={save}>
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="wd-pazza-secondary-btn"
                                        onClick={() => setEditing(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="wd-pazza-folder-name">{folder.name}</span>
                                    <button
                                        type="button"
                                        className="wd-pazza-secondary-btn"
                                        aria-label={`Move ${folder.name} up`}
                                        disabled={index === 0}
                                        onClick={() => moveFolder(folder._id, -1)}
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type="button"
                                        className="wd-pazza-secondary-btn"
                                        aria-label={`Move ${folder.name} down`}
                                        disabled={index === folders.length - 1}
                                        onClick={() => moveFolder(folder._id, 1)}
                                    >
                                        ▼
                                    </button>
                                    <button
                                        type="button"
                                        className="wd-pazza-secondary-btn"
                                        onClick={() => setEditing({ id: folder._id, name: folder.name, error: "" })}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <button
                type="button"
                id="wd-pazza-delete-folders-btn"
                className="wd-pazza-danger-btn"
                disabled={selected.length === 0}
                onClick={removeSelected}
            >
                Delete selected folders{selected.length > 0 ? ` (${selected.length})` : ""}
            </button>
        </div>
    );
}
