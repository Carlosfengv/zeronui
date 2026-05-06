import { Skeleton } from "@zeron-ui/ui/skeleton";

export default function SkeletonExample() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
