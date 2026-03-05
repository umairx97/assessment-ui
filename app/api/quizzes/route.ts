import { NextResponse } from "next/server";

type Quiz = {
  id: string;
  title: string;
  description: string;
  scheduledDate: string | null;
  lastActivity: string;
};

const baseDescription =
  "Read, write, discuss, and represent whole numbers up to 100,000. Representations should include numerals, words, pictures, number lines, and manipulatives.";

const quizzes: Quiz[] = [
  {
    id: "practice-quiz",
    title: "Practice Quiz",
    description: baseDescription,
    scheduledDate: null,
    lastActivity: "8-26-26",
  },
  {
    id: "3n11",
    title: "3.N.1.1 – Number & Operations",
    description: baseDescription,
    scheduledDate: "Tue Sep 9",
    lastActivity: "9-2-26",
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({ quizzes });
}
