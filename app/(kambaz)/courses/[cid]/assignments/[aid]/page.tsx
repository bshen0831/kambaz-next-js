export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" />
            <br />
            <br />
            <textarea id="wd-description" defaultValue="The assignment is available online Submit a link to the landing page of" />
            <br />
            <table>
                <tbody>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" defaultValue={100} />
                        </td>
                    </tr>
                    {/* Complete on your own — see checklist below */}

                </tbody>
            </table>
            <label htmlFor="wd-group">Type: </label>
            <select id="wd-group">
                <option value="assignments">Assignments</option>
                <option value="quizzes">Quizzes</option>
                <option value="exams">Exams</option>
                <option value="projects">Projects</option>
            </select>
            <br />
            <label htmlFor="wd-select-grade-as">Grade as: </label>
            <select id="wd-select-grade-as">
                <option value="points">Points</option>
                <option value="percentage">Percentage</option>
                <option value="letter">Letter</option>
            </select>
            <br />
            <label htmlFor="wd-submission-type">Submission Type: </label>
            <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="upload">Upload</option>
                <option value="link">Link</option>
            </select>

            <br /> <br />
            <input type="checkbox" name="online-entry-options" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" name="online-entry-options" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input type="checkbox" name="online-entry-options" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input type="checkbox" name="online-entry-options" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" name="online-entry-options" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Upload</label>
            <br />
            <br />
            <label htmlFor="wd-assign-to">Assign To: </label>
            <input type="text" id="wd-assign-to" />
            <br />
            <label htmlFor="wd-due-date">Due Date: </label>
            <input type="date" id="wd-due-date" />
            <br />
            <label htmlFor="wd-available-from">Available From: </label>
            <input type="date" id="wd-available-from" />
            <br />
            <label htmlFor="wd-available-to">Available To: </label>
            <input type="date" id="wd-available-to" />
            <br />
            <br />

            <form action="./" method="get">
                <button id="wd-cancel" className="wd-button wd-button-primary">
                    Cancel
                </button>
                <button id="wd-save" className="wd-button wd-button-primary">
                    Save
                </button>
            </form>
        </div>
    );
}
