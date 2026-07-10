import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const fallbackId = React.useId();
    const inputId = id || fallbackId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${
            error ? "border-rose-500/50 focus:border-rose-500" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    const fallbackId = React.useId();
    const selectId = id || fallbackId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-white bg-neutral-950 appearance-none focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${
              error ? "border-rose-500/50 focus:border-rose-500" : ""
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-neutral-950 text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
