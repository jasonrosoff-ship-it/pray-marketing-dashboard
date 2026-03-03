// ============================================================
// WEEKLY MARKETING UPDATE DATA
// Update this file each week before Tuesday meetings.
// ============================================================

export interface WeeklyUpdate {
  weekOf: string;
  quarter: string;
  objective: string;

  keyResultAreas: string[];

  results: {
    category: string;
    items: string[];
  }[];

  initiatives: {
    text: string;
    highlight?: boolean; // for strikethrough or emphasis
  }[];

  // Top-line numbers shown as cards
  topMetrics: {
    label: string;
    value: string;
    detail?: string;
  }[];
}

// ============================================================
// CURRENT WEEK — edit this each week
// ============================================================
export const currentUpdate: WeeklyUpdate = {
  weekOf: "2026-02-24",
  quarter: "Q1",
  objective: "Drive Revenue and Reduce Expenses",

  keyResultAreas: ["NRB", "Agencies", "Partnerships", "Chat"],

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
    {
      text: "NRB: Marketing Meeting Outreach — Sent: 85,520 | Open Rate: 6.4% | Click-Through Rate: 7.31% | 6 meetings with new leads",
    },
    { text: "NRB: Expense audit (con't) — Booth Sponsorship $20k" },
    {
      text: "NRB: Daily Product Marketing — Sent: 793 | Open Rate: 99% | Click-Through Rate: 13%",
    },
    { text: "Agencies: Push to meet all of them at NRB (Met with 3)" },
    { text: "Partnerships: PushPay outreach (IN PROGRESS)" },
    { text: "Partnerships: Tebow Drafted referral email." },
    {
      text: "AI Conversations: Hope for the Heart marketing launch | Current Client outreach (Initial Email, COMPLETE) | GTM Planning",
    },
  ],

  topMetrics: [
    {
      label: "Meetings Booked",
      value: "185",
      detail: "118 sales | 20 ads | 38 LS",
    },
    {
      label: "Pipeline",
      value: "$3.31M",
      detail: "Potential from NRB",
    },
    {
      label: "Deals Closed",
      value: "$348K",
      detail: "At NRB Nashville",
    },
    {
      label: "Leads Captured",
      value: "337",
      detail: "162 companies reached",
    },
  ],
};

// ============================================================
// ARCHIVE — previous weeks (push old currentUpdate here)
// ============================================================
export const archivedUpdates: WeeklyUpdate[] = [];
