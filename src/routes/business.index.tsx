import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/business/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mesita — Sign in" },
      { name: "description", content: "Sign in to your Mesita business workspace." },
    ],
  }),
  component: BusinessLogin,
});

function BusinessLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("pato@canzeco.com");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf6f3] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-xl">
            🍅
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">mesita.</h1>
          <p className="text-sm text-muted-foreground">Business workspace</p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="mb-5 flex rounded-lg bg-[#fdf6f3] p-1">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition ${
                mode === "signin" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition ${
                mode === "signup" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/business/central" });
            }}
            className="space-y-3"
          >
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Email</span>
              <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 focus-within:border-pink-400">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                  placeholder="you@venue.com"
                />
              </div>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Password</span>
              <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 focus-within:border-pink-400">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                  placeholder="••••••••"
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            By continuing, you agree to Mesita's Terms.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}