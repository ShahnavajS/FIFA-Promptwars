import React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-neutral-800/60 ${className}`}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
