import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  error,
  options,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none rounded-lg border bg-ink-50 px-3.5 py-2.5 pr-9 text-sm text-ink-800 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-urgent-300 focus:ring-urgent-400/40"
              : "border-ink-300 focus:border-brand-500 focus:ring-brand-500/30"
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
      </div>
      {error && <p className="text-xs font-medium text-urgent-400">{error}</p>}
    </div>
  );
}
