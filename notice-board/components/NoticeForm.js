import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Save, X } from "lucide-react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import { CATEGORIES, PRIORITIES } from "@/utils/constants";
import { toInputDate } from "@/utils/formatDate";

const emptyForm = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: toInputDate(new Date()),
  image: "",
};

export default function NoticeForm({ notice }) {
  const router = useRouter();
  const isEditing = Boolean(notice);

  const [form, setForm] = useState(
    notice
      ? {
          title: notice.title,
          body: notice.body,
          category: notice.category,
          priority: notice.priority,
          publishDate: toInputDate(notice.publishDate),
          image: notice.image || "",
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch(
        isEditing ? `/api/notices/${notice.id}` : "/api/notices",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();

      if (res.status === 400) {
        setErrors(data.errors || {});
        toast.error("Please fix the highlighted fields.");
        return;
      }
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      toast.success(isEditing ? "Notice updated." : "Notice posted.");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Could not save the notice.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl2 bg-ink-100 p-6 shadow-soft ring-1 ring-ink-300 sm:p-8"
    >
      <Input
        id="title"
        label="Title"
        placeholder="e.g. Mid-term examination schedule released"
        value={form.title}
        error={errors.title}
        onChange={(e) => update("title", e.target.value)}
        maxLength={200}
      />

      <Textarea
        id="body"
        label="Body"
        placeholder="Write the full notice details here…"
        rows={5}
        value={form.body}
        error={errors.body}
        onChange={(e) => update("body", e.target.value)}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          id="category"
          label="Category"
          options={CATEGORIES}
          value={form.category}
          error={errors.category}
          onChange={(e) => update("category", e.target.value)}
        />
        <Select
          id="priority"
          label="Priority"
          options={PRIORITIES}
          value={form.priority}
          error={errors.priority}
          onChange={(e) => update("priority", e.target.value)}
        />
      </div>

      <Input
        id="publishDate"
        type="date"
        label="Publish date"
        value={form.publishDate}
        error={errors.publishDate}
        onChange={(e) => update("publishDate", e.target.value)}
      />

      <ImageUpload
        value={form.image}
        onChange={(url) => update("image", url)}
      />

      <div className="mt-2 flex items-center gap-3 border-t border-ink-300 pt-5">
        <Button type="submit" icon={Save} isLoading={isSubmitting}>
          {isEditing ? "Save changes" : "Post notice"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          icon={X}
          onClick={() => router.push("/")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
