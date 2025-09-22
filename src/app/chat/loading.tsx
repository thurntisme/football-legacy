import { Skeleton } from '@/components/ui/skeleton';

export default function ChatLoading() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-4">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Sidebar Skeleton */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Chat Area Skeleton */}
          <div className="md:col-span-3 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center">
              <Skeleton className="h-10 w-10 rounded-full mr-3" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="flex-1 p-4">
              <div className="space-y-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                      {i % 2 === 0 && (
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                      )}
                      <div>
                        <Skeleton
                          className={`h-20 w-64 rounded-lg ${i % 2 === 0 ? 'mr-12' : 'ml-12'}`}
                        />
                        <Skeleton
                          className={`h-3 w-16 mt-1 ${i % 2 === 0 ? '' : 'ml-auto'}`}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-4 border-t">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
