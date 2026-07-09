import Head from "next/head";
import Link from "next/link";
import { ServerCrash } from "lucide-react";
import Button from "@/components/Button";

export default function ServerError() {
  return (
    <>
      <Head>
        <title>Something went wrong · Notice Board</title>
      </Head>
      <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-urgent-50">
          <ServerCrash className="h-8 w-8 text-urgent-400" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-urgent-400">
          500 — Something went wrong
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          An unexpected error occurred on our end. Please try again in a
          moment.
        </p>
        <Link href="/" className="mt-6">
          <Button>Back to board</Button>
        </Link>
      </div>
    </>
  );
}
