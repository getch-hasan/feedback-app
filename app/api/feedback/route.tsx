import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
 
// GET all feedbacks
export async function GET() {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(feedbacks);
}

// POST new feedback
export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.feedback) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const feedback = await prisma.feedback.create({
    data: {
      name: data.name,
      email: data.email,
      feedback: data.feedback,
    },
  });

  return NextResponse.json({ message: "Feedback submitted", feedback });
}
