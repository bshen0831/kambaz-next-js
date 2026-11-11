import ActionsMenu from "./ActionsMenu";
import type { Discussion, Reply } from "../posts";

export default function FollowupDiscussions({ discussions }: { discussions: Discussion[] }) {
    return (
        <section id="wd-pazza-followups" className="wd-pazza-card">
            <header className="wd-pazza-card-header">Followup Discussions</header>

            <div className="wd-pazza-card-body">
                {discussions.length === 0 && (
                    <p className="wd-pazza-empty">No followup discussions yet.</p>
                )}

                {discussions.map((discussion) => (
                    <DiscussionItem key={discussion._id} discussion={discussion} />
                ))}

                <label htmlFor="wd-pazza-new-followup" className="wd-pazza-label">
                    Start a new followup discussion
                </label>
                <textarea
                    id="wd-pazza-new-followup"
                    rows={3}
                    className="wd-pazza-textarea"
                    placeholder="Compose a new followup discussion"
                />
                <button type="button" className="wd-pazza-primary-btn">
                    Start Discussion
                </button>
            </div>
        </section>
    );
}

function DiscussionItem({ discussion }: { discussion: Discussion }) {
    const statusName = `wd-pazza-status-${discussion._id}`;
    const replyId = `wd-pazza-reply-${discussion._id}`;

    return (
        <div className="wd-pazza-discussion">
            <div className="wd-pazza-discussion-status">
                <label>
                    <input type="radio" name={statusName} defaultChecked={discussion.resolved} /> Resolved
                </label>
                <label>
                    <input type="radio" name={statusName} defaultChecked={!discussion.resolved} /> Unresolved
                </label>
            </div>

            <Message entry={discussion} />

            {discussion.replies.map((reply) => (
                <div key={reply._id} className="wd-pazza-reply">
                    <Message entry={reply} />
                </div>
            ))}

            <label htmlFor={replyId} className="wd-pazza-sr-only">
                Reply to this followup discussion
            </label>
            <textarea
                id={replyId}
                rows={1}
                className="wd-pazza-textarea wd-pazza-reply-input"
                placeholder="Reply to this followup discussion"
            />
        </div>
    );
}

function Message({ entry }: { entry: Reply }) {
    const isInstructor = entry.authorRole === "INSTRUCTOR";

    return (
        <div className="wd-pazza-message">
            <div className="wd-pazza-message-header">
                <span className="wd-pazza-message-author">{entry.author}</span>
                <span className={`wd-pazza-role-tag ${isInstructor ? "wd-instructor" : ""}`}>
                    {isInstructor ? "Instructor" : "Student"}
                </span>
                <span className="wd-pazza-author">{entry.time}</span>
                <span className="wd-pazza-message-actions">
                    <ActionsMenu />
                </span>
            </div>
            <p className="wd-pazza-message-text">{entry.content}</p>
        </div>
    );
}
