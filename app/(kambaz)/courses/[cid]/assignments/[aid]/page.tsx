"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    useAssignmentsStore,
    type Assignment,
} from "../../../../store/assignmentsStore";
import * as client from "../../../client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();
    const isNew = aid === "new";
    const assignment = useAssignmentsStore((state) =>
        state.assignments.find((a) => a._id === aid),
    );
    const setAssignments = useAssignmentsStore((state) => state.setAssignments);
    const [loaded, setLoaded] = useState(false);

    // Opening the editor directly (e.g. a refresh) leaves the store empty,
    // so fetch this course's assignments from the server.
    useEffect(() => {
        if (isNew || assignment) return;
        const load = async () => {
            setAssignments(await client.findAssignmentsForCourse(cid));
            setLoaded(true);
        };
        load();
    }, [cid, isNew, assignment, setAssignments]);

    if (!isNew && !assignment) {
        return <div className="p-6">{loaded ? "Assignment not found." : "Loading..."}</div>;
    }
    const initial: Assignment = assignment ?? {
        _id: "new",
        title: "New Assignment",
        course: cid,
        description: "",
        points: 100,
        due: "",
        available: "",
    };
    return <AssignmentForm key={aid} cid={cid} isNew={isNew} initial={initial} />;
}

function AssignmentForm({
    cid,
    isNew,
    initial,
}: {
    cid: string;
    isNew: boolean;
    initial: Assignment;
}) {
    const router = useRouter();
    const [assignment, setAssignment] = useState<Assignment>(initial);
    const addAssignment = useAssignmentsStore((state) => state.addAssignment);
    const updateAssignment = useAssignmentsStore((state) => state.updateAssignment);

    const onSave = async () => {
        if (isNew) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...newAssignment } = assignment;
            addAssignment(await client.createAssignmentForCourse(cid, newAssignment));
        } else {
            updateAssignment(await client.updateAssignment(assignment));
        }
        router.push(`/courses/${cid}/assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="max-w-2xl mx-auto p-6">
            <form className="space-y-6">

                <div className="space-y-2">
                    <label htmlFor="wd-name" className="block text-sm font-medium ">
                        Assignment Name
                    </label>
                    <input
                        id="wd-name"
                        type="text"
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Assignment Id</label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100">
                        {isNew ? "(assigned on save)" : assignment._id}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="wd-description" className="block text-sm font-medium ">
                        Description
                    </label>
                    <textarea
                        id="wd-description"
                        value={assignment.description}
                        onChange={(e) =>
                            setAssignment({ ...assignment, description: e.target.value })
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-points" className="block text-sm font-medium">
                        Points
                    </label>
                    <input
                        id="wd-points"
                        type="number"
                        value={assignment.points}
                        onChange={(e) =>
                            setAssignment({ ...assignment, points: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-group" className="block text-sm font-medium">
                        Type
                    </label>
                    <select
                        id="wd-group"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="assignments">Assignments</option>
                        <option value="quizzes">Quizzes</option>
                        <option value="exams">Exams</option>
                        <option value="projects">Projects</option>
                    </select>
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-select-grade-as" className="block text-sm font-medium">
                        Grade as
                    </label>
                    <select
                        id="wd-select-grade-as"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="points">Points</option>
                        <option value="percentage">Percentage</option>
                        <option value="letter">Letter</option>
                    </select>
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-submission-type" className="block text-sm font-medium">
                        Submission Type
                    </label>
                    <select
                        id="wd-submission-type"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="online">Online</option>
                        <option value="upload">Upload</option>
                        <option value="link">Link</option>
                    </select>
                </div>


                <div className="space-y-3">
                    <h3 className="text-sm font-medium ">Online Entry Options</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="online-entry-options"
                                id="wd-text-entry"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="wd-text-entry" className="ml-2 block text-sm ">
                                Text Entry
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="online-entry-options"
                                id="wd-website-url"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="wd-website-url" className="ml-2 block text-sm ">
                                Website URL
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="online-entry-options"
                                id="wd-media-recordings"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="wd-media-recordings" className="ml-2 block text-sm ">
                                Media Recordings
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="online-entry-options"
                                id="wd-student-annotation"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="wd-student-annotation" className="ml-2 block text-sm ">
                                Student Annotation
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="online-entry-options"
                                id="wd-file-upload"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="wd-file-upload" className="ml-2 block text-sm ">
                                File Upload
                            </label>
                        </div>
                    </div>
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-assign-to" className="block text-sm font-medium ">
                        Assign To
                    </label>
                    <input
                        type="text"
                        id="wd-assign-to"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-due-date" className="block text-sm font-medium ">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="wd-due-date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={assignment.due}
                        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-available-from" className="block text-sm font-medium ">
                        Available From
                    </label>
                    <input
                        type="date"
                        id="wd-available-from"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={assignment.available}
                        onChange={(e) =>
                            setAssignment({ ...assignment, available: e.target.value })
                        }
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-available-to" className="block text-sm font-medium ">
                        Available To
                    </label>
                    <input
                        type="date"
                        id="wd-available-to"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-ai-editor-notes" className="block text-sm font-medium ">
                        Sample notes
                    </label>
                    <textarea
                        id="wd-ai-editor-notes"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

            </form>
            <Link href={`/courses/${cid}/assignments`} id="wd-cancel">
                Cancel
            </Link>{" "}
            <button type="button" id="wd-save" onClick={onSave}>
                Save
            </button>
        </div>
    );
}