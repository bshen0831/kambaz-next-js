"use client";

import { useState } from "react";
import { usePazzaStore, type Discussion, type Entry, type Post } from "../../../../store/pazzaStore";
import { useAccountContext } from "../../../../account/AccountContext";
import { canModify, useCourseAccess, userName, userRole, type CourseAccess } from "../users";
import ActionsMenu from "./ActionsMenu";
import RoleTag from "./RoleTag";
import RichText from "./RichText";
import TextComposer from "./TextComposer";
import TimeStamp from "./TimeStamp";

export default function FollowupDiscussions({ post }: { post: Post }) {
    const { currentUser } = useAccountContext();
    const addDiscussion = usePazzaStore((state) => state.addDiscussion);
    const access = useCourseAccess(post.course);

    return (
        <section id="wd-pazza-followups" className="wd-pazza-card">
            <header className="wd-pazza-card-header">Followup Discussions</header>

            <div className="wd-pazza-card-body">
                {post.discussions.length === 0 && (
                    <p className="wd-pazza-empty">No followup discussions yet.</p>
                )}

                {post.discussions.map((discussion) => (
                    <DiscussionItem key={discussion._id} post={post} discussion={discussion} />
                ))}

                {currentUser && access.member ? (
                    <TextComposer
                        label="Start a new followup discussion"
                        placeholder="Compose a new followup discussion"
                        submitLabel="Start Discussion"
                        onSubmit={(content) => addDiscussion(post._id, currentUser._id, content)}
                    />
                ) : (
                    <p className="wd-pazza-empty">
                        {currentUser
                            ? "Only people enrolled in this course can start followup discussions."
                            : "Sign in to start a followup discussion."}
                    </p>
                )}
            </div>
        </section>
    );
}

function DiscussionItem({ post, discussion }: { post: Post; discussion: Discussion }) {
    const postId = post._id;
    const access = useCourseAccess(post.course);
    const { currentUser } = useAccountContext();
    const updateDiscussion = usePazzaStore((state) => state.updateDiscussion);
    const deleteDiscussion = usePazzaStore((state) => state.deleteDiscussion);
    const addReply = usePazzaStore((state) => state.addReply);
    const updateReply = usePazzaStore((state) => state.updateReply);
    const deleteReply = usePazzaStore((state) => state.deleteReply);

    const statusName = `wd-pazza-status-${discussion._id}`;
    // the member who started the discussion (or an instructor) marks it resolved
    const canResolve = canModify(discussion.author, currentUser, access);

    return (
        <div className={`wd-pazza-discussion ${discussion.resolved ? "wd-resolved" : ""}`}>
            <div className="wd-pazza-discussion-status">
                <label>
                    <input
                        type="radio"
                        name={statusName}
                        checked={discussion.resolved}
                        disabled={!canResolve}
                        onChange={() => updateDiscussion(postId, discussion._id, { resolved: true })}
                    />{" "}
                    Resolved
                </label>
                <label>
                    <input
                        type="radio"
                        name={statusName}
                        checked={!discussion.resolved}
                        disabled={!canResolve}
                        onChange={() => updateDiscussion(postId, discussion._id, { resolved: false })}
                    />{" "}
                    Unresolved
                </label>
            </div>

            <Message
                entry={discussion}
                access={access}
                itemName="followup discussion"
                onSave={(content) => updateDiscussion(postId, discussion._id, { content })}
                onDelete={() => deleteDiscussion(postId, discussion._id)}
            />

            {discussion.replies.map((reply) => (
                <div key={reply._id} className="wd-pazza-reply">
                    <Message
                        entry={reply}
                        access={access}
                        itemName="reply"
                        onSave={(content) => updateReply(postId, discussion._id, reply._id, content)}
                        onDelete={() => deleteReply(postId, discussion._id, reply._id)}
                    />
                </div>
            ))}

            {currentUser && access.member && (
                <div className="wd-pazza-reply-input">
                    <TextComposer
                        label="Reply to this followup discussion"
                        hideLabel
                        minHeight={40}
                        placeholder="Reply to this followup discussion"
                        submitLabel="Reply"
                        onSubmit={(content) => addReply(postId, discussion._id, currentUser._id, content)}
                    />
                </div>
            )}
        </div>
    );
}

// One discussion or reply: author, role, time, Actions, and the text (or an editor while editing)
function Message({
    entry,
    access,
    itemName,
    onSave,
    onDelete,
}: {
    entry: Entry;
    access: CourseAccess;
    itemName: string;
    onSave: (content: string) => void;
    onDelete: () => void;
}) {
    const { currentUser } = useAccountContext();
    const [editing, setEditing] = useState(false);

    return (
        <div className="wd-pazza-message">
            <div className="wd-pazza-message-header">
                <span className="wd-pazza-message-author">{userName(entry.author, currentUser)}</span>
                <RoleTag role={userRole(entry.author, currentUser)} />
                <TimeStamp iso={entry.createdAt} />
                {canModify(entry.author, currentUser, access) && !editing && (
                    <span className="wd-pazza-message-actions">
                        <ActionsMenu itemName={itemName} onEdit={() => setEditing(true)} onDelete={onDelete} />
                    </span>
                )}
            </div>
            {editing ? (
                <TextComposer
                    label={`Edit ${itemName}`}
                    hideLabel
                    minHeight={56}
                    initialValue={entry.content}
                    submitLabel="Save"
                    onSubmit={(content) => {
                        onSave(content);
                        setEditing(false);
                    }}
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <RichText html={entry.content} className="wd-pazza-message-text" />
            )}
        </div>
    );
}
