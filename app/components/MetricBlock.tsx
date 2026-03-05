import { colors } from "../colors";
import type { Metric } from "../types/quiz";

export function MetricBlock({
  label,
  metric,
}: {
  label: string;
  metric: Metric;
}) {
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
