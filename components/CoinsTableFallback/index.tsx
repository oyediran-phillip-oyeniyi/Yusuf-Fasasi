import { Skeleton } from '@/components/ui/skeleton';

const CoinsTableFallback = () => {
  return (
    <main id="coins-page">
      <div className="content">
        <div className="coins-table bg-dark-500 rounded-xl overflow-hidden ">
          {/* Table Header */}
          <div className="flex items-center border-b border-dark-400 py-4">
            <div className="pl-5 w-20">
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="w-32">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="w-32">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="w-40 pr-5">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Table Rows */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex items-center border-b border-dark-400 py-5">
              <div className="pl-5 w-20">
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex-1 flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="w-32">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="w-32">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="w-40 pr-5">
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-5 pb-5 flex justify-center gap-2">
          <Skeleton className="h-9 w-9 rounded-sm" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-9 rounded-sm" />
          ))}
          <Skeleton className="h-9 w-9 rounded-sm" />
        </div>
      </div>
    </main>
  );
};

export default CoinsTableFallback;