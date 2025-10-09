import { LoadingBar } from "@/components/common/loading-bar";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Football Manager</h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we load your game data
          </p>
        </div>

        <LoadingBar
          indeterminate
          label="Loading game data..."
          color="default"
          size="md"
          duration={3000}
        />

        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>
            Tip: You can check your connection status in the top right corner
          </p>
        </div>
      </div>
    </div>
  );
}
