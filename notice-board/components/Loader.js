import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading notices…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-500">
      <Loader2 className="h-7 w-7 animate-spin text-brand-500" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
