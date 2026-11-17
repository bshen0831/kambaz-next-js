"use client";

import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import {
    emptyCourse,
    useCoursesStore,
    type Course,
} from "../store/coursesStore";
import * as client from "../courses/client";
import { useAccountContext } from "../account/AccountContext";


export default function Dashboard() {
    const courses = useCoursesStore((state) => state.courses);
    const addCourse = useCoursesStore((state) => state.addCourse);
    const updateCourse = useCoursesStore((state) => state.updateCourse);
    const { currentUser } = useAccountContext();
    const [course, setCourse] = useState<Course>(emptyCourse);
    const setCourses = useCoursesStore((state) => state.setCourses);

    useEffect(() => {
        const load = async () => {
            setCourses(await client.findMyCourses());
        };
        load();
    }, [currentUser]);
    const onAddCourse = async () => {
        const newCourse = await client.createCourse(course);
        addCourse(newCourse);
    };
    const onUpdateCourse = async () => {
        const saved = await client.updateCourse(course);
        updateCourse(saved);
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h5 className="flex flex-wrap items-center gap-2">
                New Course
                <button
                    type="button"
                    className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
                    id="wd-add-new-course-click"
                    onClick={() => onAddCourse()}
                >
                    Add
                </button>
                <button
                    type="button"
                    className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
                    id="wd-update-course-click"
                    onClick={() => onUpdateCourse()}
                >
                    Update
                </button>
            </h5>
            <input
                className="mb-2 mt-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                id="wd-course-name"
            />
            <textarea
                className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
                rows={3}
                value={course.description}
                onChange={(e) =>
                    setCourse({ ...course, description: e.target.value })
                }
                id="wd-course-description"
            />
            <input
                className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
                type="number"
                value={course.number}
                onChange={(e) => setCourse({ ...course, number: e.target.value })}
                id="wd-course-number"
            />
            <input
                className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
                type="date"
                value={course.startDate}
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                id="wd-course-start-date"
            />
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div
                id="wd-dashboard-courses"
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
                {courses.map((c) => (
                    <CourseCard
                        key={c._id}
                        course={c}
                        onEdit={() => setCourse(c)}
                    />
                ))}
            </div>
        </div>
    );
}