export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl2 bg-ink-100 shadow-soft ring-1 ring-ink-300">
      <div className="h-40 w-full animate-pulseSoft bg-ink-200" />
      <div className="space-y-3 p-5">
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulseSoft rounded-full bg-ink-200" />
          <div className="h-5 w-16 animate-pulseSoft rounded-full bg-ink-200" />
        </div>
        <div className="h-4 w-3/4 animate-pulseSoft rounded bg-ink-200" />
        <div className="h-3 w-full animate-pulseSoft rounded bg-ink-200" />
        <div className="h-3 w-5/6 animate-pulseSoft rounded bg-ink-200" />
      </div>
    </div>
  );
}
