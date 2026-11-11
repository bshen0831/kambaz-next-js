"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { POST_GROUPS, POSTS } from "../posts";
import PostListItem from "./PostListItem";

export default function PostListSidebar() {
    const { cid, pid } = useParams<{ cid: string; pid?: string }>();
    const collapsed = false; // skeleton: set by hand, later decided by state (TLOPS click)

    return (
        <aside id="wd-pazza-lops" className={`wd-pazza-lops ${collapsed ? "wd-collapsed" : ""}`}>
            <button
                type="button"
                id="wd-pazza-lops-toggle"
                className="wd-pazza-lops-toggle"
                title={collapsed ? "Show the list of posts" : "Hide the list of posts"}
            >
                {collapsed ? "▶" : "◀"}
            </button>

            <div className="wd-pazza-lops-content">
                <div className="wd-pazza-lops-actions">
                    <Link
                        href={`/courses/${cid}/pazza/new-post`}
                        id="wd-pazza-new-post-btn"
                        className="wd-pazza-new-post-btn"
                    >
                        New Post
                    </Link>
                    <label htmlFor="wd-pazza-search" className="wd-pazza-sr-only">
                        Search posts
                    </label>
                    <input
                        type="text"
                        id="wd-pazza-search"
                        className="wd-pazza-search"
                        placeholder="Search or add a post..."
                    />
                </div>

                {POST_GROUPS.map((group) => (
                    <details key={group} open className="wd-pazza-post-group">
                        <summary className="wd-pazza-post-group-title">{group}</summary>
                        <ul className="wd-pazza-post-list">
                            {POSTS.filter((post) => post.group === group).map((post) => (
                                <PostListItem
                                    key={post._id}
                                    post={post}
                                    cid={cid}
                                    selected={post._id === pid}
                                />
                            ))}
                        </ul>
                    </details>
                ))}
            </div>
        </aside>
    );
}
