"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAccountContext } from "../../../../account/AccountContext";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";
import {
    INSTRUCTORS_AUDIENCE,
    usePazzaStore,
    type PostType,
    type Visibility,
} from "../../../../store/pazzaStore";
import FolderCheckboxes from "../components/FolderCheckboxes";
import RichTextEditor from "../components/RichTextEditor";
import { isBlankHtml } from "../html";
import { displayName, findUser, isInstructor, useCourseAccess } from "../users";

export default function NewPost() {
    const { cid } = useParams<{ cid: string }>();
    const router = useRouter();
    const { currentUser } = useAccountContext();
    const base = `/courses/${cid}/pazza`;
    const access = useCourseAccess(cid);

    const allFolders = usePazzaStore((state) => state.folders);
    const selectedFolder = usePazzaStore((state) => state.selectedFolder[cid] ?? null);
    const addPost = usePazzaStore((state) => state.addPost);
    const enrollments = useEnrollmentsStore((state) => state.enrollments);
    const folders = allFolders.filter((folder) => folder.course === cid);

    const [type, setType] = useState<PostType>("QUESTION");
    const [visibility, setVisibility] = useState<Visibility>("CLASS");
    const [visibleTo, setVisibleTo] = useState<string[]>([]);
    // start with the folder picked in the folder filters, if any
    const [folderIds, setFolderIds] = useState<string[]>(selectedFolder ? [selectedFolder] : []);
    const [summary, setSummary] = useState("");
    const [details, setDetails] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // everyone enrolled in this course except the author (students and instructors)
    const courseUsers = enrollments
        .filter((enrollment) => enrollment.course === cid && enrollment.user !== currentUser?._id)
        .map((enrollment) => findUser(enrollment.user, currentUser))
        .filter((user) => user !== undefined);

    const errors = {
        visibleTo: visibility === "INDIVIDUAL" && visibleTo.length === 0,
        folders: folderIds.length === 0,
        summary: summary.trim() === "",
        details: isBlankHtml(details),
    };
    const show = (error: boolean) => submitted && error;

    // a real submit handler: pressing Enter in Summary no longer reloads the page
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (!currentUser || !access.member || Object.values(errors).some(Boolean)) return;
        const post = addPost({
            course: cid,
            type,
            summary: summary.trim(),
            details,
            folders: folderIds,
            author: currentUser._id,
            visibility,
            visibleTo: visibility === "INDIVIDUAL" ? visibleTo : [],
        });
        router.push(`${base}/posts/${post._id}`);
    };

    return (
        <form id="wd-pazza-new-post" className="wd-pazza-form" onSubmit={submit} noValidate>
            <h2 className="wd-pazza-form-title">New Post</h2>

            {!currentUser && (
                <p className="wd-pazza-error">
                    You need to <Link href="/account/signin">sign in</Link> before you can post.
                </p>
            )}
            {currentUser && !access.member && (
                <p className="wd-pazza-error">You are not enrolled in this course, so you can&apos;t post here.</p>
            )}

            {/* ---------- Post Type ---------- */}
            <div className="wd-pazza-form-row">
                <span className="wd-pazza-form-label">Post Type</span>
                <div className="wd-pazza-form-field">
                    <div className="wd-pazza-post-type-tabs">
                        {(["QUESTION", "NOTE"] as const).map((value) => (
                            <label key={value} className="wd-pazza-post-type-tab">
                                <input
                                    type="radio"
                                    name="wd-pazza-post-type"
                                    value={value}
                                    checked={type === value}
                                    onChange={() => setType(value)}
                                    className="wd-pazza-sr-only"
                                />
                                {value === "QUESTION" ? "Question" : "Note"}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------- Post To ---------- */}
            <div className="wd-pazza-form-row">
                <span className="wd-pazza-form-label">Post To</span>
                <div className="wd-pazza-form-field">
                    <label className="wd-pazza-inline">
                        <input
                            type="radio"
                            name="wd-pazza-post-to"
                            value="CLASS"
                            checked={visibility === "CLASS"}
                            onChange={() => setVisibility("CLASS")}
                        />{" "}
                        Entire Class
                    </label>
                    <label className="wd-pazza-inline">
                        <input
                            type="radio"
                            name="wd-pazza-post-to"
                            value="INDIVIDUAL"
                            checked={visibility === "INDIVIDUAL"}
                            onChange={() => setVisibility("INDIVIDUAL")}
                        />{" "}
                        Individual Student(s) / Instructor(s)
                    </label>

                    {visibility === "INDIVIDUAL" && (
                        <div className="wd-pazza-post-to-users">
                            <label htmlFor="wd-pazza-post-to-users" className="wd-pazza-label">
                                Select who can see this post (hold Ctrl / ⌘ to select several)
                            </label>
                            <p className="wd-pazza-hint">The course&apos;s instructors can always see private posts.</p>
                            <select
                                id="wd-pazza-post-to-users"
                                multiple
                                size={6}
                                className="wd-pazza-select"
                                value={visibleTo}
                                onChange={(event) =>
                                    setVisibleTo(Array.from(event.target.selectedOptions, (o) => o.value))
                                }
                            >
                                <option value={INSTRUCTORS_AUDIENCE}>Instructors</option>
                                {courseUsers.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {displayName(user)} ({isInstructor(user) ? "instructor" : "student"})
                                    </option>
                                ))}
                            </select>
                            {show(errors.visibleTo) && (
                                <p className="wd-pazza-error">Select at least one person.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ---------- Select Folders ---------- */}
            <div className="wd-pazza-form-row">
                <span className="wd-pazza-form-label">Select Folder(s)</span>
                <div className="wd-pazza-form-field">
                    <FolderCheckboxes folders={folders} selected={folderIds} onChange={setFolderIds} />
                    {access.instructor && (
                        <Link href={`${base}/manage-class`} id="wd-pazza-manage-folders-link" className="wd-pazza-link">
                            Manage and reorder folders
                        </Link>
                    )}
                    {show(errors.folders) && <p className="wd-pazza-error">Select at least one folder.</p>}
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
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                    />
                    {show(errors.summary) && <p className="wd-pazza-error">Summary is required.</p>}
                </div>
            </div>

            {/* ---------- Details ---------- */}
            <div className="wd-pazza-form-row">
                <span id="wd-pazza-details-label" className="wd-pazza-form-label">
                    Details
                </span>
                <div className="wd-pazza-form-field" id="wd-pazza-details">
                    <RichTextEditor
                        labelId="wd-pazza-details-label"
                        placeholder="Enter the details of your question or note"
                        value={details}
                        onChange={setDetails}
                        minHeight={220}
                    />
                    {show(errors.details) && <p className="wd-pazza-error">Details are required.</p>}
                </div>
            </div>

            {/* ---------- Buttons ---------- */}
            <div className="wd-pazza-form-buttons">
                <button type="submit" id="wd-pazza-post-btn" className="wd-pazza-primary-btn" disabled={!access.member}>
                    {type === "QUESTION" ? "Post My Question!" : "Post My Note!"}
                </button>
                <Link href={base} id="wd-pazza-cancel-btn" className="wd-pazza-secondary-btn">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
