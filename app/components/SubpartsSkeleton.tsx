import classNames from "classnames";

export function SubpartsSkeleton() {
  const containerClasses = classNames(
    "border-card-divider flex items-stretch max-lg:flex-col",
  );
  const metricCellClasses = classNames(
    "border-card-divider min-w-0 flex-1 border-r px-3 pt-0.5 pb-0 last:border-r-0 max-lg:border-r-0",
  );
  const metricGridClasses = classNames(
    "grid min-h-14 grid-cols-12 items-center gap-x-2",
  );
  const baseLineClasses = classNames(
    "bg-card-skeleton animate-pulse rounded-full motion-reduce:animate-none",
  );
  const trailingClasses = classNames(
    "inline-flex shrink-0 items-center justify-center gap-1 px-2 py-0 max-lg:justify-start",
  );

  return (
    <div className={containerClasses} aria-hidden>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={`subpart-skeleton-${index}`} className={metricCellClasses}>
          <div className={metricGridClasses}>
            <div
              className={classNames(baseLineClasses, "col-span-4 h-2.5 w-3/4")}
            />
            <div
              className={classNames(baseLineClasses, "col-span-2 h-5 w-9")}
            />
            <div className="col-span-4 space-y-1">
              <div className={classNames(baseLineClasses, "h-2.5 w-full")} />
              <div className={classNames(baseLineClasses, "h-2 w-2/3")} />
            </div>
            <div className="col-span-2 space-y-1">
              <div className={classNames(baseLineClasses, "h-2.5 w-full")} />
              <div className={classNames(baseLineClasses, "h-2 w-1/2")} />
            </div>
          </div>
        </div>
      ))}

      <div className={trailingClasses}>
        <div className={classNames(baseLineClasses, "h-4 w-4")} />
        <div className={classNames(baseLineClasses, "h-4 w-4")} />
        <div className={classNames(baseLineClasses, "h-3 w-3")} />
      </div>
    </div>
  );
}
