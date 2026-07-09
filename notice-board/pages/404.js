import Head from "next/head";
import Link from "next/link";
import { SearchX } from "lucide-react";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found · Notice Board</title>
      </Head>
      <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-200">
          <SearchX className="h-8 w-8 text-ink-500" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-brand-500">
          404 — Page not found
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          The notice or page you&apos;re looking for doesn&apos;t exist, or may
          have been removed.
        </p>
        <Link href="/" className="mt-6">
          <Button>Back to board</Button>
        </Link>
      </div>
    </>
  );
}
