import { useCallback, useEffect, useState } from "react";

/**
 * Fetches the ordered notice list from the API and exposes a
 * `refresh` function so callers can re-sync after a mutation
 * (create / edit / delete) without a full page reload.
 */
export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/notices");
      if (!res.ok) throw new Error("Failed to load notices.");
      const data = await res.json();
      setNotices(data.notices ?? []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const removeNoticeLocally = useCallback((id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { notices, isLoading, error, refresh, removeNoticeLocally };
}
