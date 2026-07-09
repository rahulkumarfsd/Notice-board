import { AlertTriangle } from "lucide-react";
import { CATEGORY_STYLES } from "@/utils/constants";

export function CategoryBadge({ category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        CATEGORY_STYLES[category] || CATEGORY_STYLES.General
      }`}
    >
      {category}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  if (priority !== "Urgent") {
    return (
      <span className="inline-flex items-center rounded-full bg-brand-500/15 px-2.5 py-1 text-xs font-semibold text-brand-500 ring-1 ring-inset ring-brand-500/30">
        Normal
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-urgent-500 px-2.5 py-1 text-xs font-semibold text-white shadow-urgentGlow">
      <AlertTriangle className="h-3 w-3" />
      Urgent
    </span>
  );
}
