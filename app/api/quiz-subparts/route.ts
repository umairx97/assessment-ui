import { NextResponse } from "next/server";
import { assessments, type Metric } from "../assessments/route";

type QuizSubparts = {
  id: string;
  lesson: Metric;
  independent: Metric;
  continuous: Metric;
  formative: Metric;
  peerCount: number;
};

const subparts: QuizSubparts[] = assessments.map((assessment) => ({
  id: assessment.id,
  lesson: assessment.lesson,
  independent: assessment.independent,
  continuous: assessment.continuous,
  formative: assessment.formative,
  peerCount: assessment.peerCount,
}));

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return NextResponse.json({ subparts });
}
