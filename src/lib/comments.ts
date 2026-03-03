export interface Comment {
  id: string;
  sectionId: string;
  author: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

const STORAGE_KEY = "mkt-dashboard-comments";

export function getComments(): Comment[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getCommentsForSection(sectionId: string): Comment[] {
  return getComments().filter((c) => c.sectionId === sectionId);
}

export function addComment(sectionId: string, author: string, text: string): Comment {
  const comments = getComments();
  const c: Comment = {
    id: crypto.randomUUID(),
    sectionId,
    author,
    text,
    timestamp: new Date().toISOString(),
    resolved: false,
  };
  comments.push(c);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  return c;
}

export function resolveComment(id: string): void {
  const comments = getComments();
  const i = comments.findIndex((c) => c.id === id);
  if (i >= 0) {
    comments[i].resolved = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }
}

export async function notifySlack(comment: Comment, sectionTitle: string) {
  try {
    await fetch("/api/slack-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, sectionTitle }),
    });
  } catch {
    // Slack webhook may not be configured — that's fine
  }
}
