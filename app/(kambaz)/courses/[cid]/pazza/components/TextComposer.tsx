"use client";

import { useState, type FormEvent } from "react";
import { isBlankHtml } from "../html";
import RichTextEditor from "./RichTextEditor";

// A rich text editor with a submit button, used to write and to edit answers, discussions and replies.
// Without onCancel it is a "compose" box that clears itself after submitting.
// With onCancel it is an "edit" box that shows a Cancel button.
export default function TextComposer({
    label,
    hideLabel = false,
    placeholder,
    minHeight = 72,
    submitLabel,
    initialValue = "",
    onSubmit,
    onCancel,
}: {
    label: string;
    hideLabel?: boolean;
    placeholder?: string;
    minHeight?: number;
    submitLabel: string;
    initialValue?: string;
    onSubmit: (html: string) => void;
    onCancel?: () => void;
}) {
    const [html, setHtml] = useState(initialValue);
    const [showError, setShowError] = useState(false);
    const blank = isBlankHtml(html);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (blank) {
            setShowError(true);
            return;
        }
        onSubmit(html);
        setShowError(false);
        if (!onCancel) setHtml("");
    };

    return (
        <form className="wd-pazza-composer" onSubmit={submit}>
            <RichTextEditor
                label={label}
                hideLabel={hideLabel}
                placeholder={placeholder}
                minHeight={minHeight}
                value={html}
                onChange={setHtml}
            />
            {showError && blank && <p className="wd-pazza-error">Write something first.</p>}
            <div className="wd-pazza-composer-buttons">
                <button type="submit" className="wd-pazza-primary-btn">
                    {submitLabel}
                </button>
                {onCancel && (
                    <button type="button" className="wd-pazza-secondary-btn" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
