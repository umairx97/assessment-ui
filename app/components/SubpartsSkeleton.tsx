export function SubpartsSkeleton() {
  return (
    <div
      className="border-card-divider flex items-stretch max-lg:flex-col"
      aria-hidden
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`subpart-skeleton-${index}`}
          className="border-card-divider min-w-0 flex-1 border-r px-3 pt-0.5 pb-0 last:border-r-0 max-lg:border-r-0"
        >
          <div className="grid min-h-14 grid-cols-12 items-center gap-x-2">
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

      <div className="inline-flex shrink-0 items-center justify-center gap-1 px-2 py-0 max-lg:justify-start">
        <div className="bg-card-skeleton h-4 w-4 animate-pulse rounded-full motion-reduce:animate-none" />
        <div className="bg-card-skeleton h-4 w-4 animate-pulse rounded-full motion-reduce:animate-none" />
        <div className="bg-card-skeleton h-3 w-3 animate-pulse rounded-full motion-reduce:animate-none" />
      </div>
    </div>
  );
}
