import Link from "next/link";
import Image from "next/image";
import { useCoursesStore, type Course } from "../store/coursesStore";
import { useEnrollmentsStore } from "../store/enrollmentsStore";
import { useAccountContext } from "../account/AccountContext";

export default function CourseCard({
    course,
    isEnrolled,
    isFaculty,
    onEdit,
}: {
    course: Course;
    isEnrolled: boolean;
    isFaculty: boolean;
    onEdit: () => void;
}) {
    const deleteCourse = useCoursesStore((state) => state.deleteCourse);
    const enroll = useEnrollmentsStore((state) => state.enroll);
    const unenroll = useEnrollmentsStore((state) => state.unenroll);
    const { currentUser } = useAccountContext();
    return (
        <div className="wd-dashboard-course w-[300px] max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            <Link
                href={`/courses/${course._id}/home`}
                className="wd-dashboard-course-link block text-neutral-900 no-underline"
            >
                <Image
                    src={course.image}
                    width={300}
                    height={160}
                    alt={course.name}
                    className="h-40 w-full object-cover"
                />
                <div className="p-4">
                    <h5 className="wd-dashboard-course-title m-0 mb-2 truncate text-lg font-semibold whitespace-nowrap">
                        {course.name}
                    </h5>
                    <p className="wd-dashboard-course-description m-0 mb-3 h-[100px] overflow-hidden text-sm text-neutral-600">
                        {course.description}
                    </p>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
                    >
                        Go
                    </button>
                    {currentUser && isEnrolled && (
                        <button
                            type="button"
                            id="wd-unenroll-course-click"
                            className="ms-2 inline-flex items-center justify-center rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                            onClick={(event) => {
                                event.preventDefault();
                                unenroll(currentUser._id, course._id);
                            }}
                        >
                            Unenroll
                        </button>
                    )}
                    {currentUser && !isEnrolled && (
                        <button
                            type="button"
                            id="wd-enroll-course-click"
                            className="ms-2 inline-flex items-center justify-center rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
                            onClick={(event) => {
                                event.preventDefault();
                                enroll(currentUser._id, course._id);
                            }}
                        >
                            Enroll
                        </button>
                    )}
                    {isFaculty && (
                        <>
                            <button
                                type="button"
                                id="wd-edit-course-click"
                                className="ms-2 inline-flex items-center justify-center rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
                                onClick={(event) => {
                                    event.preventDefault();
                                    onEdit();
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                id="wd-delete-course-click"
                                className="ms-2 inline-flex items-center justify-center rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                                onClick={(event) => {
                                    event.preventDefault();
                                    deleteCourse(course._id);
                                }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </Link>
        </div>
    );
}
