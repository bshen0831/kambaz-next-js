"use client";

import { useSyncExternalStore } from "react";
import { sanitizeHtml } from "../html";

const subscribe = () => () => {};

// Shows stored rich text (HTML) after sanitizing it. Sanitizing needs the browser,
// so the server renders an empty box and the content appears after hydration.
export default function RichText({ html, className = "" }: { html: string; className?: string }) {
    const isClient = useSyncExternalStore(subscribe, () => true, () => false);
    return (
        <div
            className={`wd-pazza-rich-text ${className}`}
            dangerouslySetInnerHTML={{ __html: isClient ? sanitizeHtml(html) : "" }}
        />
    );
}
