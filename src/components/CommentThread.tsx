"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Comment,
  getCommentsForSection,
  addComment,
  resolveComment,
  notifySlack,
} from "@/lib/comments";

export default function CommentThread({
  sectionId,
  sectionTitle,
}: {
  sectionId: string;
  sectionTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const load = useCallback(() => {
    setComments(getCommentsForSection(sectionId));
  }, [sectionId]);

  useEffect(() => {
    load();
    const saved = localStorage.getItem("mkt-dash-author");
    if (saved) setAuthor(saved);
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;
    localStorage.setItem("mkt-dash-author", author);
    const c = addComment(sectionId, author, text);
    setText("");
    load();
    await notifySlack(c, sectionTitle);
  };

  const unresolved = comments.filter((c) => !c.resolved).length;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md transition-colors ${
          unresolved > 0
            ? "bg-[#1cab5f]/10 text-[#1cab5f]"
            : "bg-[#1f2024]/5 text-[#71747b] hover:bg-[#1f2024]/10"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {unresolved > 0 && <span>{unresolved}</span>}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded-lg border border-[#dedfe3] shadow-lg z-50">
          <div className="flex items-center justify-between p-2.5 border-b border-[#dedfe3]">
            <span className="text-xs font-semibold text-[#0b0c0d]">{sectionTitle}</span>
            <button onClick={() => setOpen(false)} className="text-[#a6a8ad] hover:text-[#56585e]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto p-2.5 space-y-1.5">
            {comments.length === 0 ? (
              <p className="text-[10px] text-[#a6a8ad] text-center py-3">No comments yet</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className={`comment-enter rounded p-2 text-xs ${c.resolved ? "bg-[#f2f3f4] opacity-50" : "bg-[#1cab5f]/5"}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-[#0b0c0d]">{c.author}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-[#a6a8ad]">
                        {new Date(c.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </span>
                      {!c.resolved && (
                        <button onClick={() => { resolveComment(c.id); load(); }} className="text-[#1cab5f] hover:text-[#188149]" title="Resolve">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[#56585e]">{c.text}</p>
                </div>
              ))
            )}
          </div>
          <form onSubmit={submit} className="p-2.5 border-t border-[#dedfe3] space-y-1.5">
            <input type="text" placeholder="Your name" value={author} onChange={(e) => setAuthor(e.target.value)}
              className="w-full text-xs border border-[#dedfe3] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1cab5f]" />
            <div className="flex gap-1.5">
              <input type="text" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value)}
                className="flex-1 text-xs border border-[#dedfe3] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1cab5f]" />
              <button type="submit" disabled={!text.trim() || !author.trim()}
                className="bg-[#1cab5f] text-white text-xs font-medium px-2.5 py-1 rounded hover:bg-[#188149] disabled:opacity-30 transition-colors">
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
