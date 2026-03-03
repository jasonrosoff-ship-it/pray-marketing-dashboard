"use client";

import { useState } from "react";
import { currentUpdate } from "@/data/weekly-update";
import CommentThread from "@/components/CommentThread";

type Tab = "overview" | "partnerships" | "events";

function statusStyle(status: string) {
  switch (status) {
    case "on-track":
      return { bg: "bg-[#1cab5f]/10", text: "text-[#1cab5f]", dot: "bg-[#1cab5f]", label: "On Track" };
    case "at-risk":
      return { bg: "bg-[#e3af4a]/10", text: "text-[#e3af4a]", dot: "bg-[#e3af4a]", label: "At Risk" };
    case "behind":
      return { bg: "bg-[#e71d20]/10", text: "text-[#e71d20]", dot: "bg-[#e71d20]", label: "Behind" };
    case "new":
      return { bg: "bg-[#2261d3]/10", text: "text-[#2261d3]", dot: "bg-[#2261d3]", label: "New" };
    default:
      return { bg: "bg-[#56585e]/10", text: "text-[#56585e]", dot: "bg-[#56585e]", label: status };
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const u = currentUpdate;
  const weekLabel = new Date(u.weekOf + "T00:00:00").toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "partnerships", label: "Partnerships" },
    { id: "events", label: "Events" },
  ];

  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      {/* ── Header ── */}
      <header className="bg-[#0b0c0d] text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="text-[#e3af4a] font-bold text-lg tracking-tight">PRAY.COM</span>
              <span className="text-[#3a3c40]">|</span>
              <span className="text-sm text-[#a6a8ad]">Marketing Update</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#71747b]">Week of {weekLabel}</span>
              <span className="text-[9px] font-medium text-[#e3af4a] bg-[#e3af4a]/10 px-2 py-0.5 rounded-full border border-[#e3af4a]/20">
                CONFIDENTIAL
              </span>
            </div>
          </div>
          <nav className="flex gap-0.5 -mb-px">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#1cab5f] text-white"
                    : "border-transparent text-[#71747b] hover:text-[#a6a8ad]"
                }`}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* ════════════════════════════════════════════════════════
            OVERVIEW TAB
        ════════════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* ── 1. THE THEME ── */}
            <section className="bg-[#0b0c0d] rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#e3af4a] font-semibold uppercase tracking-wider mb-1">
                    Marketing Performance {u.quarter}
                  </p>
                  <h1 className="text-2xl font-bold">{u.objective}</h1>
                  <p className="text-sm text-[#a6a8ad] mt-2 max-w-2xl leading-relaxed">
                    {u.objectiveTagline}
                  </p>
                </div>
                <CommentThread sectionId="objective" sectionTitle="Objective" />
              </div>

              {/* Top-line metrics bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                {u.topMetrics.map((m, i) => (
                  <div key={i} className="bg-[#18191c] rounded-lg border border-[#3a3c40] p-3">
                    <div className="text-[10px] text-[#71747b] font-medium uppercase tracking-wider">{m.label}</div>
                    <div className="text-xl font-bold text-white mt-0.5">{m.value}</div>
                    {m.detail && <div className="text-[10px] text-[#56585e] mt-0.5">{m.detail}</div>}
                  </div>
                ))}
              </div>
            </section>

            {/* ── 2. OKR SCOREBOARD ── */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-[#71747b] uppercase tracking-wider">Key Results</h2>
                <CommentThread sectionId="okrs" sectionTitle="Key Results" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {u.okrs.map((okr, i) => {
                  const s = statusStyle(okr.status);
                  return (
                    <div key={i} className="bg-white rounded-lg border border-[#dedfe3] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#0b0c0d] text-sm">{okr.area}</span>
                        <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </div>
                      {okr.keyNumber && (
                        <div className="text-lg font-bold text-[#0b0c0d] mb-1">{okr.keyNumber}</div>
                      )}
                      <p className="text-xs text-[#71747b] leading-relaxed">{okr.headline}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── 3. INITIATIVES & RESULTS TABLE ── */}
            <section className="bg-white rounded-xl border border-[#dedfe3] overflow-hidden">
              <div className="flex items-center justify-between p-5 pb-0">
                <h2 className="text-lg font-bold text-[#0b0c0d]">Initiatives &amp; Results</h2>
                <CommentThread sectionId="results" sectionTitle="Initiatives & Results" />
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[160px_1fr_1fr] px-5 pt-4 pb-2 border-b border-[#dedfe3]">
                <div className="text-[10px] font-semibold text-[#71747b] uppercase tracking-wider">Area</div>
                <div className="text-[10px] font-semibold text-[#71747b] uppercase tracking-wider">Initiatives</div>
                <div className="text-[10px] font-semibold text-[#71747b] uppercase tracking-wider">Results</div>
              </div>

              {/* Table rows — one per area */}
              {u.results.map((r, i) => {
                const okr = u.okrs.find((o) => o.area === r.category);
                const s = okr ? statusStyle(okr.status) : statusStyle("");
                const areaInitiatives = u.initiatives.filter((init) =>
                  init.text.startsWith(r.category + ":") ||
                  (r.category === "Chat" && init.text.startsWith("AI Conversations:"))
                );

                return (
                  <div key={i} className={`grid grid-cols-[160px_1fr_1fr] px-5 py-4 ${i < u.results.length - 1 ? "border-b border-[#f2f3f4]" : ""}`}>
                    {/* Area name + status + link */}
                    <div className="pr-4">
                      {okr?.link ? (
                        <a href={okr.link} target="_blank" rel="noopener noreferrer"
                          className="font-semibold text-sm text-[#2261d3] hover:underline flex items-center gap-1.5">
                          {r.category}
                          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      ) : (
                        <span className="font-semibold text-sm text-[#0b0c0d]">{r.category}</span>
                      )}
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full mt-1.5 ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                      {okr?.keyNumber && (
                        <div className="text-lg font-bold text-[#0b0c0d] mt-1">{okr.keyNumber}</div>
                      )}
                    </div>

                    {/* Initiatives column */}
                    <div className="pr-4 space-y-1.5">
                      {areaInitiatives.length > 0 ? (
                        areaInitiatives.map((init, j) => {
                          const stripped = init.text.replace(/^[^:]+:\s*/, "");
                          return (
                            <p key={j} className="text-sm text-[#56585e] leading-relaxed">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: stripped
                                    .replace(
                                      /(Sent: [\d,]+|Open Rate: [\d.]+%|Click-Through Rate: [\d.]+%)/g,
                                      '<span class="text-[#1cab5f] font-medium">$1</span>'
                                    ),
                                }}
                              />
                            </p>
                          );
                        })
                      ) : (
                        <p className="text-sm text-[#a6a8ad] italic">—</p>
                      )}
                    </div>

                    {/* Results column */}
                    <div className="space-y-1.5">
                      {r.items.map((item, j) => (
                        <p key={j} className="text-sm text-[#56585e] leading-relaxed">{item}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            PARTNERSHIPS TAB
        ════════════════════════════════════════════════════════ */}
        {activeTab === "partnerships" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0b0c0d]">SaaS Partnership Pipeline</h2>
              <CommentThread sectionId="partnerships" sectionTitle="Partnerships" />
            </div>
            <div className="bg-white rounded-xl border border-[#dedfe3] overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
              <iframe
                src="http://localhost:8080/"
                className="w-full h-full border-0"
                title="SaaS Partnership Pipeline Dashboard"
              />
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            EVENTS TAB
        ════════════════════════════════════════════════════════ */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0b0c0d]">2026 Events Calendar</h2>
              <div className="flex items-center gap-2">
                <a href="https://mktsaasevents.vercel.app/events/2026-events-calendar.html"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#2261d3] hover:underline flex items-center gap-1">
                  Open full page
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <CommentThread sectionId="events" sectionTitle="Events Calendar" />
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#dedfe3] overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
              <iframe
                src="https://mktsaasevents.vercel.app/events/2026-events-calendar.html"
                className="w-full h-full border-0"
                title="2026 Events Calendar"
              />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#dedfe3] bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-[10px] text-[#a6a8ad]">
          <span>@PRAY.COM &middot; Highly confidential &middot; Not for distribution</span>
          <span>Updated weekly</span>
        </div>
      </footer>
    </div>
  );
}
