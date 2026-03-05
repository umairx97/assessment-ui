import { NextResponse } from "next/server";

type Metric = {
  correct: number;
  total: number;
  percent: number;
  enabled: boolean;
};

type Assessment = {
  id: string;
  title: string;
  description: string;
  scheduledDate: string | null;
  lastActivity: string;
  lesson: Metric;
  independent: Metric;
  continuous: Metric;
  formative: Metric;
  peerCount: number;
};

const baseDescription =
  "Read, write, discuss, and represent whole numbers up to 100,000. Representations should include numerals, words, pictures, number lines, and manipulatives.";

const assessments: Assessment[] = [
  {
    id: "practice-quiz",
    title: "Practice Quiz",
    description: baseDescription,
    scheduledDate: null,
    lastActivity: "8-26-26",
    lesson: { correct: 0, total: 25, percent: 0, enabled: false },
    independent: { correct: 0, total: 25, percent: 0, enabled: false },
    continuous: { correct: 0, total: 25, percent: 0, enabled: false },
    formative: { correct: 25, total: 25, percent: 28, enabled: true },
    peerCount: 0,
  },
  {
    id: "3n11",
    title: "3.N.1.1 – Number & Operations",
    description: baseDescription,
    scheduledDate: "Tue Sep 9",
    lastActivity: "9-2-26",
    lesson: { correct: 23, total: 25, percent: 78, enabled: true },
    independent: { correct: 20, total: 25, percent: 78, enabled: true },
    continuous: { correct: 18, total: 25, percent: 50, enabled: true },
    formative: { correct: 20, total: 25, percent: 28, enabled: true },
    peerCount: 6,
  },
  {
    id: "3n12",
    title: "3.N.1.2 – Number & Operations",
    description: baseDescription,
    scheduledDate: "Thu Sep 11",
    lastActivity: "9-2-26",
    lesson: { correct: 23, total: 25, percent: 78, enabled: true },
    independent: { correct: 20, total: 25, percent: 78, enabled: true },
    continuous: { correct: 18, total: 25, percent: 50, enabled: true },
    formative: { correct: 12, total: 25, percent: 72, enabled: true },
    peerCount: 2,
  },
  {
    id: "3n13",
    title: "3.N.1.3 – Number Patterns",
    description: baseDescription,
    scheduledDate: "Mon Sep 15",
    lastActivity: "9-5-26",
    lesson: { correct: 19, total: 25, percent: 65, enabled: true },
    independent: { correct: 17, total: 25, percent: 60, enabled: true },
    continuous: { correct: 13, total: 25, percent: 42, enabled: true },
    formative: { correct: 15, total: 25, percent: 55, enabled: true },
    peerCount: 4,
  },
  {
    id: "3n14",
    title: "3.N.1.4 – Place Value",
    description: baseDescription,
    scheduledDate: "Wed Sep 17",
    lastActivity: "9-6-26",
    lesson: { correct: 21, total: 25, percent: 73, enabled: true },
    independent: { correct: 20, total: 25, percent: 71, enabled: true },
    continuous: { correct: 16, total: 25, percent: 52, enabled: true },
    formative: { correct: 18, total: 25, percent: 64, enabled: true },
    peerCount: 5,
  },
  {
    id: "3n15",
    title: "3.N.1.5 – Compare Numbers",
    description: baseDescription,
    scheduledDate: "Fri Sep 19",
    lastActivity: "9-8-26",
    lesson: { correct: 24, total: 25, percent: 90, enabled: true },
    independent: { correct: 22, total: 25, percent: 82, enabled: true },
    continuous: { correct: 17, total: 25, percent: 56, enabled: true },
    formative: { correct: 16, total: 25, percent: 58, enabled: true },
    peerCount: 7,
  },
  {
    id: "3n16",
    title: "3.N.1.6 – Rounding",
    description: baseDescription,
    scheduledDate: "Tue Sep 23",
    lastActivity: "9-11-26",
    lesson: { correct: 22, total: 25, percent: 80, enabled: true },
    independent: { correct: 19, total: 25, percent: 68, enabled: true },
    continuous: { correct: 15, total: 25, percent: 49, enabled: true },
    formative: { correct: 19, total: 25, percent: 70, enabled: true },
    peerCount: 3,
  },
  {
    id: "3n17",
    title: "3.N.1.7 – Word Form",
    description: baseDescription,
    scheduledDate: "Thu Sep 25",
    lastActivity: "9-13-26",
    lesson: { correct: 20, total: 25, percent: 74, enabled: true },
    independent: { correct: 18, total: 25, percent: 63, enabled: true },
    continuous: { correct: 14, total: 25, percent: 46, enabled: true },
    formative: { correct: 17, total: 25, percent: 63, enabled: true },
    peerCount: 1,
  },
  {
    id: "3n18",
    title: "3.N.1.8 – Expanded Form",
    description: baseDescription,
    scheduledDate: "Mon Sep 29",
    lastActivity: "9-16-26",
    lesson: { correct: 18, total: 25, percent: 66, enabled: true },
    independent: { correct: 16, total: 25, percent: 57, enabled: true },
    continuous: { correct: 12, total: 25, percent: 40, enabled: true },
    formative: { correct: 14, total: 25, percent: 50, enabled: true },
    peerCount: 2,
  },
  {
    id: "3n19",
    title: "3.N.1.9 – Number Models",
    description: baseDescription,
    scheduledDate: "Wed Oct 1",
    lastActivity: "9-18-26",
    lesson: { correct: 23, total: 25, percent: 86, enabled: true },
    independent: { correct: 21, total: 25, percent: 77, enabled: true },
    continuous: { correct: 16, total: 25, percent: 52, enabled: true },
    formative: { correct: 18, total: 25, percent: 66, enabled: true },
    peerCount: 6,
  },
  {
    id: "3n110",
    title: "3.N.1.10 – Estimation",
    description: baseDescription,
    scheduledDate: "Fri Oct 3",
    lastActivity: "9-20-26",
    lesson: { correct: 17, total: 25, percent: 62, enabled: true },
    independent: { correct: 14, total: 25, percent: 50, enabled: true },
    continuous: { correct: 11, total: 25, percent: 35, enabled: true },
    formative: { correct: 13, total: 25, percent: 47, enabled: true },
    peerCount: 3,
  },
  {
    id: "3n111",
    title: "3.N.1.11 – Multi-Step Problems",
    description: baseDescription,
    scheduledDate: "Tue Oct 7",
    lastActivity: "9-23-26",
    lesson: { correct: 21, total: 25, percent: 78, enabled: true },
    independent: { correct: 19, total: 25, percent: 69, enabled: true },
    continuous: { correct: 14, total: 25, percent: 45, enabled: true },
    formative: { correct: 17, total: 25, percent: 61, enabled: true },
    peerCount: 8,
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json({ assessments });
}
