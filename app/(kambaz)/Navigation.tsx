
"use client";

import { AiFillBook, AiFillCalendar, AiFillProject, AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { FaRegCircleUser, FaCircleQuestion } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/dashboard", icon: AiFillBook },
    { label: "Calendar", path: "/calendar", icon: AiFillCalendar },
    { label: "Inbox", path: "/inbox", icon: AiOutlineInbox },
    { label: "Labs", path: "/labs", icon: AiFillProject },
    { label: "History", path: "/history", icon: IoCalendarOutline },
    { label: "Help", path: "/labs", icon: FaCircleQuestion },
] as const;

export default function KambazNavigation() {
    const pathname = usePathname() ?? "";
    const accountActive = pathname.includes("/account");
    return (
        <nav
            id="wd-kambaz-navigation"
            className="fixed bottom-0 top-0 z-20 hidden w-[120px] bg-black md:block"
        >
            <Link
                href="/account"
                id="wd-account-link"
                className={`block py-3 text-center text-sm no-underline ${accountActive ? "bg-white text-red-600" : "bg-black text-white"
                    }`}
            >
                <FaRegCircleUser
                    className={`inline-block text-3xl ${accountActive ? "text-red-600" : "text-white"
                        }`}
                />
                <br />
                Account
            </Link>

            {LINKS.map((link) => {
                const active =
                    link.label === "Courses"
                        ? pathname.includes("/courses")
                        : pathname.includes(link.path);
                const Icon = link.icon;
                return (
                    <Link
                        key={link.label}
                        href={link.path}
                        id={`wd-${link.label.toLowerCase()}-link`}
                        className={`block py-3 text-center text-sm no-underline ${active ? "bg-white text-red-600" : "bg-black text-white"
                            }`}
                    >
                        <Icon className="inline-block text-3xl text-red-500" />
                        <br />
                        {link.label}
                    </Link>
                );
            })}

        </nav>
    );
}