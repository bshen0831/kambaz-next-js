import * as db from "../../../database";
import { useAccountContext, type User } from "../../../account/AccountContext";
import { useEnrollmentsStore, type Enrollment } from "../../../store/enrollmentsStore";
import type { Post, Role } from "../../../store/pazzaStore";

export const INSTRUCTOR_ROLES = ["FACULTY", "TA", "ADMIN"];

export function isInstructor(user: { role: string } | null | undefined) {
    return !!user && INSTRUCTOR_ROLES.includes(user.role);
}

// What the signed-in user may do in one course.
// member:     enrolled in the course (admins count as members of every course). Only members can
//             post, answer, start discussions and reply.
// instructor: a member with an instructor role (FACULTY, TA, ADMIN). Instructors write instructor
//             answers, manage folders, see every private post, and edit / delete anything.
export type CourseAccess = { member: boolean; instructor: boolean };

export function courseAccess(user: User | null, course: string, enrollments: Enrollment[]): CourseAccess {
    if (!user) return { member: false, instructor: false };
    const member =
        user.role === "ADMIN" ||
        enrollments.some((enrollment) => enrollment.user === user._id && enrollment.course === course);
    return { member, instructor: member && isInstructor(user) };
}

export function useCourseAccess(course: string): CourseAccess {
    const { currentUser } = useAccountContext();
    const enrollments = useEnrollmentsStore((state) => state.enrollments);
    return courseAccess(currentUser, course, enrollments);
}

// Users created on the Sign up page are not in users.json, so check the signed-in user first
export function findUser(userId: string, currentUser: User | null) {
    if (currentUser && currentUser._id === userId) return currentUser;
    return db.users.find((user) => user._id === userId);
}

export function displayName(user: User | null | undefined) {
    if (!user) return "Unknown user";
    return `${user.firstName} ${user.lastName}`.trim() || user.username;
}

export function userName(userId: string, currentUser: User | null) {
    return displayName(findUser(userId, currentUser));
}

export function userRole(userId: string, currentUser: User | null): Role {
    return isInstructor(findUser(userId, currentUser)) ? "INSTRUCTOR" : "STUDENT";
}

// Posts to the entire class are public. A private post is visible to its author, to the people
// picked in "Post To", and always to the course's instructors (as on Piazza).
export function canSeePost(post: Post, user: User | null, access: CourseAccess) {
    if (post.visibility === "CLASS") return true;
    if (!user) return false;
    return access.instructor || post.author === user._id || post.visibleTo.includes(user._id);
}

// Members can edit / delete their own content; the course's instructors can edit / delete anything
export function canModify(authorId: string, user: User | null, access: CourseAccess) {
    return !!user && (access.instructor || (access.member && user._id === authorId));
}
