"use client";

import { useState } from "react";
import { currentUpdate } from "@/data/weekly-update";
import CommentThread from "@/components/CommentThread";

type Tab = "overview" | "partnerships" | "events";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const u = currentUpdate;
  const weekLabel = new Date(u.weekOf + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tabs: { id: Tab; label: string; href?: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "partnerships", label: "Partnerships" },
    { id: "events", label: "Events" },
  ];

  return (
    <div className="min-h-screen bg-[#f2f3f4]">
      {/* ── Header ── */}
      <header className="bg-[#0b0c0d] text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="text-[#e3af4a] font-bold text-lg tracking-tight">PRAY.COM</span>
              <span className="text-[#56585e] text-sm">|</span>
              <span className="text-sm text-[#a6a8ad]">Marketing Performance {u.quarter}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#71747b]">Week of {weekLabel}</span>
              <span className="text-[9px] font-medium text-[#e3af4a] bg-[#e3af4a]/10 px-2 py-0.5 rounded-full border border-[#e3af4a]/20">
                CONFIDENTIAL
              </span>
            </div>
          </div>

          {/* Tab bar */}
          <nav className="flex gap-0.5 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#1cab5f] text-white"
                    : "border-transparent text-[#71747b] hover:text-[#a6a8ad]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Objective Banner */}
            <div className="bg-[#0b0c0d] rounded-xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Marketing Performance {u.quarter}</h1>
                  <p className="text-sm text-[#a6a8ad] mt-1">
                    <span className="font-medium text-white">Objective:</span> {u.objective}
                  </p>
                </div>
                <CommentThread sectionId="overview-objective" sectionTitle="Objective" />
              </div>
              {/* Key Result Areas */}
              <div className="flex gap-2 mt-4">
                {u.keyResultAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs font-medium bg-[#1f2024] text-[#a6a8ad] px-3 py-1 rounded-full border border-[#3a3c40]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Top-line Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {u.topMetrics.map((m, i) => (
                <div key={i} className="bg-white rounded-lg border border-[#dedfe3] p-4">
                  <div className="text-xs text-[#71747b] font-medium">{m.label}</div>
                  <div className="text-2xl font-bold text-[#0b0c0d] mt-0.5">{m.value}</div>
                  {m.detail && <div className="text-[11px] text-[#a6a8ad] mt-0.5">{m.detail}</div>}
                </div>
              ))}
            </div>

            {/* Results + Initiatives side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Results */}
              <div className="bg-white rounded-xl border border-[#dedfe3] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#0b0c0d]">Results</h2>
                  <CommentThread sectionId="results" sectionTitle="Results" />
                </div>
                <div className="space-y-4">
                  {u.results.map((r, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-[#0b0c0d] text-sm flex items-center gap-2">
                        <span className="text-[#1cab5f]">{i + 1}.</span>
                        <span className="underline decoration-[#1cab5f]/30 underline-offset-2">
                          {r.category}
                        </span>
                      </h3>
                      <ol className="mt-1.5 ml-6 space-y-1" type="a">
                        {r.items.map((item, j) => (
                          <li key={j} className="text-sm text-[#56585e] leading-relaxed">
                            <span className="text-[#a6a8ad] mr-1">{String.fromCharCode(97 + j)}.</span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              {/* Initiatives */}
              <div className="bg-white rounded-xl border border-[#dedfe3] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#0b0c0d]">Initiatives</h2>
                  <CommentThread sectionId="initiatives" sectionTitle="Initiatives" />
                </div>
                <ol className="space-y-3">
                  {u.initiatives.map((init, i) => (
                    <li key={i} className="text-sm text-[#56585e] leading-relaxed">
                      <span className="font-semibold text-[#0b0c0d] mr-1">{i + 1}.</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: init.text
                            .replace(
                              /\b(NRB|Agencies|Partnerships|AI Conversations):/g,
                              '<strong class="text-[#0b0c0d]">$1:</strong>'
                            )
                            .replace(
                              /Sent: ([\d,]+)/g,
                              'Sent: <em class="text-[#1cab5f] not-italic font-medium">$1</em>'
                            )
                            .replace(
                              /Open Rate: ([\d.]+%)/g,
                              'Open Rate: <em class="text-[#1cab5f] not-italic font-medium">$1</em>'
                            )
                            .replace(
                              /Click-Through Rate: ([\d.]+%)/g,
                              'Click-Through Rate: <em class="text-[#1cab5f] not-italic font-medium">$1</em>'
                            ),
                        }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* ── PARTNERSHIPS TAB ── */}
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

        {/* ── EVENTS TAB ── */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0b0c0d]">2026 Events Calendar</h2>
              <div className="flex items-center gap-2">
                <a
                  href="https://mktsaasevents.vercel.app/events/2026-events-calendar.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#2261d3] hover:underline flex items-center gap-1"
                >
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

      {/* Footer */}
      <footer className="border-t border-[#dedfe3] bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-[10px] text-[#a6a8ad]">
          <span>@PRAY.COM &middot; Highly confidential &middot; Not for distribution</span>
          <span>Updated weekly &middot; Manual data entry</span>
        </div>
      </footer>
    </div>
  );
}
