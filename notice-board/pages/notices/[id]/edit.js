import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NoticeForm from "@/components/NoticeForm";
import prisma from "@/lib/prisma";

export default function EditNoticePage({ notice }) {
  return (
    <>
      <Head>
        <title>Edit notice · Notice Board</title>
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
          Edit notice
        </h1>

        <NoticeForm notice={notice} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return { notFound: true };
  }

  const notice = await prisma.notice.findUnique({ where: { id } });

  if (!notice) {
    return { notFound: true };
  }

  return {
    props: {
      notice: {
        ...notice,
        publishDate: notice.publishDate.toISOString(),
        createdAt: notice.createdAt.toISOString(),
        updatedAt: notice.updatedAt.toISOString(),
      },
    },
  };
}
