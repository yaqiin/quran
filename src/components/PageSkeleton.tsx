import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface PageSkeletonProps {
  className?: string;
}

export default function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center bg-muted/50", className)}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  );
}
