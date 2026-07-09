import { ClipboardList, Plus } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border-2 border-dashed border-brand-500/30 bg-ink-100/60 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10">
        <ClipboardList className="h-7 w-7 text-brand-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink-800">
        The board is empty
      </h3>
      <p className="mt-1 max-w-sm text-sm text-ink-600">
        Nothing has been posted yet. Add the first notice so people know
        what&apos;s happening.
      </p>
      <Link href="/notices/new" className="mt-6">
        <Button icon={Plus}>Post a notice</Button>
      </Link>
    </div>
  );
}
