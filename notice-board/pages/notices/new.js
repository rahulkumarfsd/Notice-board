import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NoticeForm from "@/components/NoticeForm";

export default function NewNoticePage() {
  return (
    <>
      <Head>
        <title>Post a notice · Notice Board</title>
      </Head>

      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to board
        </Link>

        <h1 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-brand-500">
          Post a notice
        </h1>

        <NoticeForm />
      </div>
    </>
  );
}
