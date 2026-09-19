import AssignmentItem from "./AssignmentItem";

export default async function Assignments({
    params,
}: {
    params: Promise<{ cid: string }>;
}) {
    const { cid } = await params;
    return (
        <div id="wd-assignments">
            <label htmlFor="wd-search-assignment"></label>
            <input placeholder="Search assignments..." id="wd-search-assignment" />
            <button id="wd-add-assignment-group" className="wd-button wd-button-primary">
                + Group
            </button>
            <button id="wd-add-assignment" className="wd-button wd-button-primary">
                + Assignment
            </button>
            <br />
            <h3 className="wd-assignments-title">ASSIGNMENTS 40% of Total
                <button id="wd-add-assignment-group" className="wd-button wd-button-primary">
                    +
                </button>
            </h3>

            {/* h3 wd-assignments-title */}
            <ul id="wd-assignment-list">
                <AssignmentItem cid={cid} title="Assignment 1: Introduction to Web Development" aid={"1"} details={"asdf"} />
                <AssignmentItem cid={cid} title="Assignment 2: Creating a Simple Web Page" aid={"2"} details={"fdsa"} />
                <AssignmentItem cid={cid} title="Assignment 3: Building a React Component" aid={"3"} details={"a"} />
                <AssignmentItem cid={cid} title="Assignment 4: Styling with CSS" aid={"4"} details={"s"} />
            </ul>
        </div>
    );
}