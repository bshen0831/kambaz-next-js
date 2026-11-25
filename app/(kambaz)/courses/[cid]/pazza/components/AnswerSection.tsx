"use client";

import { useState } from "react";
import { usePazzaStore, type Answer, type Post, type Role } from "../../../../store/pazzaStore";
import { useAccountContext } from "../../../../account/AccountContext";
import { canModify, useCourseAccess, userName } from "../users";
import ActionsMenu from "./ActionsMenu";
import RichText from "./RichText";
import TextComposer from "./TextComposer";
import TimeStamp from "./TimeStamp";

// "Student's Answers" or "Instructor's Answers" of a question.
// Students write in the student section, instructors in the instructor section.
export default function AnswerSection({ post, kind }: { post: Post; kind: Role }) {
    const { currentUser } = useAccountContext();
    const addAnswer = usePazzaStore((state) => state.addAnswer);
    const access = useCourseAccess(post.course);

    const forInstructors = kind === "INSTRUCTOR";
    const answers = forInstructors ? post.instructorAnswers : post.studentAnswers;
    const title = forInstructors ? "Instructor's Answers" : "Student's Answers";
    const who = forInstructors ? "instructor" : "student";
    // instructor answers: the course's instructors; student answers: the course's other members
    const canWrite = forInstructors ? access.instructor : access.member && !access.instructor;

    return (
        <section
            id={`wd-pazza-${kind.toLowerCase()}-answers`}
            className={`wd-pazza-card wd-pazza-answers ${forInstructors ? "wd-instructor" : ""}`}
        >
            <header className="wd-pazza-card-header">{title}</header>

            <div className="wd-pazza-card-body">
                {answers.map((answer) => (
                    <AnswerItem key={answer._id} post={post} kind={kind} answer={answer} />
                ))}

                {answers.length === 0 &&
                    (canWrite && currentUser ? (
                        <TextComposer
                            label={`No answer yet. Write the first ${who} answer:`}
                            placeholder="Write your answer here..."
                            minHeight={96}
                            submitLabel="Submit"
                            onSubmit={(content) => addAnswer(post._id, kind, currentUser._id, content)}
                        />
                    ) : (
                        <p className="wd-pazza-empty">
                            No {who} answer yet.
                            {!currentUser && " Sign in to answer."}
                            {currentUser && !access.member && " Only people enrolled in this course can answer."}
                        </p>
                    ))}
            </div>
        </section>
    );
}

function AnswerItem({ post, kind, answer }: { post: Post; kind: Role; answer: Answer }) {
    const postId = post._id;
    const { currentUser } = useAccountContext();
    const updateAnswer = usePazzaStore((state) => state.updateAnswer);
    const deleteAnswer = usePazzaStore((state) => state.deleteAnswer);
    const [editing, setEditing] = useState(false);
    const access = useCourseAccess(post.course);
    const allowed = canModify(answer.author, currentUser, access);

    if (editing) {
        return (
            <div className="wd-pazza-answer">
                <TextComposer
                    label="Edit answer"
                    hideLabel
                    minHeight={96}
                    initialValue={answer.content}
                    submitLabel="Save"
                    onSubmit={(content) => {
                        updateAnswer(postId, kind, answer._id, content);
                        setEditing(false);
                    }}
                    onCancel={() => setEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className="wd-pazza-answer">
            <RichText html={answer.content} className="wd-pazza-post-details" />
            <footer className="wd-pazza-card-footer">
                <div className="wd-pazza-card-buttons">
                    {allowed && (
                        <>
                            <button type="button" className="wd-pazza-edit-btn" onClick={() => setEditing(true)}>
                                Edit
                            </button>
                            <ActionsMenu
                                itemName="answer"
                                onEdit={() => setEditing(true)}
                                onDelete={() => deleteAnswer(postId, kind, answer._id)}
                            />
                        </>
                    )}
                </div>
                <span className="wd-pazza-author">
                    ~ {userName(answer.author, currentUser)} · <TimeStamp iso={answer.createdAt} />
                </span>
            </footer>
        </div>
    );
}
