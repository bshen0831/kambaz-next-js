"use client";

import { useEffect, useRef, useState } from "react";

// "Actions ▾" dropdown built on <details>/<summary>.
// Closes after picking an item, on a click outside, or with Escape. Delete asks for confirmation.
export default function ActionsMenu({
    itemName,
    onEdit,
    onDelete,
}: {
    itemName: string; // used in the confirmation, e.g. "post", "answer", "reply"
    onEdit: () => void;
    onDelete: () => void;
}) {
    const ref = useRef<HTMLDetailsElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const closeOnOutsideClick = (event: PointerEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    const edit = () => {
        setOpen(false);
        onEdit();
    };

    const remove = () => {
        setOpen(false);
        if (window.confirm(`Delete this ${itemName}? This cannot be undone.`)) onDelete();
    };

    return (
        <details
            ref={ref}
            open={open}
            onToggle={(event) => setOpen(event.currentTarget.open)}
            className="wd-pazza-actions"
        >
            <summary className="wd-pazza-actions-btn">Actions ▾</summary>
            <div className="wd-pazza-actions-menu">
                <button type="button" className="wd-pazza-actions-item" onClick={edit}>
                    Edit
                </button>
                <button type="button" className="wd-pazza-actions-item wd-danger" onClick={remove}>
                    Delete
                </button>
            </div>
        </details>
    );
}
