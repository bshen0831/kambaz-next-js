# Pazza: JSON data, per-course data, Zustand state, rich text

These changes turn the Pazza skeleton into a working Q&A board:

- The sample data now lives in the `database/` folder as JSON.
- Every course has its own posts and folders.
- All buttons, forms and filters work, through a Zustand store.
- Post details, answers, discussions and replies use a rich text editor.

## Change history

1. **JSON data and Zustand state.** Data moved to JSON and split by course; every screen wired to `pazzaStore`.
2. **Permissions, unread, rich text.**
   - Only people enrolled in a course can post, answer, start discussions or reply there (section 4).
   - Instructors can see every private post in their course (section 4).
   - A new answer, discussion or reply marks the post unread again for everyone else (sections 1 and 2).
   - The textareas were replaced by a TipTap rich text editor, and stored HTML is sanitized with DOMPurify before it's shown (section 5).

## 1. Data moved to JSON (`app/(kambaz)/database/`)

| File | What it holds |
|---|---|
| `posts.json` (new) | 13 posts with their answers, follow-up discussions and replies. 6 belong to RS101, 4 to RS102 and 3 to RS103. RS104 and RS105 have none because nobody is enrolled in them. |
| `folders.json` (new) | 54 folders, one record per folder per course. RS103 has its own set (`design_review` instead of `hw5` / `hw6`). |
| `index.ts` | Also exports `posts` and `folders`. |

The old `pazza/posts.ts` and `pazza/folders.ts` were **deleted**.

### Changes to the data shape

| Before | After | Why |
|---|---|---|
| no course field | `course: "RS101"` on every post and folder | Each course has its own data. |
| `author: "Tony Stark"` and `authorRole` | `author: "123"` (a user `_id`) | A name isn't unique (`users.json` has two Nick Furys). Name and role are now looked up from the user. |
| `group: "Today"`, `time: "10:24 AM"` and `postedAt` | `createdAt: "2026-11-19T10:24:00"` | Groups and times are computed from the date, so new posts land in the right group. |
| `folders: ["hw1"]` (names) | `folders: ["RS101-hw1"]` (folder `_id`s) | Renaming a folder updates every post that uses it. |
| n/a | `visibility` (`"CLASS"` or `"INDIVIDUAL"`) and `visibleTo` | Supports "Post To: Individual Student(s) / Instructor(s)". |
| n/a | `viewedBy: [userIds]` | Counts each user's first view (`views`). |
| n/a | `readBy: [userIds]` | Who has seen the latest activity. Unread = not in this list. Starts as a copy of `viewedBy`. |
| plain text `details` / `content` | HTML, e.g. `"<p>Can we work in teams of 5?</p>"` | Written by the rich text editor. The sample text was wrapped in `<p>` with `<`, `>` and `&` escaped. |

Dates without a time zone (as in the sample data) are read as local time. Posts created in the app store a full ISO time in UTC.

## 2. State: `app/(kambaz)/store/pazzaStore.ts` (new)

`usePazzaStore` follows the same pattern as `modulesStore` and `coursesStore`. It starts from the JSON and keeps everything in memory.

| Area | Actions |
|---|---|
| Posts | `addPost` (returns the new post), `updatePost`, `deletePost`, `markViewed` (adds the user to `readBy`, and to `viewedBy` plus one view on their first visit) |
| Answers | `addAnswer`, `updateAnswer`, `deleteAnswer` (`kind` is `"STUDENT"` or `"INSTRUCTOR"`) |
| Follow-ups | `addDiscussion`, `updateDiscussion` (text or resolved), `deleteDiscussion` |
| Replies | `addReply`, `updateReply`, `deleteReply` |
| Folders | `addFolder`, `renameFolder`, `moveFolder` (up or down), `deleteFolders`, `selectFolder` |

- `addAnswer`, `addDiscussion` and `addReply` reset `readBy` to just the writer, so the post becomes unread for everyone else, including its author. Edits and deletes don't change `readBy`.
- `selectedFolder` is stored per course (`{ RS101: "RS101-hw1" }`), so a filter in one course doesn't carry over to another.
- `deleteFolders` also removes the folder from every post and clears the filter if it was the active one.
- Components select whole arrays (`state.posts`) and filter during render. A selector that builds a new array on every call makes Zustand v5 re-render forever.

## 3. New helper files in `pazza/`

| File | Purpose |
|---|---|
| `users.ts` | `isInstructor`, `courseAccess` / `useCourseAccess` (returns `{ member, instructor }` for one course), `findUser`, `displayName`, `userName`, `userRole`, `canSeePost`, `canModify`. `INSTRUCTOR_ROLES` moved here from `PazzaNavBar.tsx`. |
| `html.ts` | `sanitizeHtml` (DOMPurify with an allowlist), `htmlToText` (plain text for previews and search), `isBlankHtml` (empty-content check). |
| `dates.ts` | `useNow()`, `postGroup()` ("Today", "Yesterday", "Last Week", then "10/26 - 11/1" for Monday–Sunday weeks), `listTime()` ("10:24 AM", "Tue", "10/29"), `fullTime()` ("Nov 19, 2026, 10:24 AM"). |
| `components/TimeStamp.tsx` | Shows a date in the viewer's time zone. |
| `components/RoleTag.tsx` | The "Student" / "Instructor" label (was copied in 3 places). |
| `components/TextComposer.tsx` | Rich text editor plus Submit (and an optional Cancel) for writing or editing answers, discussions and replies. Shows an error on empty content. |
| `components/RichTextEditor.tsx` | The TipTap editor and its toolbar. |
| `components/RichText.tsx` | Shows stored HTML after sanitizing it. |
| `components/FolderCheckboxes.tsx` | Folder picker shared by New Post and Edit Post. |

`useNow()` returns `null` while rendering on the server, so dates and date groups only render in the browser. Otherwise "Today" or "10:24 AM" could differ between a UTC server and the viewer's browser and cause hydration errors. It also re-renders every minute so the labels stay current.

## 4. Permission rules

All rules come from `useCourseAccess(course)` in `users.ts`, which returns two flags for the signed-in user:

- **member:** enrolled in this course. ADMIN users are members of every course.
- **instructor:** a member with a FACULTY, TA or ADMIN role.
  - Round 1 already stopped instructors of other courses from acting as instructors here. For example, Nick Fury (RS101 faculty) can't manage RS102's folders.

| Action | Who can do it |
|---|---|
| Read posts to the entire class | Everyone, including signed-out users and non-members |
| Read a private post | Its author, the people picked in Post To, and **every instructor of the course** (as on Piazza). "Instructors" in Post To now just means "no other students". |
| Write a post, start a follow-up, reply | Members |
| Write in Student's Answers | Members who aren't instructors |
| Write in Instructor's Answers | Instructors |
| Edit or delete a post, answer, discussion or reply | Its author (while still a member), or any instructor |
| Mark Resolved / Unresolved | The member who started the discussion, or any instructor |
| Manage Class tab and screen | Instructors. Typing the URL directly shows an error instead. |

- The answer editor only appears while that section is empty (a single Piazza-style answer). After that, use Edit.
- Signed-out users see "Sign in…" messages, and signed-in non-members see "Only people enrolled in this course can…" messages, instead of the editors.
- New Post shows "You are not enrolled in this course" and disables the Post button for non-members.
- Before round 2, any signed-in user could post and reply in any course. Instructors only saw private posts addressed to "Instructors".

## 5. What each screen does now

**Folder filters (top bar).** Clicking a folder filters the list of posts, and clicking it again clears the filter. The list shows "Showing posts in hw1 · Show all".

**List of posts (left).**
- Lists this course's posts you can see, newest first, grouped by date.
- Search filters by summary and the plain text of the details (formatting tags are ignored).
- The preview under each post is plain text, with formatting removed.
- ◀ / ▶ collapses the list.
- Unread posts get a blue bar, and private posts get a "Private" tag. A post becomes unread again when someone else adds an answer, discussion or reply.
- The list shows an empty state when nothing matches.

**Class at a Glance.** Every number is computed for this course from the store:
- unread posts for the signed-in user
- unanswered questions
- total posts
- instructor and student responses
- students enrolled (from the enrollments store, so it follows Enroll / Unenroll)

**New Post.**
- All fields are controlled, and errors appear only after you try to submit.
- **Fixed:** pressing Enter in Summary used to reload the page and sign you out. The form now has a real submit handler.
- The button reads "Post My Question!" or "Post My Note!", and the people picker appears only for "Individual". Both used to rely on CSS `:has()` tricks, which were removed from `pazza.css`.
- Details uses the rich text editor (see below). Empty formatting, such as an empty list, counts as blank.
- Under "Individual", a note says the course's instructors can always see private posts.
- If a folder filter is active, that folder starts checked.
- After posting, you're taken to the new post.

**Post screen.**
- Opening a post marks it read. The first visit by each user adds one view.
- Edit (button or Actions) changes the type, summary, details and folders in place.
- Delete asks for confirmation, then returns to Class at a Glance.
- Private posts show "· private" in the header.
- A missing or hidden post shows "Post not found".

**Answers and follow-ups.** You can add, edit and delete answers, discussions and replies, and mark a discussion resolved or unresolved. All of them use the rich text editor.

**Rich text editor** (`RichTextEditor.tsx`, TipTap 3).
- Toolbar: bold, italic, underline, strikethrough, inline code, bulleted list, numbered list, quote, code block, link. Buttons show when that formatting is on at the cursor. Keyboard shortcuts (⌘/Ctrl+B, I, U, Z…) also work.
- **Link** asks for an address. A bare address like `example.com` becomes `https://example.com`. Only http, https and mailto are accepted. With nothing selected, the address itself becomes the link text. Clicking Link on an existing link removes it.
- Headings and horizontal rules are turned off to keep posts simple.
- `immediatelyRender: false`: the editor is created only in the browser. Until then a same-size empty box is shown.
- The editor is labelled for screen readers (`aria-labelledby`), and toolbar buttons have `aria-label` and `aria-pressed`.

**Showing rich text safely** (`RichText.tsx` and `html.ts`).
- Stored HTML is always passed through `sanitizeHtml` before it's put on the page. Only the tags the editor produces are kept (`p`, `strong`, `em`, `u`, `s`, `code`, `pre`, lists, `blockquote`, `a`…), and only `href`, `target` and `rel` attributes.
- Scripts, event handlers (`onerror`, `onclick`…), styles, images and `javascript:` links are removed.
- Every link opens in a new tab with `rel="noopener noreferrer nofollow"`.
- This protects the page even if bad HTML reaches the data later (for example from a future server or an edited JSON file), not only what the editor produces.
- DOMPurify needs the browser, so on the server `RichText` renders an empty box and the content appears right after hydration, the same approach as the dates.

**Actions menu.** Now has `onEdit` and `onDelete` props. It closes after you pick an item, when you click outside it, or when you press Escape. Delete asks for confirmation.

**Manage Class → Manage Folders.**
- **Add:** with Enter or the button. Names can't be empty, can't contain spaces, and can't match another folder in any letter case.
- **Rename:** inline. Enter saves and Escape cancels.
- **Reorder:** ▲ / ▼ buttons.
- **Delete:** select folders, then confirm. The delete button is disabled until something is selected.

## 6. Other edits

- `package.json`: added `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extensions` (all `3.32.2`) and `dompurify` (`3.4.17`). Versions are pinned exactly and were at least two weeks old when installed.
- `PazzaNavBar.tsx`: uses `useCourseAccess`, and shows the username when a signed-up user has no first or last name.
- `PostListItem.tsx`: uses the `Post` type from the store instead of building its own.
- `pazza.css`:
  - Removed the `:has()` rules for the Post To picker and the Post button text.
  - Added section 14 at the end: unread item, private tag, filter status, composer buttons, resolved discussion, Edit Post form, folder name error, disabled buttons.
  - Added section 15: editor box, toolbar, placeholder text, hint text, and formatting for lists, quotes, code and links in both the editor and stored content.
- `layout.tsx` is unchanged.

## 7. Known limitations

- **Nothing is saved.** Like every other Kambaz store, the data resets on a full page reload, and so does the signed-in user (`AccountContext`). Zustand's `persist` middleware could save it to `localStorage` later.
- **Users from Sign up** aren't in `users.json`. Their name shows correctly while they're signed in, through `currentUser`, and as "Unknown user" after that.
- **Not done:** the other Manage Class tabs, dragging to reorder folders, and images or file uploads in the editor.
- **Rich text appears just after page load** on a full reload, because sanitizing needs the browser. Client-side navigation shows it immediately.
- **Non-members can still read** a course's class-wide posts; only writing is blocked.
- **Deleting a post** briefly shows "Post not found" before the page navigates back to Q & A.

## 8. Verification

- `npx tsc --noEmit`: no errors in the Pazza code or the store. The only error comes from an old generated file, `.next/types/validator.ts`, which looks for an `app/page.js` that doesn't exist.
- `npx eslint` on `pazza/` and `pazzaStore.ts`: clean.
- Round 2 browser test (Playwright, against `next dev`): 31 checks, no console or hydration errors.
  - Rich text:
    - stored HTML renders, and list previews are plain text
    - an empty editor counts as blank
    - bold, list and link are saved and shown, and the link gets `target="_blank"` and `rel="noopener…"`
    - Edit Post keeps the formatting
    - answers, discussions and replies use the editor; a reply can be edited
    - the composer clears after submitting
  - Membership: Tony (not in RS103) can read RS103 but can't post, answer or start a discussion there.
  - Unread: Tony's answer on P104 makes it unread for its author Steve, and opening it makes it read again.
  - Private posts: a post sent only to Bruce Wayne is hidden from Steve and visible to Bruce and to Nick (RS101 instructor). Nick still can't see RS102's private post or write instructor answers there.
  - Sanitizer: with the same settings, DOMPurify removes `<script>`, `onerror` / `onclick`, `style` and `javascript:` links, and keeps a normal link.
- Round 1 browser test, adapted to the editor: 45 checks still pass:
  - As a student (Tony Stark):
    - the RS101 numbers (2 unread, 1 unanswered, 6 / 3 / 4 / 4)
    - folder filter, search and collapse
    - Enter in an empty New Post form doesn't reload the page
    - creating a private note and editing it
    - an answer: add, edit; a discussion: add, reply, resolve, delete the reply
    - the Actions menu closes on an outside click
    - blocked from Manage Class
  - As faculty (Nick Fury):
    - RS102 hides the private post and the Manage tab
    - RS103 and RS104 show their own data
    - folders: add, reject duplicates and spaces, rename, move, delete (the tag disappears from the post)
    - deleting another user's post
