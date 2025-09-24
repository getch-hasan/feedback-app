import { NextResponse } from "next/server";

let feedbacks: { name: string; email: string; feedback: string }[] = [];

export async function GET() {
  return NextResponse.json(feedbacks);
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.name || !data.email || !data.feedback) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  feedbacks.push(data);
  return NextResponse.json({ message: "Feedback submitted", data });
}

