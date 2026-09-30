import { FaCheckCircle, FaHome, FaStream, FaStar } from "react-icons/fa";
import { FaFileImport } from "react-icons/fa6";
import { AiOutlineImport } from "react-icons/ai";
import { MdAnalytics, MdAnnouncement, MdDoNotDisturbAlt, MdNotifications } from "react-icons/md";
export default function CourseStatus() {
    return (
        <div id="wd-course-status">
            <h2>Course Status</h2>
            <h2 className="mb-3 text-xl font-semibold">Course Status</h2>
            <div className="flex gap-1">
                <button
                    type="button"
                    className="inline-flex min-w-0 flex-1 items-center justify-center rounded border border-neutral-300 bg-white px-1.5 py-1.5 text-xs"
                >
                    <MdDoNotDisturbAlt className="me-1 shrink-0 text-base" /> Unpublish
                </button>
                <button
                    type="button"
                    className="inline-flex min-w-0 flex-1 items-center justify-center rounded bg-green-600 px-1.5 py-1.5 text-xs text-white hover:bg-green-700"
                >
                    <FaCheckCircle className="me-1 shrink-0 text-base" /> Publish
                </button>
            </div>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <AiOutlineImport className="me-1 shrink-0 text-base" /> Import Existing Content
            </button>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <FaFileImport className="me-1 shrink-0 text-base" /> Import from Commons
            </button>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <FaHome className="me-1 shrink-0 text-base" /> Choose Home Page
            </button>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <FaStream className="me-1 shrink-0 text-base" /> View Course Stream
            </button>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <MdAnnouncement className="me-1 shrink-0 text-base" /> New Announcement
            </button>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <MdAnalytics className="me-1 shrink-0 text-base" /> New Analytics
            </button>
            <button
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <MdNotifications className="me-1 shrink-0 text-base" /> View Course Notifications
            </button>
            <button
                id="wd-ai-status"
                type="button"
                className="mb-1 flex w-full items-center rounded border border-neutral-300 bg-white px-3 py-2 text-left text-sm"
            >
                <FaStar className="me-1 shrink-0 text-base" /> Sample action
            </button>

        </div>
    );
}