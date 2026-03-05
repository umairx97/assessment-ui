import { NextResponse } from "next/server";

type Metric = {
  correct: number;
  total: number;
  percent: number;
  enabled: boolean;
};

type QuizSubparts = {
  id: string;
  lesson: Metric;
  independent: Metric;
  continuous: Metric;
  formative: Metric;
  peerCount: number;
};

const subparts: QuizSubparts[] = [
  {
    id: "practice-quiz",
    lesson: { correct: 22, total: 25, percent: 76, enabled: true },
    independent: { correct: 19, total: 25, percent: 68, enabled: true },
    continuous: { correct: 17, total: 25, percent: 54, enabled: true },
    formative: { correct: 25, total: 25, percent: 28, enabled: true },
    peerCount: 0,
  },
  {
    id: "3n11",
    lesson: { correct: 23, total: 25, percent: 78, enabled: true },
    independent: { correct: 20, total: 25, percent: 78, enabled: true },
    continuous: { correct: 18, total: 25, percent: 50, enabled: true },
    formative: { correct: 20, total: 25, percent: 28, enabled: true },
    peerCount: 6,
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return NextResponse.json({ subparts });
}
