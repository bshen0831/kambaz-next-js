"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import {
    FaBold,
    FaCode,
    FaItalic,
    FaLink,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaStrikethrough,
    FaTerminal,
    FaUnderline,
} from "react-icons/fa6";

// Rich text editor (TipTap) used for post details, answers, discussions and replies.
// value / onChange hold HTML; an empty editor reports "".
export default function RichTextEditor({
    value,
    onChange,
    label,
    hideLabel = false,
    labelId,
    placeholder = "",
    minHeight = 96,
}: {
    value: string;
    onChange: (html: string) => void;
    label?: string; // shown above the editor (or only to screen readers with hideLabel)
    hideLabel?: boolean;
    labelId?: string; // id of an existing label element, instead of label
    placeholder?: string;
    minHeight?: number;
}) {
    const ownLabelId = useId();
    const ariaLabelledBy = labelId ?? ownLabelId;

    // keep the latest onChange without re-creating the editor
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                horizontalRule: false,
                link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
            }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        immediatelyRender: false, // the editor only exists in the browser (no hydration mismatch)
        editorProps: {
            attributes: {
                class: "wd-pazza-rte-content wd-pazza-rich-text",
                role: "textbox",
                "aria-multiline": "true",
                "aria-labelledby": ariaLabelledBy,
                style: `min-height: ${minHeight}px`,
            },
        },
        onUpdate: ({ editor }) => onChangeRef.current(editor.isEmpty ? "" : editor.getHTML()),
    });

    // when the parent changes the value (e.g. clears it after submitting), update the editor
    useEffect(() => {
        if (!editor) return;
        const current = editor.isEmpty ? "" : editor.getHTML();
        if (value !== current) editor.commands.setContent(value, { emitUpdate: false });
    }, [editor, value]);

    return (
        <div className="wd-pazza-rte">
            {!labelId && label && (
                <span id={ownLabelId} className={hideLabel ? "wd-pazza-sr-only" : "wd-pazza-label"}>
                    {label}
                </span>
            )}
            <div className="wd-pazza-rte-box">
                <Toolbar editor={editor} />
                {editor ? (
                    <EditorContent editor={editor} />
                ) : (
                    // placeholder box with the same height until the editor loads in the browser
                    <div className="wd-pazza-rte-content" style={{ minHeight }} aria-hidden="true" />
                )}
            </div>
        </div>
    );
}

function Toolbar({ editor }: { editor: Editor | null }) {
    // re-render the toolbar when the selection or formatting changes
    const active = useEditorState({
        editor,
        selector: ({ editor }) =>
            editor
                ? {
                      bold: editor.isActive("bold"),
                      italic: editor.isActive("italic"),
                      underline: editor.isActive("underline"),
                      strike: editor.isActive("strike"),
                      code: editor.isActive("code"),
                      bulletList: editor.isActive("bulletList"),
                      orderedList: editor.isActive("orderedList"),
                      blockquote: editor.isActive("blockquote"),
                      codeBlock: editor.isActive("codeBlock"),
                      link: editor.isActive("link"),
                  }
                : null,
    });

    const toggleLink = () => {
        if (!editor) return;
        if (editor.isActive("link")) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        const input = window.prompt("Link address (URL)")?.trim();
        if (!input) return;
        const href = /^[a-z][a-z0-9+.-]*:/i.test(input) ? input : `https://${input}`;
        if (!/^(https?:|mailto:)/i.test(href)) {
            window.alert("Only http, https and mailto links are allowed.");
            return;
        }
        if (editor.state.selection.empty) {
            // nothing selected: insert the address itself as the link text
            editor
                .chain()
                .focus()
                .insertContent({ type: "text", text: input, marks: [{ type: "link", attrs: { href } }] })
                .run();
        } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
        }
    };

    const run = (command: (editor: Editor) => void) => () => {
        if (editor) command(editor);
    };

    return (
        <div className="wd-pazza-rte-toolbar" role="toolbar" aria-label="Formatting">
            <ToolButton label="Bold" active={active?.bold} disabled={!editor} onClick={run((e) => e.chain().focus().toggleBold().run())}>
                <FaBold />
            </ToolButton>
            <ToolButton label="Italic" active={active?.italic} disabled={!editor} onClick={run((e) => e.chain().focus().toggleItalic().run())}>
                <FaItalic />
            </ToolButton>
            <ToolButton label="Underline" active={active?.underline} disabled={!editor} onClick={run((e) => e.chain().focus().toggleUnderline().run())}>
                <FaUnderline />
            </ToolButton>
            <ToolButton label="Strikethrough" active={active?.strike} disabled={!editor} onClick={run((e) => e.chain().focus().toggleStrike().run())}>
                <FaStrikethrough />
            </ToolButton>
            <ToolButton label="Inline code" active={active?.code} disabled={!editor} onClick={run((e) => e.chain().focus().toggleCode().run())}>
                <FaCode />
            </ToolButton>
            <span className="wd-pazza-rte-divider" aria-hidden="true" />
            <ToolButton label="Bulleted list" active={active?.bulletList} disabled={!editor} onClick={run((e) => e.chain().focus().toggleBulletList().run())}>
                <FaListUl />
            </ToolButton>
            <ToolButton label="Numbered list" active={active?.orderedList} disabled={!editor} onClick={run((e) => e.chain().focus().toggleOrderedList().run())}>
                <FaListOl />
            </ToolButton>
            <ToolButton label="Quote" active={active?.blockquote} disabled={!editor} onClick={run((e) => e.chain().focus().toggleBlockquote().run())}>
                <FaQuoteLeft />
            </ToolButton>
            <ToolButton label="Code block" active={active?.codeBlock} disabled={!editor} onClick={run((e) => e.chain().focus().toggleCodeBlock().run())}>
                <FaTerminal />
            </ToolButton>
            <ToolButton label={active?.link ? "Remove link" : "Link"} active={active?.link} disabled={!editor} onClick={toggleLink}>
                <FaLink />
            </ToolButton>
        </div>
    );
}

function ToolButton({
    label,
    active = false,
    disabled,
    onClick,
    children,
}: {
    label: string;
    active?: boolean;
    disabled: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button" // never submit the surrounding form
            className={`wd-pazza-rte-btn ${active ? "wd-active" : ""}`}
            aria-label={label}
            aria-pressed={active}
            title={label}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()} // keep the cursor in the editor
            onClick={onClick}
        >
            {children}
        </button>
    );
}
