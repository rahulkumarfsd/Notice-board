import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-brand-500 text-ink-50 hover:bg-brand-400 focus-visible:ring-brand-500/50 shadow-neonGlow",
  secondary:
    "bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-300 hover:bg-ink-200 hover:text-ink-800",
  danger:
    "bg-ink-100 text-urgent-400 ring-1 ring-inset ring-urgent-200 hover:bg-urgent-50",
  dangerSolid:
    "bg-urgent-500 text-white hover:bg-urgent-600 shadow-urgentGlow",
  ghost: "text-ink-600 hover:bg-ink-200 hover:text-ink-800",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-5 py-3 gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  isLoading = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  );
}
