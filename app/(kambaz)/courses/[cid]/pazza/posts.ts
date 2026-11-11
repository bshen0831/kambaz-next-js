// Sample data for the skeleton. Later it comes from state / the database.
// "group" and "time" are typed by hand for now; later they are computed from the creation date.

export type Role = "STUDENT" | "INSTRUCTOR";

export type Answer = {
    _id: string;
    author: string;
    time: string;
    content: string;
};

export type Reply = {
    _id: string;
    author: string;
    authorRole: Role;
    time: string;
    content: string;
};

export type Discussion = Reply & {
    resolved: boolean;
    replies: Reply[];
};

export type Post = {
    _id: string;
    type: "QUESTION" | "NOTE";
    summary: string;
    details: string;
    folders: string[];
    author: string;
    authorRole: Role;
    group: string;      // accordion group in the list of posts
    time: string;       // time shown in the list of posts
    postedAt: string;   // time shown on the post screen
    views: number;
    studentAnswers: Answer[];
    instructorAnswers: Answer[];
    discussions: Discussion[];
};

export const POST_GROUPS = ["Today", "Yesterday", "Last Week", "10/26 - 11/1"];

export const POSTS: Post[] = [
    {
        _id: "1",
        type: "QUESTION",
        summary: "How do I compute specific impulse from thrust and mass flow rate?",
        details: "HW1 problem 3 gives the thrust and the propellant mass flow rate. Is Isp = F / (m · g0) the right formula, and which units should I use?",
        folders: ["hw1"],
        author: "Tony Stark",
        authorRole: "STUDENT",
        group: "Today",
        time: "10:24 AM",
        postedAt: "Nov 11, 2026, 10:24 AM",
        views: 3,
        studentAnswers: [],
        instructorAnswers: [
            {
                _id: "a1",
                author: "Nick Fury",
                time: "Nov 11, 2026, 11:02 AM",
                content: "Yes. Use Isp = F / (m · g0) with F in newtons, m in kg/s and g0 = 9.80665 m/s². The result is in seconds.",
            },
        ],
        discussions: [
            {
                _id: "d1",
                author: "Bruce Wayne",
                authorRole: "STUDENT",
                time: "Nov 11, 2026, 11:30 AM",
                content: "Does g0 change if the rocket is in orbit?",
                resolved: false,
                replies: [
                    {
                        _id: "r1",
                        author: "Tony Stark",
                        authorRole: "STUDENT",
                        time: "Nov 11, 2026, 11:41 AM",
                        content: "I think g0 is just a constant used for the units?",
                    },
                    {
                        _id: "r2",
                        author: "Nick Fury",
                        authorRole: "INSTRUCTOR",
                        time: "Nov 11, 2026, 12:05 PM",
                        content: "Correct. g0 is standard gravity at sea level; it stays the same no matter where the rocket is.",
                    },
                ],
            },
        ],
    },
    {
        _id: "2",
        type: "NOTE",
        summary: "Office hours moved to Thursday this week",
        details: "This week's office hours are on Thursday 3-5pm in the usual room. The Zoom link is on Canvas.",
        folders: ["office_hours", "logistics"],
        author: "Nick Fury",
        authorRole: "INSTRUCTOR",
        group: "Today",
        time: "9:02 AM",
        postedAt: "Nov 11, 2026, 9:02 AM",
        views: 12,
        studentAnswers: [],
        instructorAnswers: [],
        discussions: [],
    },
    {
        _id: "3",
        type: "QUESTION",
        summary: "Why does the nozzle expansion ratio matter at sea level?",
        details: "Why would a nozzle optimized for vacuum perform worse at sea level? More expansion should always mean more thrust, right?",
        folders: ["hw2"],
        author: "Bruce Wayne",
        authorRole: "STUDENT",
        group: "Yesterday",
        time: "Tue",
        postedAt: "Nov 10, 2026, 4:15 PM",
        views: 8,
        studentAnswers: [
            {
                _id: "a2",
                author: "Steve Rogers",
                time: "Nov 10, 2026, 6:20 PM",
                content: "At sea level an over-expanded nozzle drops the exit pressure below the outside air pressure, so the pressure-thrust term becomes negative.",
            },
        ],
        instructorAnswers: [],
        discussions: [
            {
                _id: "d2",
                author: "Bruce Wayne",
                authorRole: "STUDENT",
                time: "Nov 10, 2026, 7:00 PM",
                content: "Thanks, the pressure-thrust term was what I was missing.",
                resolved: true,
                replies: [],
            },
        ],
    },
    {
        _id: "4",
        type: "QUESTION",
        summary: "What is the maximum team size for the final project?",
        details: "Can we work in teams of 5, or is the limit 4?",
        folders: ["project"],
        author: "Steve Rogers",
        authorRole: "STUDENT",
        group: "Last Week",
        time: "Sun",
        postedAt: "Nov 8, 2026, 8:45 PM",
        views: 5,
        studentAnswers: [],
        instructorAnswers: [],
        discussions: [],
    },
    {
        _id: "5",
        type: "QUESTION",
        summary: "Which topics are covered on Exam 1?",
        details: "Does Exam 1 include hybrid rocket motors, or only solid and liquid propulsion?",
        folders: ["exam"],
        author: "Thor Odinson",
        authorRole: "STUDENT",
        group: "10/26 - 11/1",
        time: "10/29",
        postedAt: "Oct 29, 2026, 1:10 PM",
        views: 21,
        studentAnswers: [],
        instructorAnswers: [
            {
                _id: "a3",
                author: "Natasha Romanoff",
                time: "Oct 29, 2026, 3:30 PM",
                content: "Exam 1 covers solid and liquid propulsion. Hybrid motors are not included.",
            },
        ],
        discussions: [],
    },
    {
        _id: "6",
        type: "NOTE",
        summary: "Welcome to Rocket Propulsion!",
        details: "Welcome everyone! Use Pazza for all course questions so that everyone benefits from the answers. Search before posting and pick the right folder.",
        folders: ["logistics", "other"],
        author: "Nick Fury",
        authorRole: "INSTRUCTOR",
        group: "10/26 - 11/1",
        time: "10/26",
        postedAt: "Oct 26, 2026, 9:00 AM",
        views: 34,
        studentAnswers: [],
        instructorAnswers: [],
        discussions: [],
    },
];
