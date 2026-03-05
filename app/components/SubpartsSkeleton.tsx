export function SubpartsSkeleton() {
  return (
    <div
      className="border-card-divider grid grid-cols-4 border-t max-lg:grid-cols-1"
      aria-hidden
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`subpart-skeleton-${index}`}
          className="border-card-divider min-w-0 border-r px-3 py-2 last:border-r-0 max-lg:border-r-0"
        >
          <div className="grid min-h-17 grid-cols-12 items-center gap-x-2">
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
    </div>
  );
}
