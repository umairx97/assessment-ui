"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AssessmentCard } from "./components/AssessmentCard";
import { AssessmentSkeleton } from "./components/AssessmentSkeleton";
import { colors } from "./colors";
import { fetchQuizzes, fetchQuizSubparts } from "./lib/quiz-api";
import { parseScheduledDate } from "./lib/quiz-utils";

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
