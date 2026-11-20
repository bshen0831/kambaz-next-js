"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePazzaStore, type Post, type PostType } from "../../../../../store/pazzaStore";
import { useAccountContext } from "../../../../../account/AccountContext";
import { canModify, canSeePost, useCourseAccess, userName, userRole } from "../../users";
import ActionsMenu from "../../components/ActionsMenu";
import AnswerSection from "../../components/AnswerSection";
import FollowupDiscussions from "../../components/FollowupDiscussions";
import FolderCheckboxes from "../../components/FolderCheckboxes";
import RichText from "../../components/RichText";
import RichTextEditor from "../../components/RichTextEditor";
import { isBlankHtml } from "../../html";
import RoleTag from "../../components/RoleTag";
import TimeStamp from "../../components/TimeStamp";

export default function PostScreen() {
    const { cid, pid } = useParams<{ cid: string; pid: string }>();
    const { currentUser } = useAccountContext();
    const post = usePazzaStore((state) => state.posts.find((p) => p._id === pid));
    const markViewed = usePazzaStore((state) => state.markViewed);
    const access = useCourseAccess(cid);

    const visible = !!post && post.course === cid && canSeePost(post, currentUser, access);
    const userId = currentUser?._id;

    // opening a post counts a view and marks it as read for this user
    useEffect(() => {
        if (visible && userId) markViewed(pid, userId);
    }, [visible, pid, userId, markViewed]);

    if (!post || !visible) {
        return (
            <div id="wd-pazza-post">
                <h2 className="wd-pazza-form-title">Post not found</h2>
                <p className="wd-pazza-empty">
                    It may have been deleted, or it is a private post you can&apos;t see.
                </p>
            </div>
        );
    }

    // key: reset the edit state when switching to another post
    return <PostDetails key={post._id} post={post} />;
}

function PostDetails({ post }: { post: Post }) {
    const router = useRouter();
    const { currentUser } = useAccountContext();
    const deletePost = usePazzaStore((state) => state.deletePost);
    const allFolders = usePazzaStore((state) => state.folders);
    const [editing, setEditing] = useState(false);
    const access = useCourseAccess(post.course);

    const folders = allFolders.filter((folder) => post.folders.includes(folder._id));
    const allowed = canModify(post.author, currentUser, access);

    const remove = () => {
        router.push(`/courses/${post.course}/pazza`);
        deletePost(post._id);
    };

    return (
        <div id="wd-pazza-post">
            <article className="wd-pazza-card">
                <header className="wd-pazza-card-header">
                    <span>
                        {post.type === "QUESTION" ? "question" : "note"}
                        {post.visibility === "INDIVIDUAL" && " · private"}
                    </span>
                    <span>{post.views} views</span>
                </header>

                <div className="wd-pazza-card-body">
                    {editing ? (
                        <PostEditForm post={post} onDone={() => setEditing(false)} />
                    ) : (
                        <>
                            <h2 className="wd-pazza-post-summary">{post.summary}</h2>
                            <RichText html={post.details} className="wd-pazza-post-details" />

                            <div className="wd-pazza-post-folders">
                                {folders.map((folder) => (
                                    <span key={folder._id} className="wd-pazza-folder-tag">
                                        {folder.name}
                                    </span>
                                ))}
                            </div>

                            <footer className="wd-pazza-card-footer">
                                <div className="wd-pazza-card-buttons">
                                    {allowed && (
                                        <>
                                            <button
                                                type="button"
                                                className="wd-pazza-edit-btn"
                                                onClick={() => setEditing(true)}
                                            >
                                                Edit
                                            </button>
                                            <ActionsMenu
                                                itemName="post"
                                                onEdit={() => setEditing(true)}
                                                onDelete={remove}
                                            />
                                        </>
                                    )}
                                </div>
                                <span className="wd-pazza-author">
                                    Posted by {userName(post.author, currentUser)}{" "}
                                    <RoleTag role={userRole(post.author, currentUser)} /> ·{" "}
                                    <TimeStamp iso={post.createdAt} />
                                </span>
                            </footer>
                        </>
                    )}
                </div>
            </article>

            {post.type === "QUESTION" && (
                <>
                    <AnswerSection kind="STUDENT" post={post} />
                    <AnswerSection kind="INSTRUCTOR" post={post} />
                </>
            )}

            <FollowupDiscussions post={post} />
        </div>
    );
}

function PostEditForm({ post, onDone }: { post: Post; onDone: () => void }) {
    const updatePost = usePazzaStore((state) => state.updatePost);
    const allFolders = usePazzaStore((state) => state.folders);
    const courseFolders = allFolders.filter((folder) => folder.course === post.course);

    const [type, setType] = useState<PostType>(post.type);
    const [summary, setSummary] = useState(post.summary);
    const [details, setDetails] = useState(post.details);
    const [folderIds, setFolderIds] = useState(post.folders);
    const [submitted, setSubmitted] = useState(false);

    const errors = {
        folders: folderIds.length === 0,
        summary: summary.trim() === "",
        details: isBlankHtml(details),
    };

    const save = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        if (Object.values(errors).some(Boolean)) return;
        updatePost(post._id, { type, summary: summary.trim(), details, folders: folderIds });
        onDone();
    };

    return (
        <form id="wd-pazza-edit-post" className="wd-pazza-edit-post" onSubmit={save}>
            <div className="wd-pazza-post-type-tabs">
                {(["QUESTION", "NOTE"] as const).map((value) => (
                    <label key={value} className="wd-pazza-post-type-tab">
                        <input
                            type="radio"
                            name="wd-pazza-edit-post-type"
                            value={value}
                            checked={type === value}
                            onChange={() => setType(value)}
                            className="wd-pazza-sr-only"
                        />
                        {value === "QUESTION" ? "Question" : "Note"}
                    </label>
                ))}
            </div>

            <label htmlFor="wd-pazza-edit-summary" className="wd-pazza-label">
                Summary
            </label>
            <input
                id="wd-pazza-edit-summary"
                type="text"
                maxLength={100}
                className="wd-pazza-input"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
            />
            {submitted && errors.summary && <p className="wd-pazza-error">Summary is required.</p>}

            <RichTextEditor label="Details" value={details} onChange={setDetails} minHeight={140} />
            {submitted && errors.details && <p className="wd-pazza-error">Details are required.</p>}

            <span className="wd-pazza-label">Folders</span>
            <FolderCheckboxes folders={courseFolders} selected={folderIds} onChange={setFolderIds} />
            {submitted && errors.folders && <p className="wd-pazza-error">Select at least one folder.</p>}

            <div className="wd-pazza-form-buttons">
                <button type="submit" className="wd-pazza-primary-btn">
                    Save
                </button>
                <button type="button" className="wd-pazza-secondary-btn" onClick={onDone}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
