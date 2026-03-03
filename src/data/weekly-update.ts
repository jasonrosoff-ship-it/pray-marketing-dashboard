// ============================================================
// WEEKLY MARKETING UPDATE DATA
// Update this file each week before Tuesday meetings.
// ============================================================

export interface WeeklyUpdate {
  weekOf: string;
  quarter: string;

  // The big theme / strategic frame
  objective: string;
  objectiveTagline: string; // short reinforcement

  // Top-line headline numbers
  topMetrics: {
    label: string;
    value: string;
    detail?: string;
  }[];

  // OKR scoreboard — how each area is tracking
  okrs: {
    area: string;
    status: "on-track" | "at-risk" | "behind" | "new";
    headline: string; // one-line summary
    keyNumber?: string; // the big number for this area
    link?: string; // URL to area's detailed dashboard
  }[];

  // Detailed results per area
  results: {
    category: string;
    items: string[];
  }[];

  // Initiatives in motion, grouped by area to match results
  initiatives: {
    text: string;
  }[];
}

// ============================================================
// CURRENT WEEK — edit this each week
// ============================================================
export const currentUpdate: WeeklyUpdate = {
  weekOf: "2026-02-24",
  quarter: "Q1",

  objective: "Drive Revenue and Reduce Expenses",
  objectiveTagline:
    "Marketing needs to drive leads and help Enterprise get/keep deals to help the company achieve profitability this quarter.",

  topMetrics: [
    { label: "2026 Pipeline", value: "$23.6M", detail: "289 active deals" },
    { label: "Revenue Closed", value: "$920K", detail: "30 deals won YTD" },
    { label: "Avg Deal Size", value: "$81K", detail: "Across pipeline" },
    { label: "Win Rate", value: "10.4%", detail: "30 of 289 deals" },
  ],

  okrs: [
    {
      area: "NRB",
      status: "on-track",
      headline: "185 meetings, $3.31M pipeline, $348K closed",
      keyNumber: "$3.31M",
      link: "https://mktsaasevents.vercel.app/events/2026-events-calendar.html", // TODO: replace with HubSpot NRB dashboard
    },
    {
      area: "Agencies",
      status: "on-track",
      headline: "8 agencies connected, 78 clients, $3.93M potential pipeline",
      keyNumber: "$3.93M",
      link: "https://mktsaasevents.vercel.app/events/2026-events-calendar.html", // TODO: replace with HubSpot Agencies dashboard
    },
    {
      area: "Partnerships",
      status: "at-risk",
      headline: "Pushpay 9/15 intros complete, Resi & Tebow in progress",
      keyNumber: "9/15",
      link: "https://mktsaasevents.vercel.app/events/2026-events-calendar.html", // TODO: replace with Partnerships dashboard
    },
    {
      area: "Chat",
      status: "new",
      headline: "1 client live (Hope For the Heart), GTM in progress",
      keyNumber: "1 Live",
      link: "https://mktsaasevents.vercel.app/events/2026-events-calendar.html", // TODO: replace with Chat dashboard
    },
  ],

  results: [
    {
      category: "NRB",
      items: [
        "185 Meetings Booked, involving $3.31M in potential pipeline. 118 sales | 20 ads & Others | 38 LS",
        "337 Leads Captured and 162 Companies Reached",
        "$348K Deals Closed at NRB",
      ],
    },
    {
      category: "Agencies",
      items: [
        "Connected with 8 agencies | 78 Clients | $3.93M Potential Pipeline",
        "Agency Retreat Cancelled ($80K Savings)",
        "Meetings booked at NRB (3)",
      ],
    },
    {
      category: "Partnerships",
      items: [
        "Pushpay: 320 Clients — Initial Outreach to 15 clients by Head of CSM (9 of 15 intros complete | 2 Discovery Meetings Booked)",
        "Resi: 11 Target clients | Assets Shared | Planned meeting with MG this week",
        "Tebow: Email Draft in Progress | Pulling list of prospect for Tebow outreach this week",
      ],
    },
    {
      category: "Chat",
      items: [
        "Activation: 1 Client Live (Hope For the Heart) | Email Outreach to Clients",
        "GTM: IN PROGRESS",
      ],
    },
  ],

  initiatives: [
    { text: "NRB: Marketing Meeting Outreach — Sent: 85,520 | Open Rate: 6.4% | Click-Through Rate: 7.31% | 6 meetings with new leads" },
    { text: "NRB: Expense audit (con't) — Booth Sponsorship $20k" },
    { text: "NRB: Daily Product Marketing — Sent: 793 | Open Rate: 99% | Click-Through Rate: 13%" },
    { text: "Agencies: Push to meet all of them at NRB (Met with 3)" },
    { text: "Partnerships: PushPay outreach (IN PROGRESS)" },
    { text: "Partnerships: Tebow Drafted referral email." },
    { text: "AI Conversations: Hope for the Heart marketing launch | Current Client outreach (Initial Email, COMPLETE) | GTM Planning" },
  ],
};

// ============================================================
// ARCHIVE — previous weeks (push old currentUpdate here)
// ============================================================
export const archivedUpdates: WeeklyUpdate[] = [];
