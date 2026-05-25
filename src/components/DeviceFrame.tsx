import { ReactNode } from "react";

export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative mx-auto">
      <div
        className="relative rounded-[3rem] p-[10px] shadow-elev"
        style={{
          width: 360,
          height: 740,
          background:
            "linear-gradient(160deg, oklch(0.32 0.02 220), oklch(0.10 0.01 220))",
          boxShadow:
            "0 40px 100px -20px rgba(0,0,0,0.7), inset 0 0 0 1px oklch(0.45 0.03 220 / 0.4)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-background"
          style={{ boxShadow: "inset 0 0 0 1px oklch(0.4 0.03 220 / 0.3)" }}
        >
          {/* notch */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-50 h-6 w-32 -translate-x-1/2 rounded-full bg-black/90" />
          {children}
        </div>
      </div>
      {label && (
        <p className="mt-4 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
      )}
    </div>
  );
}

export function LaptopFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div
        className="rounded-t-2xl p-3 pb-2"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.30 0.02 220), oklch(0.18 0.02 220))",
          boxShadow:
            "0 50px 120px -30px rgba(0,0,0,0.8), inset 0 0 0 1px oklch(0.45 0.03 220 / 0.3)",
        }}
      >
        <div className="overflow-hidden rounded-lg bg-background" style={{ aspectRatio: "16/10" }}>
          <div className="flex h-7 items-center gap-1.5 border-b border-border bg-card px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-4 text-xs text-muted-foreground">
              business.mesita.app
            </span>
          </div>
          <div className="h-[calc(100%-1.75rem)] overflow-hidden">{children}</div>
        </div>
      </div>
      <div
        className="mx-auto h-3 w-[110%] -translate-x-[5%] rounded-b-[1.5rem]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.22 0.02 220), oklch(0.10 0.01 220))",
        }}
      />
      {label && (
        <p className="mt-5 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
      )}
    </div>
  );
}