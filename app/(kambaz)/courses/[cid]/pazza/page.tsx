"use client";

import { useParams } from "next/navigation";
import * as db from "../../../database";
import { POSTS, type Role } from "./posts";

// "Responses" = answers + follow-up discussions + replies written by that role
function countResponses(role: Role) {
    let count = 0;
    for (const post of POSTS) {
        count += role === "INSTRUCTOR" ? post.instructorAnswers.length : post.studentAnswers.length;
        for (const discussion of post.discussions) {
            if (discussion.authorRole === role) count++;
            count += discussion.replies.filter((reply) => reply.authorRole === role).length;
        }
    }
    return count;
}

export default function ClassAtAGlance() {
    const { cid } = useParams<{ cid: string }>();

    const unreadPosts: number = 2; // skeleton: fixed number, later computed from who has viewed each post
    const unansweredPosts = POSTS.filter(
        (post) =>
            post.type === "QUESTION" &&
            post.studentAnswers.length === 0 &&
            post.instructorAnswers.length === 0,
    ).length;
    const totalPosts = POSTS.length;
    const instructorResponses = countResponses("INSTRUCTOR");
    const studentResponses = countResponses("STUDENT");

    const enrolledUserIds = db.enrollments
        .filter((enrollment) => enrollment.course === cid)
        .map((enrollment) => enrollment.user);
    const studentsEnrolled = db.users.filter(
        (user) => user.role === "STUDENT" && enrolledUserIds.includes(user._id),
    ).length;

    return (
        <div id="wd-pazza-class-at-a-glance">
            <h2 className="wd-pazza-cgs-title">Class at a Glance</h2>

            <div className="wd-pazza-cgs-status">
                <p className={`wd-pazza-cgs-badge ${unreadPosts === 0 ? "wd-ok" : "wd-warn"}`}>
                    {unreadPosts === 0 ? "no unread posts" : `${unreadPosts} unread posts`}
                </p>
                <p className={`wd-pazza-cgs-badge ${unansweredPosts === 0 ? "wd-ok" : "wd-warn"}`}>
                    {unansweredPosts === 0 ? "no unanswered posts" : `${unansweredPosts} unanswered posts`}
                </p>
            </div>

            <section className="wd-pazza-card">
                <header className="wd-pazza-card-header">Statistics</header>
                <dl className="wd-pazza-cgs-stats">
                    <dt>Total posts</dt>
                    <dd>{totalPosts}</dd>
                    <dt>Instructors&apos; responses</dt>
                    <dd>{instructorResponses}</dd>
                    <dt>Students&apos; responses</dt>
                    <dd>{studentResponses}</dd>
                    <dt>Students enrolled</dt>
                    <dd>{studentsEnrolled}</dd>
                </dl>
            </section>
        </div>
    );
}
