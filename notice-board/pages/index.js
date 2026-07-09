import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNotices } from "@/hooks/useNotices";
import NoticeGrid from "@/components/NoticeGrid";
import SkeletonCard from "@/components/SkeletonCard";
import EmptyState from "@/components/EmptyState";
import DeleteModal from "@/components/DeleteModal";

export default function Home() {
  const { notices, isLoading, error, removeNoticeLocally } = useNotices();
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    if (!noticeToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/notices/${noticeToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete notice.");
      }
      removeNoticeLocally(noticeToDelete.id);
      toast.success("Notice deleted.");
      setNoticeToDelete(null);
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Notice Board</title>
      </Head>

      <div className="mb-8 flex flex-col gap-1.5">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-brand-500 sm:text-3xl">
          Announcements
        </h1>
        <p className="text-sm text-ink-600">
          Urgent notices are pinned to the top, everything else follows by
          most recent publish date.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-xl2 bg-urgent-50 p-6 text-sm font-medium text-urgent-400 ring-1 ring-inset ring-urgent-200">
          {error}
        </div>
      )}

      {!isLoading && !error && notices.length === 0 && <EmptyState />}

      {!isLoading && !error && notices.length > 0 && (
        <NoticeGrid notices={notices} onDeleteRequest={setNoticeToDelete} />
      )}

      <DeleteModal
        notice={noticeToDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setNoticeToDelete(null)}
      />
    </>
  );
}
