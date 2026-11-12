"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import { useAccountContext } from "../../../../account/AccountContext";
import { INSTRUCTOR_ROLES } from "../components/PazzaNavBar";
import { DEFAULT_FOLDERS } from "../folders";

export default function NewPost() {
    const { cid } = useParams<{ cid: string }>();
    const { currentUser } = useAccountContext();
    const base = `/courses/${cid}/pazza`;
    const isInstructor = INSTRUCTOR_ROLES.includes(currentUser?.role ?? "");

    // everyone enrolled in this course (students and instructors)
    const enrolledUserIds = db.enrollments
        .filter((enrollment) => enrollment.course === cid)
        .map((enrollment) => enrollment.user);
    const courseUsers = db.users.filter((user) => enrolledUserIds.includes(user._id));

    return (
        <form id="wd-pazza-new-post" className="wd-pazza-form">
            <h2 className="wd-pazza-form-title">New Post</h2>

            {/* ---------- Post Type ---------- */}
            <div className="wd-pazza-form-row">
                <span className="wd-pazza-form-label">Post Type</span>
                <div className="wd-pazza-form-field">
                    <div className="wd-pazza-post-type-tabs">
                        <label className="wd-pazza-post-type-tab">
                            <input type="radio" name="wd-pazza-post-type" value="QUESTION" defaultChecked className="wd-pazza-sr-only" />
                            Question
                        </label>
                        <label className="wd-pazza-post-type-tab">
                            <input type="radio" name="wd-pazza-post-type" value="NOTE" className="wd-pazza-sr-only" />
                            Note
                        </label>
                    </div>
                </div>
            </div>

            {/* ---------- Post To ---------- */}
            <div className="wd-pazza-form-row">
                <span className="wd-pazza-form-label">Post To</span>
                <div className="wd-pazza-form-field">
                    <label className="wd-pazza-inline">
                        <input type="radio" name="wd-pazza-post-to" value="CLASS" defaultChecked /> Entire Class
                    </label>
                    <label className="wd-pazza-inline">
                        <input type="radio" name="wd-pazza-post-to" value="INDIVIDUAL" /> Individual Student(s) / Instructor(s)
                    </label>

                    <div className="wd-pazza-post-to-users">
                        <label htmlFor="wd-pazza-post-to-users" className="wd-pazza-label">
                            Select who can see this post (hold Ctrl / ⌘ to select several)
                        </label>
                        <select id="wd-pazza-post-to-users" multiple size={6} className="wd-pazza-select">
                            <option value="INSTRUCTORS">Instructors</option>
                            {courseUsers.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.firstName} {user.lastName} ({user.role.toLowerCase()})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* ---------- Select Folders ---------- */}
            <div className="wd-pazza-form-row">
                <span className="wd-pazza-form-label">Select Folder(s)</span>
                <div className="wd-pazza-form-field">
                    <div className="wd-pazza-folder-options">
                        {DEFAULT_FOLDERS.map((folder) => (
                            <label key={folder} className="wd-pazza-folder-option">
                                <input type="checkbox" name="wd-pazza-folders" value={folder} />
                                {folder}
                            </label>
                        ))}
                    </div>
                    {isInstructor && (
                        <Link href={`${base}/manage-class`} id="wd-pazza-manage-folders-link" className="wd-pazza-link">
                            Manage and reorder folders
                        </Link>
                    )}
                    <p className="wd-pazza-error">Select at least one folder.</p>
                </div>
            </div>

            {/* ---------- Summary ---------- */}
            <div className="wd-pazza-form-row">
                <label htmlFor="wd-pazza-summary" className="wd-pazza-form-label">
                    Summary
                </label>
                <div className="wd-pazza-form-field">
                    <input
                        type="text"
                        id="wd-pazza-summary"
                        maxLength={100}
                        className="wd-pazza-input"
                        placeholder="Enter a one line summary, 100 characters or less"
                    />
                    <p className="wd-pazza-error">Summary is required.</p>
                </div>
            </div>

            {/* ---------- Details ---------- */}
            <div className="wd-pazza-form-row">
                <label htmlFor="wd-pazza-details" className="wd-pazza-form-label">
                    Details
                </label>
                <div className="wd-pazza-form-field">
                    <textarea
                        id="wd-pazza-details"
                        rows={10}
                        className="wd-pazza-textarea"
                        placeholder="Enter the details of your question or note (the rich text editor will replace this box)"
                    />
                    <p className="wd-pazza-error">Details are required.</p>
                </div>
            </div>

            {/* ---------- Buttons ---------- */}
            <div className="wd-pazza-form-buttons">
                <button type="button" id="wd-pazza-post-btn" className="wd-pazza-primary-btn">
                    <span className="wd-pazza-post-question-label">Post My Question!</span>
                    <span className="wd-pazza-post-note-label">Post My Note!</span>
                </button>
                <Link href={base} id="wd-pazza-cancel-btn" className="wd-pazza-secondary-btn">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
