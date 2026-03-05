import { NextResponse } from "next/server";
import { assessments } from "../assessments/route";

type Quiz = {
  id: string;
  title: string;
  description: string;
  scheduledDate: string | null;
  lastActivity: string;
};

const quizzes: Quiz[] = assessments.map((assessment) => ({
  id: assessment.id,
  title: assessment.title,
  description: assessment.description,
  scheduledDate: assessment.scheduledDate,
  lastActivity: assessment.lastActivity,
}));

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({ quizzes });
}
