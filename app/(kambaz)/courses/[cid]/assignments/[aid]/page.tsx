"use client";

export default function AssignmentEditor() {


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
                        defaultValue="A1 - ENV + HTML"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>


                <div className="space-y-2">
                    <label htmlFor="wd-description" className="block text-sm font-medium ">
                        Description
                    </label>
                    <textarea
                        id="wd-description"
                        defaultValue="The assignment is available online Submit a link to the landing page of"
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
                        defaultValue={100}
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
            <form action="./" method="get" className="flex gap-3 pt-6 border-t border-gray-200">
                <button id="wd-cancel" className="px-4 py-2 bg-gray-200  rounded-md  font-medium ">
                    Cancel
                </button>
                <button id="wd-save" className="px-4 py-2 bg-blue-600 text-white rounded-md  font-medium ">
                    Save
                </button>
            </form>
        </div>
    );
}