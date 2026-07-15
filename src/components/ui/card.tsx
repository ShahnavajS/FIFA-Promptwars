import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glowing";
  hoverable?: boolean;
}

export function Card({
  children,
  variant = "glass",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl border p-5 overflow-hidden relative";

  const variants = {
    default: "bg-neutral-900 border-neutral-800 text-white",
    glass: "glass-panel text-white",
    glowing: "glass-panel border-cyber-green/20 text-white shadow-[0_0_20px_rgba(0,230,118,0.05)]",
  };

  const hoverStyles = hoverable
    ? "transition-all duration-300 hover:scale-[1.01] hover:border-neutral-700/60 hover:bg-neutral-900/40"
    : "";

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`} {...props}>
      {variant === "glowing" && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-green/5 rounded-full blur-2xl pointer-events-none" />
      )}
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-bold font-display tracking-tight text-white ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-neutral-400 leading-normal ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
