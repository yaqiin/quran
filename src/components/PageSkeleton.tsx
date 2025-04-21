
import { cn } from "@/lib/utils";

interface PageSkeletonProps {
  className?: string;
}

export default function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <div className="w-4/5 h-4/5 bg-muted animate-pulse rounded"></div>
    </div>
  );
}
