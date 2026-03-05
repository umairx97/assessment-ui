import classNames from "classnames";
import { colors } from "../colors";
import { useEffect, useRef } from "react";
import type { Metric } from "../types/quiz";

export function MetricBlock({
  label,
  metric,
  onToggle,
  showMastery = true,
  className,
}: {
  label: string;
  metric: Metric;
  onToggle: () => void;
  showMastery?: boolean;
  className?: string;
}) {
  const completionRef = useRef<HTMLSpanElement | null>(null);
  const masteryRef = useRef<HTMLSpanElement | null>(null);

  const completionPercent = Math.max(0, Math.min(100, metric.percent));
  const masteryPercent = Math.max(0, Math.min(100, metric.percent));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    completionRef.current?.animate(
      [{ width: "0%" }, { width: `${completionPercent}%` }],
      { duration: 700, easing: "ease-out" },
    );

    if (showMastery) {
      masteryRef.current?.animate(
        [{ width: "0%" }, { width: `${masteryPercent}%` }],
        { duration: 700, easing: "ease-out" },
      );
    }
  }, [completionPercent, masteryPercent, showMastery]);

  const switchBg = metric.enabled ? "bg-toggle-on" : "bg-card-placeholder";
  const thumbTranslate = metric.enabled ? "translate-x-4" : "translate-x-0";
  const trackBg = "bg-card-track";

  const containerClasses = classNames(
    "border-card-divider min-w-0 border-r px-3 pt-0.5 pb-0 last:border-r-0 max-lg:border-r-0",
    className,
  );

  const gridClasses = classNames("grid min-h-14 items-center gap-x-2", {
    "grid-cols-12": showMastery,
    "grid-cols-10": !showMastery,
  });

  const toggleButtonClasses = classNames(
    switchBg,
    "col-span-2 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-0 p-0.5 transition-colors duration-300 ease-out",
  );

  const toggleThumbClasses = classNames(
    thumbTranslate,
    "h-4 w-4 rounded-full bg-white transition-transform duration-300 ease-out",
  );

  const completionCellClasses = classNames("min-w-0", {
    "col-span-3": showMastery,
    "col-span-4": !showMastery,
  });

  const trackClasses = classNames(
    trackBg,
    "h-3 min-w-0 overflow-hidden rounded-full",
  );

  const masteryTrackClasses = classNames(
    trackBg,
    "h-3 w-full overflow-hidden rounded-full",
  );

  return (
    <div className={containerClasses}>
      <div className={gridClasses}>
        <div className="text-card-muted col-span-4 flex flex-col text-[12px] text-center leading-[1.05]">
          {label}
        </div>

        <button
          className={toggleButtonClasses}
          type="button"
          onClick={onToggle}
          aria-label={`Toggle ${label}`}
          aria-pressed={metric.enabled}
        >
          <span className={toggleThumbClasses} />
        </button>

        <div className={completionCellClasses}>
          <div
            className={trackClasses}
            role="progressbar"
            aria-label={`${label} completion`}
            aria-valuemin={0}
            aria-valuemax={metric.total}
            aria-valuenow={metric.correct}
          >
            <span
              ref={completionRef}
              className="block h-full rounded-full"
              style={{
                width: `${completionPercent}%`,
                backgroundColor: colors.primary.blue,
              }}
            />
          </div>

          <div className="text-body text-[12px] text-card-muted mt-0.5 text-center leading-none">{`${metric.correct} / ${metric.total}`}</div>
        </div>

        {showMastery && (
          <div className="col-span-3 min-w-0">
            <div
              className={masteryTrackClasses}
              role="progressbar"
              aria-label={`${label} mastery`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={metric.percent}
            >
              <span
                ref={masteryRef}
                className="block h-full rounded-full"
                style={{
                  width: `${masteryPercent}%`,
                  backgroundColor: colors.primary.purple,
                }}
              />
            </div>

            <div className="text-body text-[12px] text-card-muted mt-0.5 text-center leading-none">{`${metric.percent}%`}</div>
          </div>
        )}
      </div>
    </div>
  );
}
