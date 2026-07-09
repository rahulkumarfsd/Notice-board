import Link from "next/link";
import { useRouter } from "next/router";
import { Megaphone, Plus } from "lucide-react";
import Button from "@/components/Button";

export default function Navbar() {
  const router = useRouter();
  const isNew = router.pathname === "/notices/new";

  return (
    <header className="sticky top-0 z-40 border-b border-brand-500/20 bg-ink-50/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500 shadow-neonGlow ring-1 ring-brand-500/30">
            <Megaphone className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-brand-500">
            Notice Board
          </span>
        </Link>

        {!isNew && (
          <Link href="/notices/new">
            <Button icon={Plus} size="sm" className="sm:px-4 sm:py-2.5">
              <span className="hidden sm:inline">Post notice</span>
              <span className="sm:hidden">New</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
