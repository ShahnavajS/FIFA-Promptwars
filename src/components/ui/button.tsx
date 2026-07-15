import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-cyber-green text-black hover:bg-emerald-400 focus:ring-cyber-green",
    secondary: "bg-white text-black hover:bg-neutral-200 focus:ring-white",
    danger: "bg-pulsing-coral text-white hover:bg-rose-500 focus:ring-pulsing-coral",
    ghost:
      "bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/40 focus:ring-neutral-500",
    glass: "glass-panel-interactive text-white hover:border-neutral-700 focus:ring-electric-cyan",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
      {children}
    </button>
  );
}
