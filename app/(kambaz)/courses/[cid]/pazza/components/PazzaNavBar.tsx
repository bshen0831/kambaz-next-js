"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useCoursesStore } from "../../../../store/coursesStore";
import { useAccountContext } from "../../../../account/AccountContext";

export const INSTRUCTOR_ROLES = ["FACULTY", "TA", "ADMIN"];

export default function PazzaNavBar() {
    const { cid } = useParams<{ cid: string }>();
    const pathname = usePathname() ?? "";
    const courses = useCoursesStore((state) => state.courses);
    const course = courses.find((c) => c._id === cid);
    const { currentUser } = useAccountContext();

    const base = `/courses/${cid}/pazza`;
    const isManageClass = pathname.includes("/manage-class");
    const isInstructor = INSTRUCTOR_ROLES.includes(currentUser?.role ?? "");

    return (
        <nav id="wd-pazza-navbar" className="wd-pazza-navbar">
            <Link href={base} id="wd-pazza-logo" className="wd-pazza-logo">
                pazza
            </Link>

            <span id="wd-pazza-course" className="wd-pazza-course">
                {course ? course.number : cid}
            </span>

            <Link
                href={base}
                id="wd-pazza-qa-tab"
                className={`wd-pazza-tab ${isManageClass ? "" : "wd-active"}`}
            >
                Q &amp; A
            </Link>

            {isInstructor && (
                <Link
                    href={`${base}/manage-class`}
                    id="wd-pazza-manage-class-tab"
                    className={`wd-pazza-tab ${isManageClass ? "wd-active" : ""}`}
                >
                    Manage Class
                </Link>
            )}

            <span id="wd-pazza-user" className="wd-pazza-user">
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Not signed in"}
            </span>
        </nav>
    );
}
