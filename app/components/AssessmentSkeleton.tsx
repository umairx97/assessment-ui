import { SubpartsSkeleton } from "./SubpartsSkeleton";

export function AssessmentSkeleton() {
  return (
    <article
      className="border-card-border rounded-xl border px-3.5 pt-2.5 bg-card-background"
      aria-hidden
    >
      <div className="grid grid-cols-[minmax(20rem,1.5fr)_auto_auto_auto] items-center gap-2.5 max-lg:grid-cols-1">
        <div className="grid grid-cols-3">
          <div className="bg-card-skeleton h-4 w-3/4 animate-pulse rounded-full motion-reduce:animate-none" />
          <div className="bg-card-skeleton h-4 w-2/3 animate-pulse rounded-full motion-reduce:animate-none" />
        </div>

        <div className="bg-card-skeleton h-9 min-w-24 animate-pulse rounded-full motion-reduce:animate-none" />
      </div>

      <div className="bg-card-skeleton mt-2 mb-2.5 ml-7 h-3.5 w-11/12 animate-pulse rounded-full motion-reduce:animate-none" />

      <SubpartsSkeleton />
    </article>
  );
}
