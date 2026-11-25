"use client";

import { useParams } from "next/navigation";
import { useAccountContext, type User } from "../../../account/AccountContext";
import { useEnrollmentsStore } from "../../../store/enrollmentsStore";
import { usePazzaStore, type Post, type Role } from "../../../store/pazzaStore";
import { canSeePost, findUser, useCourseAccess, userRole } from "./users";

// "Responses" = answers + follow-up discussions + replies written by that role
function countResponses(posts: Post[], role: Role, currentUser: User | null) {
    const byRole = (author: string) => userRole(author, currentUser) === role;
    let count = 0;
    for (const post of posts) {
        count += role === "INSTRUCTOR" ? post.instructorAnswers.length : post.studentAnswers.length;
        for (const discussion of post.discussions) {
            if (byRole(discussion.author)) count++;
            count += discussion.replies.filter((reply) => byRole(reply.author)).length;
        }
    }
    return count;
}

export default function ClassAtAGlance() {
    const { cid } = useParams<{ cid: string }>();
    const { currentUser } = useAccountContext();
    const allPosts = usePazzaStore((state) => state.posts);
    const enrollments = useEnrollmentsStore((state) => state.enrollments);
    const access = useCourseAccess(cid);

    // only this course's posts that the current user is allowed to see
    const posts = allPosts.filter((post) => post.course === cid && canSeePost(post, currentUser, access));

    const unreadPosts = currentUser
        ? posts.filter((post) => !post.readBy.includes(currentUser._id)).length
        : null;
    const unansweredPosts = posts.filter(
        (post) =>
            post.type === "QUESTION" &&
            post.studentAnswers.length === 0 &&
            post.instructorAnswers.length === 0,
    ).length;
    const instructorResponses = countResponses(posts, "INSTRUCTOR", currentUser);
    const studentResponses = countResponses(posts, "STUDENT", currentUser);
    const studentsEnrolled = enrollments.filter(
        (enrollment) =>
            enrollment.course === cid && findUser(enrollment.user, currentUser)?.role === "STUDENT",
    ).length;

    return (
        <div id="wd-pazza-class-at-a-glance">
            <h2 className="wd-pazza-cgs-title">Class at a Glance</h2>

            <div className="wd-pazza-cgs-status">
                {unreadPosts === null ? (
                    <p className="wd-pazza-cgs-badge wd-warn">sign in to see unread posts</p>
                ) : (
                    <p className={`wd-pazza-cgs-badge ${unreadPosts === 0 ? "wd-ok" : "wd-warn"}`}>
                        {unreadPosts === 0 ? "no unread posts" : `${unreadPosts} unread posts`}
                    </p>
                )}
                <p className={`wd-pazza-cgs-badge ${unansweredPosts === 0 ? "wd-ok" : "wd-warn"}`}>
                    {unansweredPosts === 0 ? "no unanswered posts" : `${unansweredPosts} unanswered posts`}
                </p>
            </div>

            <section className="wd-pazza-card">
                <header className="wd-pazza-card-header">Statistics</header>
                <dl className="wd-pazza-cgs-stats">
                    <dt>Total posts</dt>
                    <dd>{posts.length}</dd>
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
