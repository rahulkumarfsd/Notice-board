import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import Button from "@/components/Button";

export default function DeleteModal({ notice, isDeleting, onConfirm, onCancel }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  if (!notice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl2 bg-ink-100 p-6 shadow-softHover ring-1 ring-ink-300 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-urgent-50">
            <AlertTriangle className="h-5 w-5 text-urgent-400" />
          </div>
          <button
            onClick={onCancel}
            aria-label="Close"
            className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-200 hover:text-ink-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h2 id="delete-modal-title" className="mt-4 text-lg font-semibold text-ink-900">
          Delete this notice?
        </h2>
        <p className="mt-1.5 text-sm text-ink-600">
          &ldquo;{notice.title}&rdquo; will be permanently removed from the board.
          This can&apos;t be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="dangerSolid"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Delete notice
          </Button>
        </div>
      </div>
    </div>
  );
}
