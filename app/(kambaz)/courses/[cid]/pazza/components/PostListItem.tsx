import Link from "next/link";
import { POSTS } from "../posts";

type Post = (typeof POSTS)[number];

export default function PostListItem({
    post,
    cid,
    selected,
}: {
    post: Post;
    cid: string;
    selected: boolean;
}) {
    const isInstructor = post.authorRole === "INSTRUCTOR";
    return (
        <li>
            <Link
                href={`/courses/${cid}/pazza/posts/${post._id}`}
                className={`wd-pazza-post-item ${selected ? "wd-active" : ""}`}
            >
                <div className="wd-pazza-post-item-header">
                    <span className="wd-pazza-post-item-summary">{post.summary}</span>
                    <span className="wd-pazza-post-item-time">{post.time}</span>
                </div>
                <span className={`wd-pazza-role-tag ${isInstructor ? "wd-instructor" : ""}`}>
                    {isInstructor ? "Instructor" : "Student"}
                </span>
                <p className="wd-pazza-post-item-preview">{post.details}</p>
            </Link>
        </li>
    );
}
