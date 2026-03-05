import axios from "axios";
import type {
  Quiz,
  QuizSubparts,
  QuizzesApiResponse,
  SubpartsApiResponse,
} from "../types/quiz";

export async function fetchQuizzes(): Promise<Quiz[]> {
  const { data } = await axios.get<QuizzesApiResponse>("/api/quizzes");
  return data.quizzes;
}

export async function fetchQuizSubparts(): Promise<QuizSubparts[]> {
  const { data } = await axios.get<SubpartsApiResponse>("/api/quiz-subparts");
  return data.subparts;
}
