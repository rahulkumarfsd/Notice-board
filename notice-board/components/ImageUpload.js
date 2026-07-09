import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";

/**
 * Handles local preview + upload-to-Cloudinary in one component.
 * Reports the final hosted URL back to the parent form via onChange.
 */
export default function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError("");
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed.");
      }
      onChange(data.url);
    } catch (err) {
      setError(err.message || "Could not upload image. You can still save without one.");
      onChange("");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    setPreview("");
    setError("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-700">Image (optional)</span>

      <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-xl border border-dashed border-ink-300 bg-ink-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview || PLACEHOLDER_IMAGE}
          alt="Notice preview"
          className="h-full w-full object-cover opacity-80"
        />

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        )}

        {preview && !isUploading && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black/90"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-500 ring-1 ring-inset ring-brand-500/30 hover:bg-brand-500/10"
      >
        <ImagePlus className="h-4 w-4" />
        {preview ? "Change image" : "Upload image"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="text-xs font-medium text-urgent-400">{error}</p>}
    </div>
  );
}
