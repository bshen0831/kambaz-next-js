import type { Role } from "../../../../store/pazzaStore";

export default function RoleTag({ role }: { role: Role }) {
    const isInstructor = role === "INSTRUCTOR";
    return (
        <span className={`wd-pazza-role-tag ${isInstructor ? "wd-instructor" : ""}`}>
            {isInstructor ? "Instructor" : "Student"}
        </span>
    );
}
