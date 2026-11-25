"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePazzaStore, type Post } from "../../../../store/pazzaStore";
import { useAccountContext } from "../../../../account/AccountContext";
import { postGroup, useNow } from "../dates";
import { htmlToText } from "../html";
import { canSeePost, useCourseAccess, userRole } from "../users";
import PostListItem from "./PostListItem";

export default function PostListSidebar() {
    const { cid, pid } = useParams<{ cid: string; pid?: string }>();
    const { currentUser } = useAccountContext();
    const allPosts = usePazzaStore((state) => state.posts);
    const allFolders = usePazzaStore((state) => state.folders);
    const selectedFolder = usePazzaStore((state) => state.selectedFolder[cid] ?? null);
    const selectFolder = usePazzaStore((state) => state.selectFolder);
    const access = useCourseAccess(cid);
    const [collapsed, setCollapsed] = useState(false);
    const [search, setSearch] = useState("");
    const now = useNow();

    const folderName = allFolders.find((folder) => folder._id === selectedFolder)?.name;
    const query = search.trim().toLowerCase();

    // posts of this course the user may see, filtered by folder and search, newest first
    const posts = allPosts
        .filter((post) => post.course === cid && canSeePost(post, currentUser, access))
        .filter((post) => !selectedFolder || post.folders.includes(selectedFolder))
        .filter(
            (post) =>
                !query ||
                post.summary.toLowerCase().includes(query) ||
                htmlToText(post.details).toLowerCase().includes(query),
        )
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    // group into accordions (Today, Yesterday, ...); needs the browser clock, see useNow
    const groups: { label: string; posts: Post[] }[] = [];
    if (now !== null) {
        for (const post of posts) {
            const label = postGroup(post.createdAt, now);
            const group = groups.find((g) => g.label === label);
            if (group) group.posts.push(post);
            else groups.push({ label, posts: [post] });
        }
    }

    return (
        <aside id="wd-pazza-lops" className={`wd-pazza-lops ${collapsed ? "wd-collapsed" : ""}`}>
            <button
                type="button"
                id="wd-pazza-lops-toggle"
                className="wd-pazza-lops-toggle"
                onClick={() => setCollapsed(!collapsed)}
                aria-expanded={!collapsed}
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
                        type="search"
                        id="wd-pazza-search"
                        className="wd-pazza-search"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                {folderName && (
                    <p className="wd-pazza-filter-status">
                        Showing posts in <strong>{folderName}</strong>
                        <button
                            type="button"
                            className="wd-pazza-link-btn"
                            onClick={() => selectFolder(cid, null)}
                        >
                            Show all
                        </button>
                    </p>
                )}

                {now !== null && posts.length === 0 && (
                    <p className="wd-pazza-empty">
                        {query || selectedFolder ? "No posts match." : "No posts yet."}
                    </p>
                )}

                {groups.map((group) => (
                    <details key={group.label} open className="wd-pazza-post-group">
                        <summary className="wd-pazza-post-group-title">{group.label}</summary>
                        <ul className="wd-pazza-post-list">
                            {group.posts.map((post) => (
                                <PostListItem
                                    key={post._id}
                                    post={post}
                                    cid={cid}
                                    authorRole={userRole(post.author, currentUser)}
                                    selected={post._id === pid}
                                    unread={!!currentUser && !post.readBy.includes(currentUser._id)}
                                />
                            ))}
                        </ul>
                    </details>
                ))}
            </div>
        </aside>
    );
}
