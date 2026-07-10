import React from "react";

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className="animate-spin h-8 w-8 text-cyber-green"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function RadarPulse({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center h-20 w-20 ${className}`}>
      <div className="absolute inset-0 rounded-full bg-cyber-green/20 animate-radar" />
      <div className="absolute h-10 w-10 rounded-full bg-cyber-green/10 border border-cyber-green/30" />
      <div className="relative h-4 w-4 rounded-full bg-cyber-green shadow-[0_0_10px_#00e676]" />
    </div>
  );
}

export function AIShimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2.5 w-full ${className}`}>
      <div className="h-4 bg-neutral-800 rounded-md animate-pulse w-3/4" />
      <div className="h-4 bg-neutral-800 rounded-md animate-pulse w-5/6" />
      <div className="h-4 bg-neutral-800 rounded-md animate-pulse w-1/2" />
    </div>
  );
}
