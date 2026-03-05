"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { colors } from "./colors";

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

type ApiResponse = {
  assessments: Assessment[];
};

const metricGroups = [
  { key: "lesson", label: "Lesson\nGuided Practice" },
  { key: "independent", label: "Independent\nPractice" },
  { key: "continuous", label: "Continuous\nPractice" },
  { key: "formative", label: "Formative\nQuiz" },
] as const;

function parseScheduledDate(value: string | null) {
  if (!value) {
    return Number.NEGATIVE_INFINITY;
  }

  const parsed = Date.parse(`${value}, 2026`);
  return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
}

function MetricBlock({ label, metric }: { label: string; metric: Metric }) {
  if (!metric.enabled) {
    return (
      <div className="metric-block metric-block-placeholder" aria-hidden>
        <div className="metric-pill" />
        <div className="metric-pill short" />
        <div className="metric-pill" />
      </div>
    );
  }

  return (
    <div className="metric-block">
      <div className="metric-label">
        {label.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <button
        className="metric-switch"
        type="button"
        aria-label={`${label} enabled`}
      >
        <span className="metric-switch-thumb" />
      </button>

      <div className="metric-score">{`${metric.correct} / ${metric.total}`}</div>

      <div
        className="metric-progress"
        role="progressbar"
        aria-label={`${label} completion`}
        aria-valuemin={0}
        aria-valuemax={metric.total}
        aria-valuenow={metric.correct}
      >
        <span
          className="metric-progress-fill"
          style={{
            ["--target-width" as string]: `${Math.max(0, Math.min(100, metric.percent))}%`,
            backgroundColor: colors.primary.blue,
          }}
        />
      </div>

      <div
        className="metric-progress metric-progress-secondary"
        role="progressbar"
        aria-label={`${label} mastery`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={metric.percent}
      >
        <span
          className="metric-progress-fill"
          style={{
            ["--target-width" as string]: `${Math.max(0, Math.min(100, metric.percent))}%`,
            backgroundColor: colors.primary.purple,
          }}
        />
      </div>

      <div className="metric-percent">{`${metric.percent}%`}</div>
    </div>
  );
}

function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const metricValues = {
    lesson: assessment.lesson,
    independent: assessment.independent,
    continuous: assessment.continuous,
    formative: assessment.formative,
  };

  return (
    <article className="assessment-card">
      <div className="assessment-top">
        <div className="assessment-title-wrap">
          <Image src="/icons/copy.svg" alt="Copy icon" width={24} height={24} />
          <h2 className="assessment-title">{assessment.title}</h2>
          {assessment.id === "3n12" && (
            <Image
              src="/icons/muscles.svg"
              alt="Strength indicator"
              width={20}
              height={20}
            />
          )}
        </div>

        <div className="assessment-dates">
          <Image
            src="/icons/calendar.svg"
            alt="Calendar"
            width={24}
            height={24}
          />
          <div>
            <div className="assessment-date-main">
              {assessment.scheduledDate ?? "Not Scheduled"}
            </div>
          </div>
        </div>

        <div className="assessment-dates">
          <div>
            <div className="assessment-date-label">Last Activity</div>
            <div className="assessment-date-main">
              {assessment.lastActivity}
            </div>
          </div>
        </div>

        <button className="monitor-btn" type="button">
          Monitor
        </button>
      </div>

      <p className="assessment-description">{assessment.description}</p>

      <div className="metrics-row">
        {metricGroups.map((group) => (
          <MetricBlock
            key={group.key}
            label={group.label}
            metric={metricValues[group.key]}
          />
        ))}

        {assessment.peerCount > 0 && (
          <div className="peer-count" aria-label="Peer interactions">
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
            <span>{assessment.peerCount}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function AssessmentSkeleton() {
  return (
    <article className="assessment-card skeleton-card" aria-hidden>
      <div className="skeleton-line lg" />
      <div className="skeleton-line" />
      <div className="skeleton-line xl" />
      <div className="skeleton-metrics">
        <div className="skeleton-pill" />
        <div className="skeleton-pill" />
        <div className="skeleton-pill" />
        <div className="skeleton-pill" />
      </div>
    </article>
  );
}

export default function Home() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"scheduled" | "activity">("scheduled");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAssessments() {
      try {
        const response = await fetch("/api/assessments", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load assessments");
        }

        const data = (await response.json()) as ApiResponse;
        if (active) {
          setAssessments(data.assessments);
        }
      } catch {
        if (active) {
          setError("Could not load quiz data.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAssessments();

    return () => {
      active = false;
    };
  }, []);

  const visibleAssessments = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const filtered = assessments.filter((assessment) => {
      if (!lowered) {
        return true;
      }

      return (
        assessment.title.toLowerCase().includes(lowered) ||
        assessment.description.toLowerCase().includes(lowered)
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
  }, [assessments, query, sortBy]);

  return (
    <main
      className="quiz-page"
      style={{ backgroundColor: colors.secondary.gray }}
    >
      <section className="quiz-shell">
        <header className="quiz-header">
          <div>
            <h1>Lessons and Formative Quizzes</h1>
            <p>Click on an objective below to view full details and options.</p>
          </div>

          <a href="#" className="view-link">
            View Completed
          </a>

          <button className="guide-btn" type="button">
            <Image src="/icons/bulb.svg" alt="Guide" width={20} height={20} />
            <span>Lessons &amp; Formative Quizzes Guide</span>
          </button>
        </header>

        <div className="quiz-controls">
          <label className="search-wrap" htmlFor="search-assessment">
            <span aria-hidden className="search-icon">
              ⌕
            </span>
            <input
              id="search-assessment"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
            />
          </label>

          <label className="sort-wrap" htmlFor="sort-assessment">
            <span className="sr-only">Sort assessments</span>
            <select
              id="sort-assessment"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as "scheduled" | "activity")
              }
            >
              <option value="scheduled">Sort By Scheduled</option>
              <option value="activity">Sort By Last Activity</option>
            </select>
          </label>
        </div>

        <div className="cards-list-wrap">
          <div className="cards-fade top" aria-hidden />
          <div className="cards-fade bottom" aria-hidden />

          <div className="cards-list" role="list" aria-live="polite">
            {loading && (
              <>
                <AssessmentSkeleton />
                <AssessmentSkeleton />
                <AssessmentSkeleton />
              </>
            )}

            {!loading && error && <p className="error-text">{error}</p>}

            {!loading &&
              !error &&
              visibleAssessments.map((assessment) => (
                <div key={assessment.id} role="listitem">
                  <AssessmentCard assessment={assessment} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
