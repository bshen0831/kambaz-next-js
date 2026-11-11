import ActionsMenu from "./ActionsMenu";
import type { Answer, Role } from "../posts";

export default function AnswerSection({ kind, answers }: { kind: Role; answers: Answer[] }) {
    const isInstructor = kind === "INSTRUCTOR";
    const title = isInstructor ? "Instructor's Answers" : "Student's Answers";
    const editorId = `wd-pazza-answer-editor-${kind.toLowerCase()}`;

    return (
        <section
            id={`wd-pazza-${kind.toLowerCase()}-answers`}
            className={`wd-pazza-card wd-pazza-answers ${isInstructor ? "wd-instructor" : ""}`}
        >
            <header className="wd-pazza-card-header">{title}</header>

            <div className="wd-pazza-card-body">
                {answers.length > 0 ? (
                    answers.map((answer) => (
                        <div key={answer._id} className="wd-pazza-answer">
                            <p className="wd-pazza-post-details">{answer.content}</p>
                            <footer className="wd-pazza-card-footer">
                                <div className="wd-pazza-card-buttons">
                                    <button type="button" className="wd-pazza-edit-btn">
                                        Edit
                                    </button>
                                    <ActionsMenu />
                                </div>
                                <span className="wd-pazza-author">
                                    ~ {answer.author} · {answer.time}
                                </span>
                            </footer>
                        </div>
                    ))
                ) : (
                    <>
                        <label htmlFor={editorId} className="wd-pazza-label">
                            No answer yet. Write the first {isInstructor ? "instructor" : "student"} answer:
                        </label>
                        <textarea
                            id={editorId}
                            rows={4}
                            className="wd-pazza-textarea"
                            placeholder="Write your answer here... (the rich text editor will replace this box)"
                        />
                        <button type="button" className="wd-pazza-primary-btn">
                            Submit
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}
