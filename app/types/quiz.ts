export type Metric = {
  correct: number;
  total: number;
  percent: number;
  enabled: boolean;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  scheduledDate: string | null;
  lastActivity: string;
};

export type QuizSubparts = {
  id: string;
  lesson: Metric;
  independent: Metric;
  continuous: Metric;
  formative: Metric;
  peerCount: number;
};

export type QuizzesApiResponse = {
  quizzes: Quiz[];
};

export type SubpartsApiResponse = {
  subparts: QuizSubparts[];
};
