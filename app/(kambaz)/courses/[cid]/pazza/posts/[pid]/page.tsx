"use client";

import { useParams } from "next/navigation";
import { POSTS } from "../../posts";
import ActionsMenu from "../../components/ActionsMenu";
import AnswerSection from "../../components/AnswerSection";
import FollowupDiscussions from "../../components/FollowupDiscussions";


export default function PostScreen() {
    const { pid } = useParams<{ pid: string }>();
    const post = POSTS.find((p) => p._id === pid);

    if (!post) {
        return (
            <div id="wd-pazza-post">
                <h2>Post not found</h2>
            </div>
        );
    }

    const isInstructor = post.authorRole === "INSTRUCTOR";

    return (
        <div id="wd-pazza-post">
            <article className="wd-pazza-card">
                <header className="wd-pazza-card-header">
                    <span>{post.type === "QUESTION" ? "question" : "note"}</span>
                    <span>{post.views} views</span>
                </header>

                <div className="wd-pazza-card-body">
                    <h2 className="wd-pazza-post-summary">{post.summary}</h2>
                    <p className="wd-pazza-post-details">{post.details}</p>

                    <div className="wd-pazza-post-folders">
                        {post.folders.map((folder) => (
                            <span key={folder} className="wd-pazza-folder-tag">
                                {folder}
                            </span>
                        ))}
                    </div>

                    <footer className="wd-pazza-card-footer">
                        <div className="wd-pazza-card-buttons">
                            <button type="button" className="wd-pazza-edit-btn">
                                Edit
                            </button>
                            <ActionsMenu />
                        </div>
                        <span className="wd-pazza-author">
                            Posted by {post.author}{" "}
                            <span className={`wd-pazza-role-tag ${isInstructor ? "wd-instructor" : ""}`}>
                                {isInstructor ? "Instructor" : "Student"}
                            </span>{" "}
                            · {post.postedAt}
                        </span>
                    </footer>
                </div>
            </article>

            {/* next step: Student's Answers and Instructor's Answers */}
            {post.type === "QUESTION" && (
                <>
                    <AnswerSection kind="STUDENT" answers={post.studentAnswers} />
                    <AnswerSection kind="INSTRUCTOR" answers={post.instructorAnswers} />
                </>
            )}

            {/* the step after: Follow-up Discussions */}
            <FollowupDiscussions discussions={post.discussions} />

        </div>
    );
}
