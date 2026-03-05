export function AssessmentSkeleton() {
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
