import classNames from "classnames";
import { SubpartsSkeleton } from "./SubpartsSkeleton";

export function AssessmentSkeleton() {
  const articleClasses = classNames(
    "border-card-border rounded-xl border px-3.5 pt-2.5 bg-card-background",
  );
  const headerRowClasses = classNames(
    "grid grid-cols-[minmax(20rem,1.5fr)_auto_auto_auto] items-center gap-2.5 max-lg:grid-cols-1",
  );
  const titleGridClasses = classNames("grid grid-cols-3");
  const skeletonLineClasses = classNames(
    "bg-card-skeleton h-4 animate-pulse rounded-full motion-reduce:animate-none",
  );
  const buttonSkeletonClasses = classNames(
    "bg-card-skeleton h-9 min-w-24 animate-pulse rounded-full motion-reduce:animate-none",
  );
  const descriptionSkeletonClasses = classNames(
    "bg-card-skeleton mt-2 mb-2.5 ml-7 h-3.5 w-11/12 animate-pulse rounded-full motion-reduce:animate-none",
  );

  return (
    <article className={articleClasses} aria-hidden>
      <div className={headerRowClasses}>
        <div className={titleGridClasses}>
          <div className={classNames(skeletonLineClasses, "w-3/4")} />
          <div className={classNames(skeletonLineClasses, "w-2/3")} />
        </div>

        <div className={buttonSkeletonClasses} />
      </div>

      <div className={descriptionSkeletonClasses} />

      <SubpartsSkeleton />
    </article>
  );
}
