import DOMPurify from "dompurify";

// Post details, answers, discussions and replies are stored as HTML written by the rich text editor.
// HTML from users can carry scripts, so it is ALWAYS sanitized before being put on the page.

// Only the formatting the editor can produce is allowed; everything else is removed
const ALLOWED_TAGS = [
    "p", "br", "strong", "b", "em", "i", "u", "s", "code", "pre",
    "ul", "ol", "li", "blockquote", "a", "hr", "h1", "h2", "h3", "h4",
];
const ALLOWED_ATTR = ["href", "target", "rel"];

let linkHookAdded = false;

// Returns safe HTML. DOMPurify needs a browser DOM, so on the server it returns "" and the
// content is filled in after hydration (see RichText).
export function sanitizeHtml(html: string) {
    if (!DOMPurify.isSupported) return "";
    if (!linkHookAdded) {
        // links open in a new tab and can't reach back into this page
        DOMPurify.addHook("afterSanitizeAttributes", (node) => {
            if (node.tagName === "A") {
                node.setAttribute("target", "_blank");
                node.setAttribute("rel", "noopener noreferrer nofollow");
            }
        });
        linkHookAdded = true;
    }
    // DOMPurify also drops javascript: and other unsafe URLs in href
    return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}

const ENTITIES: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    "#39": "'",
    nbsp: " ",
};

// Plain text version of the HTML, for the list preview, search and "is it empty?" checks.
// The result is shown as React text (escaped), never as HTML.
export function htmlToText(html: string) {
    return html
        .replace(/<(br|\/p|\/li|\/h\d|\/blockquote|\/pre)[^>]*>/gi, " ")
        .replace(/<[^>]*>/g, "")
        .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, entity: string) => ENTITIES[entity])
        .replace(/\s+/g, " ")
        .trim();
}

export function isBlankHtml(html: string) {
    return htmlToText(html) === "";
}
