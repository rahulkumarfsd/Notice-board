export default function Textarea({ label, error, className = "", id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full rounded-lg border bg-ink-50 px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-500 transition-colors focus:outline-none focus:ring-2 resize-y ${
          error
            ? "border-urgent-300 focus:ring-urgent-400/40"
            : "border-ink-300 focus:border-brand-500 focus:ring-brand-500/30"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-medium text-urgent-400">{error}</p>}
    </div>
  );
}
