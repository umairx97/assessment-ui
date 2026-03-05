"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { colors } from "./colors";

type Metric = {
  correct: number;
  total: number;
  percent: number;
  enabled: boolean;
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  scheduledDate: string | null;
  lastActivity: string;
};

type QuizSubparts = {
  id: string;
  lesson: Metric;
  independent: Metric;
  continuous: Metric;
  formative: Metric;
  peerCount: number;
};

type QuizzesApiResponse = {
  quizzes: Quiz[];
};

type SubpartsApiResponse = {
  subparts: QuizSubparts[];
};

const metricGroups = [
  { key: "lesson", label: "Lesson\nGuided Practice" },
  { key: "independent", label: "Independent\nPractice" },
  { key: "continuous", label: "Continuous\nPractice" },
  { key: "formative", label: "Formative\nQuiz" },
] as const;

async function fetchQuizzes(): Promise<Quiz[]> {
  const { data } = await axios.get<QuizzesApiResponse>("/api/quizzes");
  return data.quizzes;
}

async function fetchQuizSubparts(): Promise<QuizSubparts[]> {
  const { data } = await axios.get<SubpartsApiResponse>("/api/quiz-subparts");
  return data.subparts;
}

function parseScheduledDate(value: string | null) {
  if (!value) {
    return Number.NEGATIVE_INFINITY;
  }

  const parsed = Date.parse(`${value}, 2026`);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function MetricBlock({ label, metric }: { label: string; metric: Metric }) {
  if (!metric.enabled) {
    return (
      <div
        className="border-card-divider min-w-0 border-r px-3 py-2 last:border-r-0 max-lg:border-r-0"
        aria-hidden
      >
        <div className="grid min-h-17 grid-cols-12 items-center gap-x-2">
          <div className="bg-card-placeholder col-span-4 h-2.5 w-3/4 rounded-full" />
          <div className="bg-card-placeholder col-span-2 h-5 w-9 rounded-full" />
          <div className="col-span-4 space-y-1">
            <div className="bg-card-placeholder h-2.5 rounded-full" />
            <div className="bg-card-placeholder h-2 w-2/3 rounded-full" />
          </div>
          <div className="col-span-2 space-y-1">
            <div className="bg-card-placeholder h-2.5 rounded-full" />
            <div className="bg-card-placeholder h-2 w-1/2 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-card-divider min-w-0 border-r px-3 py-2 last:border-r-0 max-lg:border-r-0">
      <div className="grid min-h-17 grid-cols-12 items-center gap-x-2">
        <div className="text-card-muted col-span-4 flex flex-col text-[12px] text-center leading-[1.05]">
          {label.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <button
          className="bg-toggle-on col-span-2 inline-flex h-5 w-9 shrink-0 items-center justify-end rounded-full border-0 p-0.5"
          type="button"
          aria-label={`${label} enabled`}
        >
          <span className="h-4 w-4 rounded-full bg-white" />
        </button>

        <div className="col-span-4 min-w-0">
          <div
            className="bg-card-track h-3 min-w-0 overflow-hidden rounded-full"
            role="progressbar"
            aria-label={`${label} completion`}
            aria-valuemin={0}
            aria-valuemax={metric.total}
            aria-valuenow={metric.correct}
          >
            <span
              className="block h-full rounded-full transition-all duration-700 ease-out motion-reduce:transition-none"
              style={{
                width: `${Math.max(0, Math.min(100, metric.percent))}%`,
                backgroundColor: colors.primary.blue,
              }}
            />
          </div>

          <div className="text-body text-[12px] text-card-muted mt-1 text-center leading-none">{`${metric.correct} / ${metric.total}`}</div>
        </div>

        <div className="col-span-2 min-w-0">
          <div
            className="bg-card-track h-3 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-label={`${label} mastery`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={metric.percent}
          >
            <span
              className="block h-full rounded-full transition-all duration-700 ease-out motion-reduce:transition-none"
              style={{
                width: `${Math.max(0, Math.min(100, metric.percent))}%`,
                backgroundColor: colors.primary.purple,
              }}
            />
          </div>

          <div className="text-body text-[12px] text-card-muted mt-1 text-center leading-none">{`${metric.percent}%`}</div>
        </div>
      </div>
    </div>
  );
}

function SubpartsSkeleton() {
  return (
    <div
      className="border-card-divider grid grid-cols-4 border-t max-lg:grid-cols-1"
      aria-hidden
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`subpart-skeleton-${index}`}
          className="border-card-divider min-w-0 border-r px-3 py-2 last:border-r-0 max-lg:border-r-0"
        >
          <div className="grid min-h-17 grid-cols-12 items-center gap-x-2">
            <div className="bg-card-skeleton col-span-4 h-2.5 w-3/4 animate-pulse rounded-full motion-reduce:animate-none" />
            <div className="bg-card-skeleton col-span-2 h-5 w-9 animate-pulse rounded-full motion-reduce:animate-none" />
            <div className="col-span-4 space-y-1">
              <div className="bg-card-skeleton h-2.5 w-full animate-pulse rounded-full motion-reduce:animate-none" />
              <div className="bg-card-skeleton h-2 w-2/3 animate-pulse rounded-full motion-reduce:animate-none" />
            </div>
            <div className="col-span-2 space-y-1">
              <div className="bg-card-skeleton h-2.5 w-full animate-pulse rounded-full motion-reduce:animate-none" />
              <div className="bg-card-skeleton h-2 w-1/2 animate-pulse rounded-full motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AssessmentCard({
  quiz,
  subparts,
  isSubpartsLoading,
}: {
  quiz: Quiz;
  subparts?: QuizSubparts;
  isSubpartsLoading: boolean;
}) {
  const defaultMetric: Metric = {
    correct: 0,
    total: 25,
    percent: 0,
    enabled: false,
  };

  const metricValues = {
    lesson: subparts?.lesson ?? defaultMetric,
    independent: subparts?.independent ?? defaultMetric,
    continuous: subparts?.continuous ?? defaultMetric,
    formative: subparts?.formative ?? defaultMetric,
  };

  return (
    <article className="border-card-border rounded-xl border px-3.5 py-2.5 bg-card-background">
      <div className="grid grid-cols-[minmax(20rem,1.5fr)_auto_auto_auto] items-center gap-2.5 max-lg:grid-cols-1">
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/copy.svg"
              alt="Copy icon"
              width={20}
              height={20}
            />
            <h2 className="text-title text-base leading-[1.15] font-bold">
              {quiz.title}
            </h2>
            {quiz.id === "3n12" && (
              <Image
                src="/icons/muscles.svg"
                alt="Strength indicator"
                width={16}
                height={16}
              />
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={18}
                height={18}
              />
              <div className="text-body text-card-muted leading-[1.1]">
                {quiz.scheduledDate ?? "Not Scheduled"}
              </div>
            </div>

            <div className="text-body text-card-muted text-center leading-[1.1]">
              <div>Last Activity</div>
              <div>{quiz.lastActivity}</div>
            </div>
          </div>
        </div>

        <button
          className="text-body bg-cta-blue h-9 min-w-24 cursor-pointer rounded-full border-0 px-4 text-white"
          type="button"
        >
          Monitor
        </button>
      </div>

      <p className="text-body text-card-muted mt-2 mb-2.5 ml-7 leading-[1.35]">
        {quiz.description}
      </p>

      {isSubpartsLoading && !subparts ? (
        <SubpartsSkeleton />
      ) : subparts ? (
        <div className="border-card-divider grid grid-cols-4 max-lg:grid-cols-1">
          {metricGroups.map((group) => (
            <MetricBlock
              key={group.key}
              label={group.label}
              metric={metricValues[group.key]}
            />
          ))}

          {/* {(subparts?.peerCount ?? 0) > 0 && (
            <div
              className="text-body text-card-muted border-card-divider inline-flex items-center justify-end gap-1 border-r p-1.5 last:border-r-0 max-lg:justify-start max-lg:border-r-0"
              aria-label="Peer interactions"
            >
              <Image
                src="/icons/person.svg"
                alt="People"
                width={16}
                height={16}
              />
              <Image
                src="/icons/reload.svg"
                alt="Refresh"
                width={16}
                height={16}
              />
              <span>{subparts?.peerCount}</span>
            </div>
          )} */}
        </div>
      ) : null}
    </article>
  );
}

function AssessmentSkeleton() {
  return (
    <article
      className="border-card-border bg-background grid gap-2 rounded-xl border px-3.5 py-2.5"
      aria-hidden
    >
      <div className="bg-card-skeleton h-3 w-[30%] animate-pulse rounded-full motion-reduce:animate-none" />
      <div className="bg-card-skeleton h-3 w-[45%] animate-pulse rounded-full motion-reduce:animate-none" />
      <div className="bg-card-skeleton h-3 w-[88%] animate-pulse rounded-full motion-reduce:animate-none" />
      <div className="mt-1 grid grid-cols-4 gap-2">
        <div className="bg-card-skeleton h-4 animate-pulse rounded-full motion-reduce:animate-none" />
        <div className="bg-card-skeleton h-4 animate-pulse rounded-full motion-reduce:animate-none" />
        <div className="bg-card-skeleton h-4 animate-pulse rounded-full motion-reduce:animate-none" />
        <div className="bg-card-skeleton h-4 animate-pulse rounded-full motion-reduce:animate-none" />
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"scheduled" | "activity">("scheduled");

  const {
    data: quizzes = [],
    isLoading: isQuizzesLoading,
    isError: isQuizzesError,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  });

  const {
    data: subparts = [],
    isLoading: isSubpartsLoading,
    isError: isSubpartsError,
  } = useQuery({
    queryKey: ["quiz-subparts"],
    queryFn: fetchQuizSubparts,
  });

  const subpartsByQuizId = useMemo(
    () => new Map(subparts.map((item) => [item.id, item])),
    [subparts],
  );

  const visibleQuizzes = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const filtered = quizzes.filter((quiz) => {
      if (!lowered) {
        return true;
      }

      return (
        quiz.title.toLowerCase().includes(lowered) ||
        quiz.description.toLowerCase().includes(lowered)
      );
    });

    return filtered.sort((left, right) => {
      if (sortBy === "activity") {
        return right.lastActivity.localeCompare(left.lastActivity);
      }

      return (
        parseScheduledDate(left.scheduledDate) -
        parseScheduledDate(right.scheduledDate)
      );
    });
  }, [quizzes, query, sortBy]);

  return (
    <main
      className="min-h-screen px-5 py-4 bg-white!"
      style={{ backgroundColor: colors.secondary.gray }}
    >
      <section className="mx-auto max-w-7xl bg-white">
        <header className="mb-3 grid grid-cols-[1fr_auto_auto] items-center max-xl:grid-cols-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex gap-4 items-center">
                <h1 className="text-xl leading-[1.15] font-bold">
                  Lessons and Formative Quizzes
                </h1>
                <a
                  href="#"
                  className="text-body text-cta-blue font-semibold no-underline"
                >
                  View Completed
                </a>
              </div>
              <p className="text-body text-subtle-text mt-2">
                Click on an objective below to view full details and options.
              </p>
            </div>

            <button
              className="border-guide-border text-guide-text text-label flex items-center gap-2 rounded-xl border border-dashed bg-white px-3 py-2"
              type="button"
            >
              <Image src="/icons/bulb.svg" alt="Guide" width={16} height={16} />
              <span className="max-w-48 text-left leading-[1.2]">
                Lessons &amp; Formative Quizzes Guide
              </span>
            </button>

            <div className="gap-4 flex items-end">
              <label
                className="relative flex gap-2"
                htmlFor="search-assessment"
              >
                <Image
                  src="/icons/search.svg"
                  alt="Search"
                  width={16}
                  height={16}
                />
                <span
                  aria-hidden
                  className="text-search-icon text-body absolute top-1/2 left-3 -translate-y-1/2"
                ></span>
                <input
                  id="search-assessment"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  className="border-field-border text-field-text text-label h-control-h w-control-w rounded-lg border bg-white pr-3.5 pl-2"
                />
              </label>

              <label className="relative" htmlFor="sort-assessment">
                <span className="sr-only">Sort assessments</span>
                <select
                  id="sort-assessment"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as "scheduled" | "activity")
                  }
                  className="border-field-border bg-white text-field-text text-label h-control-h w-control-w rounded-lg border px-2.5"
                >
                  <option value="scheduled">Sort By Scheduled</option>
                  <option value="activity">Sort By Last Activity</option>
                </select>
              </label>
            </div>
          </div>
        </header>

        <div className="relative">
          <div
            className="mt-10 grid max-h-list-max-h gap-2.5 overflow-y-auto pr-1"
            role="list"
            aria-live="polite"
          >
            {isQuizzesLoading && (
              <>
                <AssessmentSkeleton />
                <AssessmentSkeleton />
                <AssessmentSkeleton />
              </>
            )}

            {!isQuizzesLoading && isQuizzesError && (
              <p className="text-body text-danger">Could not load quiz list.</p>
            )}

            {!isQuizzesLoading &&
              !isQuizzesError &&
              visibleQuizzes.map((quiz) => (
                <div key={quiz.id} role="listitem">
                  <AssessmentCard
                    quiz={quiz}
                    subparts={subpartsByQuizId.get(quiz.id)}
                    isSubpartsLoading={isSubpartsLoading && !isSubpartsError}
                  />
                </div>
              ))}

            {!isQuizzesLoading &&
              !isQuizzesError &&
              !isSubpartsLoading &&
              isSubpartsError && (
                <p className="text-body text-danger">
                  Could not load quiz subparts.
                </p>
              )}
          </div>
        </div>
      </section>
    </main>
  );
}
