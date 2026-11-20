import { useSyncExternalStore } from "react";

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

// ---------- useNow ----------
// Returns the current time rounded to the minute, or null while rendering on the server.
// Labels such as "Today" or "10:24 AM" depend on the viewer's clock and time zone, so
// they are only rendered in the browser (avoids hydration mismatches). Re-renders every minute.
function subscribe(onChange: () => void) {
    const timer = setInterval(onChange, MINUTE);
    return () => clearInterval(timer);
}
const currentMinute = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const serverSnapshot = () => null;

export function useNow(): number | null {
    return useSyncExternalStore(subscribe, currentMinute, serverSnapshot);
}

// ---------- helpers ----------
function startOfDay(time: number | Date) {
    const day = new Date(time);
    day.setHours(0, 0, 0, 0);
    return day;
}

// whole calendar days between the date and now (0 = today, 1 = yesterday, ...)
function daysAgo(date: Date, now: number) {
    return Math.round((startOfDay(now).getTime() - startOfDay(date).getTime()) / DAY);
}

const monthDay = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;

// ---------- formats ----------
// Accordion group in the list of posts: Today, Yesterday, Last Week, then weeks (Mon - Sun) like "10/26 - 11/1"
export function postGroup(iso: string, now: number) {
    const date = new Date(iso);
    const days = daysAgo(date, now);
    if (days <= 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return "Last Week";
    const monday = startOfDay(date);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return `${monthDay(monday)} - ${monthDay(sunday)}`;
}

// Time in the list of posts: "10:24 AM" today, "Tue" this week, "10/29" before that
export function listTime(iso: string, now: number) {
    const date = new Date(iso);
    const days = daysAgo(date, now);
    if (days <= 0) return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    if (days < 7) return date.toLocaleDateString("en-US", { weekday: "short" });
    return monthDay(date);
}

// Time on the post screen: "Nov 11, 2026, 10:24 AM"
export function fullTime(iso: string) {
    return new Date(iso).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}
