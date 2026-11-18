"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccountContext } from "../../../../account/AccountContext";
import { INSTRUCTOR_ROLES } from "../components/PazzaNavBar";
import { DEFAULT_FOLDERS } from "../folders";

export default function ManageClass() {
    const { cid } = useParams<{ cid: string }>();
    const { currentUser } = useAccountContext();
    const isInstructor = INSTRUCTOR_ROLES.includes(currentUser?.role ?? "");
    const editingFolder = "hw2"; // skeleton: type a folder name here (e.g. "hw2") to preview the edit mode

    // Only instructors may see this screen, even if the URL is typed in directly
    if (!isInstructor) {
        return (
            <div id="wd-pazza-manage-class-screen" className="wd-pazza-mcs">
                <h2 className="wd-pazza-form-title">Manage Class</h2>
                <p className="wd-pazza-error">Only instructors can access Manage Class.</p>
                <Link href={`/courses/${cid}/pazza`} className="wd-pazza-link">
                    Back to Q &amp; A
                </Link>
            </div>
        );
    }

    return (
        <div id="wd-pazza-manage-class-screen" className="wd-pazza-mcs">
            {/* MCS tabs: only Manage Folders is required */}
            <div className="wd-pazza-mcs-tabs">
                <span className="wd-pazza-mcs-tab wd-active">Manage Folders</span>
            </div>

            <h2 className="wd-pazza-form-title">Configure Class Folders</h2>

            {/* Add a folder */}
            <div className="wd-pazza-add-folder">
                <label htmlFor="wd-pazza-new-folder" className="wd-pazza-sr-only">
                    New folder name
                </label>
                <input
                    type="text"
                    id="wd-pazza-new-folder"
                    className="wd-pazza-input"
                    placeholder="Add a folder, e.g. hw7"
                />
                <button type="button" id="wd-pazza-add-folder-btn" className="wd-pazza-primary-btn">
                    Add Folder
                </button>
            </div>

            {/* Folder list */}
            <ul id="wd-pazza-folder-list" className="wd-pazza-folder-list">
                {DEFAULT_FOLDERS.map((folder) => (
                    <li key={folder} className="wd-pazza-folder-row">
                        <input type="checkbox" aria-label={`Select folder ${folder}`} />
                        {folder === editingFolder ? (
                            <>
                                <input
                                    type="text"
                                    defaultValue={folder}
                                    aria-label="Folder name"
                                    className="wd-pazza-input wd-pazza-folder-name-input"
                                />
                                <button type="button" className="wd-pazza-primary-btn">
                                    Save
                                </button>
                                <button type="button" className="wd-pazza-secondary-btn">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="wd-pazza-folder-name">{folder}</span>
                                <button type="button" className="wd-pazza-secondary-btn">
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <button type="button" id="wd-pazza-delete-folders-btn" className="wd-pazza-danger-btn">
                Delete selected folders
            </button>
        </div>
    );
}
