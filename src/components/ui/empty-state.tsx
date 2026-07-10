import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon = <FolderOpen className="h-10 w-10 text-neutral-500" />,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/20 backdrop-blur-sm max-w-sm mx-auto">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-neutral-900 border border-neutral-800 mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold font-display text-white mb-1">
        {title}
      </h3>
      <p className="text-xs text-neutral-400 leading-normal mb-4">
        {description}
      </p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
