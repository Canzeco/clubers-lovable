import { Link } from "@tanstack/react-router";
import { ChevronDown, LogOut } from "lucide-react";
import type { ReactNode } from "react";

// Shared header chrome for /business/*, *except* the unit dashboard
// (which renders its own full-bleed sidebar layout).
export function BusinessShell({
  children,
  email = "pato@canzeco.com",
}: {
  children: ReactNode;
  email?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdf6f3] text-foreground">
      <header className="flex items-center justify-between border-b border-black/5 bg-white/60 px-8 py-4 backdrop-blur">
        <Link to="/business/central" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-base">
            🍅
          </div>
          <span className="font-display text-xl font-bold tracking-tight">mesita.</span>
        </Link>
        <button className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1.5 shadow-sm hover:bg-white/90">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-[10px] font-bold text-white">
            {email[0].toUpperCase()}
          </span>
          <span className="text-sm font-medium">{email}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export function BusinessSignOutLink() {
  return (
    <Link to="/business" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
      <LogOut className="h-3 w-3" /> Sign out
    </Link>
  );
}