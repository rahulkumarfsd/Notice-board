import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, CalendarDays } from "lucide-react";
import { CategoryBadge, PriorityBadge } from "@/components/Badge";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import { formatDate } from "@/utils/formatDate";

export default function NoticeCard({ notice, onDeleteRequest }) {
  const isUrgent = notice.priority === "Urgent";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl2 bg-ink-100 transition-all duration-200 hover:-translate-y-0.5 ${
        isUrgent
          ? "shadow-urgentGlow ring-1 ring-urgent-300 border-l-4 border-urgent-500"
          : "shadow-soft ring-1 ring-ink-300 hover:shadow-softHover hover:ring-brand-500/30"
      }`}
    >
      <div className="relative h-44 w-full overflow-hidden bg-ink-200">
        <Image
          src={notice.image || PLACEHOLDER_IMAGE}
          alt={notice.image ? notice.title : "No image provided for this notice"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
        />
        {isUrgent && (
          <div className="absolute left-3 top-3">
            <PriorityBadge priority="Urgent" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={notice.category} />
          {!isUrgent && <PriorityBadge priority={notice.priority} />}
        </div>

        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-ink-900">
          {notice.title}
        </h3>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-600">
          {notice.body}
        </p>

        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(notice.publishDate)}
        </div>

        <div className="mt-1 flex items-center gap-2 border-t border-ink-300 pt-3">
          <Link
            href={`/notices/${notice.id}/edit`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-500 ring-1 ring-inset ring-brand-500/30 transition-colors hover:bg-brand-500/10"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
          <button
            onClick={() => onDeleteRequest(notice)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-urgent-400 ring-1 ring-inset ring-urgent-300 transition-colors hover:bg-urgent-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
