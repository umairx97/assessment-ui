import Image from "next/image";
import { useState } from "react";
import { metricGroups } from "../constants/quiz";
import { MetricBlock } from "./MetricBlock";
import { SubpartsSkeleton } from "./SubpartsSkeleton";
import type { Metric, Quiz, QuizSubparts } from "../types/quiz";

export function AssessmentCard({
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

  type MetricKey = (typeof metricGroups)[number]["key"];

  const [metricEnabledOverrides, setMetricEnabledOverrides] = useState<
    Partial<Record<MetricKey, boolean>>
  >({});
  const [isMonitoring, setIsMonitoring] = useState(false);

  const toggleMetric = (key: MetricKey) => {
    const currentEnabled =
      metricEnabledOverrides[key] ?? metricValues[key].enabled;

    setMetricEnabledOverrides((previous) => ({
      ...previous,
      [key]: !currentEnabled,
    }));
  };

  const handleMonitorClick = async () => {
    setIsMonitoring(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsMonitoring(false);
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
          className="text-body bg-cta-blue h-9 min-w-24 cursor-pointer items-center rounded-full border-0 px-4 text-white"
          type="button"
          onClick={handleMonitorClick}
          disabled={isMonitoring}
          aria-busy={isMonitoring}
        >
          {isMonitoring ? (
            <span className="flex items-center justify-center">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
            </span>
          ) : (
            "Monitor"
          )}
        </button>
      </div>

      <p className="text-body text-card-muted mt-2 mb-2.5 ml-7 leading-[1.35]">
        {quiz.description}
      </p>

      {isSubpartsLoading && !subparts ? (
        <SubpartsSkeleton />
      ) : subparts ? (
        <div className="border-card-divider flex items-stretch max-lg:flex-col">
          {metricGroups.map((group) => (
            <MetricBlock
              key={group.key}
              label={group.label}
              className={`flex-1 ${group.key === "formative" ? "border-r-0" : ""}`}
              metric={{
                ...metricValues[group.key],
                enabled:
                  metricEnabledOverrides[group.key] ??
                  metricValues[group.key].enabled,
              }}
              onToggle={() => toggleMetric(group.key)}
              showMastery={group.key !== "lesson"}
            />
          ))}

          <div
            className="text-body text-card-muted inline-flex shrink-0 items-center justify-center gap-1 px-2 py-1.5 max-lg:justify-start"
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
            <span>{subparts.peerCount}</span>
          </div>
        </div>
      ) : null}
    </article>
  );
}
