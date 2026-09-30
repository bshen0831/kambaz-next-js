"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/labs/lab2/tailwind/utilities.css";
import "../../kambaz.css";

export default function CourseNavigation({ cid }: { cid: string }) {
    const pathname = usePathname() ?? "";
    const home = `/courses/${cid}/home`;
    const assignments = `/courses/${cid}/assignments`;
    const modules = `/courses/${cid}/modules`;
    const piazza = `/courses/${cid}/piazza`;
    const zoom = `/courses/${cid}/zoom`;
    const quizzes = `/courses/${cid}/quizzes`;
    const grades = `/courses/${cid}/grades`;
    const people = `/courses/${cid}/people/table`;
    return (
        <div id="wd-courses-navigation" className="wd list-group rounded-none text-lg">
            <Link
                href={home}
                id="wd-course-home-link"
                className={
                    pathname === home
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Home
            </Link>
            <Link
                href={assignments}
                id="wd-course-assignments-link"
                className={
                    pathname === assignments || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Assignments
            </Link>
            <Link
                href={modules}
                id="wd-course-modules-link"
                className={
                    pathname === modules || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Modules
            </Link>
            <Link
                href={piazza}
                id="wd-course-piazza-link"
                className={
                    pathname === piazza || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Piazza
            </Link>
            <Link
                href={zoom}
                id="wd-course-zoom-link"
                className={
                    pathname === zoom || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Zoom
            </Link>
            <Link
                href={quizzes}
                id="wd-course-zoom-link"
                className={
                    pathname === quizzes || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Quizzes
            </Link>
            <Link
                href={grades}
                id="wd-course-zoom-link"
                className={
                    pathname === grades || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Grades
            </Link>
            <Link
                href={people}
                id="wd-course-zoom-link"
                className={
                    pathname === people || pathname.startsWith(assignments + "/")
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                People
            </Link>
            <Link
                href={home}
                id="wd-course-ai-link"
                className={
                    pathname === home
                        ? "list-group-item active border-0"
                        : "list-group-item border-0 text-red-600"
                }
            >
                Sample
            </Link>


        </div>
    );
}

