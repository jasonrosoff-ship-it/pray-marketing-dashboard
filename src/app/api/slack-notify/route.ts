import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { comment, sectionTitle } = await request.json();
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: "No webhook configured" });
  }

  const payload = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New Comment — Marketing Dashboard" },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Section:*\n${sectionTitle}` },
          { type: "mrkdwn", text: `*Author:*\n${comment.author}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `> ${comment.text}` },
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: new Date(comment.timestamp).toLocaleString() },
        ],
      },
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
