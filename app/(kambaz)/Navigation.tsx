
"use client";

import { AiFillBook, AiFillCalendar, AiFillProject, AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { FaRegCircleUser, FaCircleQuestion } from "react-icons/fa6";
import Link from "next/link";
import "@/app/labs/lab2/tailwind/utilities.css";

export default function KambazNavigation() {
    return (
        <nav
            id="wd-kambaz-navigation"
            className="fixed bottom-0 top-0 z-20 hidden w-[120px] bg-black md:block"
        >
            <Link
                href="/account"
                id="wd-account-link"
                className="block bg-black py-3 text-center text-sm text-white no-underline"
            >
                <FaRegCircleUser className="inline-block text-3xl text-red-500" />
                <br />
                Account
            </Link>
            <Link
                href="/dashboard"
                id="wd-dashboard-link"
                className="block bg-white py-3 text-center text-sm text-red-600 no-underline"
            >
                <AiOutlineDashboard className="inline-block text-3xl text-red-600" />
                <br />
                Dashboard
            </Link>

            <Link href="/courses"
                id="wd-course-link"
                className="block bg-white py-3 text-center text-sm text-red-600 no-underline">
                <AiFillBook className="inline-block text-3xl text-red-600" />
                <br />
                Courses
            </Link>

            <Link href="/calendar"
                id="wd-calendar-link"
                className="block bg-white py-3 text-center text-sm text-red-600 no-underline">
                <AiFillCalendar className="inline-block text-3xl text-red-600" />
                <br />
                Calendar
            </Link>
            <Link href="/inbox"
                id="wd-inbox-link"
                className="block bg-white py-3 text-center text-sm text-red-600 no-underline">
                <AiOutlineInbox className="inline-block text-3xl text-red-600" />
                <br />
                Inbox
            </Link>
            <Link href="/labs"
                id="wd-labs-link"
                className="block bg-white py-3 text-center text-sm text-red-600 no-underline">
                <AiFillProject className="inline-block text-3xl text-red-600" />
                <br />
                Labs
            </Link>
            <Link href="/labs"
                id="wd-ai-nav-help"
                className="block bg-white py-3 text-center text-sm text-red-600 no-underline">
                <FaCircleQuestion className="inline-block text-3xl text-red-600" />
                <br />
                Help
            </Link>

        </nav>
    );
}