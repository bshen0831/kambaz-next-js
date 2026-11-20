"use client";

import { fullTime, listTime, useNow } from "../dates";

// Renders a date in the viewer's time zone. Empty on the server, filled in after hydration.
export default function TimeStamp({
    iso,
    format = "full",
    className = "wd-pazza-author",
}: {
    iso: string;
    format?: "full" | "list";
    className?: string;
}) {
    const now = useNow();
    return (
        <time dateTime={iso} className={className}>
            {now === null ? "" : format === "list" ? listTime(iso, now) : fullTime(iso)}
        </time>
    );
}
