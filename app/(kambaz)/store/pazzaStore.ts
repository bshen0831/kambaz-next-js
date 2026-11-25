"use client";

import { create } from "zustand";
import postsJson from "../database/posts.json";
import foldersJson from "../database/folders.json";

export type Role = "STUDENT" | "INSTRUCTOR";
export type PostType = "QUESTION" | "NOTE";
export type Visibility = "CLASS" | "INDIVIDUAL";

// Special value in Post.visibleTo: every instructor of the course can see the post
export const INSTRUCTORS_AUDIENCE = "INSTRUCTORS";

// Answers, follow-up discussions and replies all share these fields.
// author is a user _id; createdAt is an ISO date string; content is HTML from the rich text editor.
export type Entry = {
  _id: string;
  author: string;
  createdAt: string;
  content: string;
};

export type Answer = Entry;
export type Reply = Entry;

export type Discussion = Entry & {
  resolved: boolean;
  replies: Reply[];
};

export type Post = {
  _id: string;
  course: string;
  type: PostType;
  summary: string;
  details: string; // HTML from the rich text editor
  folders: string[]; // folder _ids
  author: string; // user _id
  visibility: Visibility;
  visibleTo: string[]; // user _ids and/or INSTRUCTORS_AUDIENCE, used when visibility is INDIVIDUAL
  createdAt: string;
  views: number;
  viewedBy: string[]; // user _ids that ever opened the post (views counts each user once)
  readBy: string[]; // user _ids that have seen the latest activity (unread = not in this list)
  studentAnswers: Answer[];
  instructorAnswers: Answer[];
  discussions: Discussion[];
};

export type Folder = {
  _id: string;
  course: string;
  name: string;
};

export type NewPost = Pick<
  Post,
  "course" | "type" | "summary" | "details" | "folders" | "author" | "visibility" | "visibleTo"
>;
export type PostChanges = Partial<Pick<Post, "type" | "summary" | "details" | "folders">>;

type PazzaStore = {
  posts: Post[];
  folders: Folder[];
  selectedFolder: Record<string, string | null>; // course _id -> folder _id used to filter the post list

  addPost: (post: NewPost) => Post;
  updatePost: (postId: string, changes: PostChanges) => void;
  deletePost: (postId: string) => void;
  markViewed: (postId: string, userId: string) => void;

  addAnswer: (postId: string, kind: Role, author: string, content: string) => void;
  updateAnswer: (postId: string, kind: Role, answerId: string, content: string) => void;
  deleteAnswer: (postId: string, kind: Role, answerId: string) => void;

  addDiscussion: (postId: string, author: string, content: string) => void;
  updateDiscussion: (
    postId: string,
    discussionId: string,
    changes: Partial<Pick<Discussion, "content" | "resolved">>,
  ) => void;
  deleteDiscussion: (postId: string, discussionId: string) => void;

  addReply: (postId: string, discussionId: string, author: string, content: string) => void;
  updateReply: (postId: string, discussionId: string, replyId: string, content: string) => void;
  deleteReply: (postId: string, discussionId: string, replyId: string) => void;

  addFolder: (course: string, name: string) => void;
  renameFolder: (folderId: string, name: string) => void;
  moveFolder: (folderId: string, direction: -1 | 1) => void;
  deleteFolders: (folderIds: string[]) => void;
  selectFolder: (course: string, folderId: string | null) => void;
};

const timestamp = () => new Date().toISOString();

const answersKey = (kind: Role) =>
  kind === "INSTRUCTOR" ? "instructorAnswers" : "studentAnswers";

function newEntry(author: string, content: string): Entry {
  return { _id: crypto.randomUUID(), author, createdAt: timestamp(), content };
}

function mapPost(posts: Post[], postId: string, update: (post: Post) => Post) {
  return posts.map((post) => (post._id === postId ? update(post) : post));
}

// New activity (answer, discussion, reply) makes the post unread again for everyone but its author
function withActivity(post: Post, author: string): Post {
  return { ...post, readBy: [author] };
}

function mapDiscussion(
  posts: Post[],
  postId: string,
  discussionId: string,
  update: (discussion: Discussion) => Discussion,
) {
  return mapPost(posts, postId, (post) => ({
    ...post,
    discussions: post.discussions.map((d) => (d._id === discussionId ? update(d) : d)),
  }));
}

export const usePazzaStore = create<PazzaStore>((set) => ({
  // JSON infers plain strings ("QUESTION" -> string) and never[] for empty arrays
  posts: postsJson as unknown as Post[],
  folders: foldersJson as Folder[],
  selectedFolder: {},

  // ---------- posts ----------
  addPost: (post) => {
    const created: Post = {
      ...post,
      _id: crypto.randomUUID(),
      createdAt: timestamp(),
      views: 1,
      viewedBy: [post.author],
      readBy: [post.author],
      studentAnswers: [],
      instructorAnswers: [],
      discussions: [],
    };
    set((state) => ({ posts: [created, ...state.posts] }));
    return created;
  },
  updatePost: (postId, changes) =>
    set((state) => ({
      posts: mapPost(state.posts, postId, (post) => ({ ...post, ...changes })),
    })),
  deletePost: (postId) =>
    set((state) => ({ posts: state.posts.filter((post) => post._id !== postId) })),
  // Opening a post marks it read; the first visit by a user also counts a view
  markViewed: (postId, userId) =>
    set((state) => {
      const post = state.posts.find((p) => p._id === postId);
      if (!post) return state;
      const firstView = !post.viewedBy.includes(userId);
      const unread = !post.readBy.includes(userId);
      if (!firstView && !unread) return state;
      return {
        posts: mapPost(state.posts, postId, (p) => ({
          ...p,
          views: firstView ? p.views + 1 : p.views,
          viewedBy: firstView ? [...p.viewedBy, userId] : p.viewedBy,
          readBy: unread ? [...p.readBy, userId] : p.readBy,
        })),
      };
    }),

  // ---------- answers ----------
  addAnswer: (postId, kind, author, content) =>
    set((state) => ({
      posts: mapPost(state.posts, postId, (post) => ({
        ...withActivity(post, author),
        [answersKey(kind)]: [...post[answersKey(kind)], newEntry(author, content)],
      })),
    })),
  updateAnswer: (postId, kind, answerId, content) =>
    set((state) => ({
      posts: mapPost(state.posts, postId, (post) => ({
        ...post,
        [answersKey(kind)]: post[answersKey(kind)].map((a) =>
          a._id === answerId ? { ...a, content } : a,
        ),
      })),
    })),
  deleteAnswer: (postId, kind, answerId) =>
    set((state) => ({
      posts: mapPost(state.posts, postId, (post) => ({
        ...post,
        [answersKey(kind)]: post[answersKey(kind)].filter((a) => a._id !== answerId),
      })),
    })),

  // ---------- follow-up discussions ----------
  addDiscussion: (postId, author, content) =>
    set((state) => ({
      posts: mapPost(state.posts, postId, (post) => ({
        ...withActivity(post, author),
        discussions: [
          ...post.discussions,
          { ...newEntry(author, content), resolved: false, replies: [] },
        ],
      })),
    })),
  updateDiscussion: (postId, discussionId, changes) =>
    set((state) => ({
      posts: mapDiscussion(state.posts, postId, discussionId, (d) => ({ ...d, ...changes })),
    })),
  deleteDiscussion: (postId, discussionId) =>
    set((state) => ({
      posts: mapPost(state.posts, postId, (post) => ({
        ...post,
        discussions: post.discussions.filter((d) => d._id !== discussionId),
      })),
    })),

  // ---------- replies ----------
  addReply: (postId, discussionId, author, content) =>
    set((state) => ({
      posts: mapPost(
        mapDiscussion(state.posts, postId, discussionId, (d) => ({
          ...d,
          replies: [...d.replies, newEntry(author, content)],
        })),
        postId,
        (post) => withActivity(post, author),
      ),
    })),
  updateReply: (postId, discussionId, replyId, content) =>
    set((state) => ({
      posts: mapDiscussion(state.posts, postId, discussionId, (d) => ({
        ...d,
        replies: d.replies.map((r) => (r._id === replyId ? { ...r, content } : r)),
      })),
    })),
  deleteReply: (postId, discussionId, replyId) =>
    set((state) => ({
      posts: mapDiscussion(state.posts, postId, discussionId, (d) => ({
        ...d,
        replies: d.replies.filter((r) => r._id !== replyId),
      })),
    })),

  // ---------- folders ----------
  addFolder: (course, name) =>
    set((state) => ({
      folders: [...state.folders, { _id: crypto.randomUUID(), course, name }],
    })),
  renameFolder: (folderId, name) =>
    set((state) => ({
      folders: state.folders.map((f) => (f._id === folderId ? { ...f, name } : f)),
    })),
  // Swap a folder with its neighbour in the same course (the array order is the display order)
  moveFolder: (folderId, direction) =>
    set((state) => {
      const folder = state.folders.find((f) => f._id === folderId);
      if (!folder) return state;
      const courseIndexes = state.folders
        .map((f, index) => (f.course === folder.course ? index : -1))
        .filter((index) => index !== -1);
      const position = courseIndexes.indexOf(state.folders.indexOf(folder));
      const from = courseIndexes[position];
      const to = courseIndexes[position + direction];
      if (to === undefined) return state;
      const folders = [...state.folders];
      [folders[from], folders[to]] = [folders[to], folders[from]];
      return { folders };
    }),
  // Deleting a folder also removes it from every post and from the active filter
  deleteFolders: (folderIds) =>
    set((state) => ({
      folders: state.folders.filter((f) => !folderIds.includes(f._id)),
      posts: state.posts.map((post) =>
        post.folders.some((id) => folderIds.includes(id))
          ? { ...post, folders: post.folders.filter((id) => !folderIds.includes(id)) }
          : post,
      ),
      selectedFolder: Object.fromEntries(
        Object.entries(state.selectedFolder).map(([course, id]) => [
          course,
          id && folderIds.includes(id) ? null : id,
        ]),
      ),
    })),
  selectFolder: (course, folderId) =>
    set((state) => ({ selectedFolder: { ...state.selectedFolder, [course]: folderId } })),
}));
