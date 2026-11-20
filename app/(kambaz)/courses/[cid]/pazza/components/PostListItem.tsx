import Link from "next/link";
import type { Post, Role } from "../../../../store/pazzaStore";
import { htmlToText } from "../html";
import RoleTag from "./RoleTag";
import TimeStamp from "./TimeStamp";

export default function PostListItem({
    post,
    cid,
    authorRole,
    selected,
    unread,
}: {
    post: Post;
    cid: string;
    authorRole: Role;
    selected: boolean;
    unread: boolean;
}) {
    return (
        <li>
            <Link
                href={`/courses/${cid}/pazza/posts/${post._id}`}
                className={`wd-pazza-post-item ${selected ? "wd-active" : ""} ${unread ? "wd-unread" : ""}`}
            >
                <div className="wd-pazza-post-item-header">
                    <span className="wd-pazza-post-item-summary">{post.summary}</span>
                    <TimeStamp iso={post.createdAt} format="list" className="wd-pazza-post-item-time" />
                </div>
                <RoleTag role={authorRole} />
                {post.visibility === "INDIVIDUAL" && <span className="wd-pazza-private-tag">Private</span>}
                {unread && <span className="wd-pazza-sr-only">(unread)</span>}
                <p className="wd-pazza-post-item-preview">{htmlToText(post.details)}</p>
            </Link>
        </li>
    );
}
