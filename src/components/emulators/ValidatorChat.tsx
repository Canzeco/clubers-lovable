import { useState } from "react";
import { ArrowLeft, Camera, Check, CheckCheck, Mic, Paperclip, Plus, Send, Video, Phone } from "lucide-react";

type Msg = {
  id: number;
  from: "me" | "bot";
  text?: string;
  type?: "qr" | "card" | "buttons" | "success";
  payload?: any;
  time: string;
};

const initial: Msg[] = [
  {
    id: 1,
    from: "bot",
    text: "Hola Carlos 👋 Soy Mesita. Aquí te llegan los tickets de tus clientes en *Casa Luminar*.",
    time: "9:32 PM",
  },
  {
    id: 2,
    from: "bot",
    text: "📩 *Nuevo ticket entrante* — Valentina R. está pidiendo tu validación.",
    time: "9:32 PM",
  },
  {
    id: 3,
    from: "bot",
    type: "card",
    payload: {
      name: "Valentina R.",
      tier: "GOLD",
      coupon: "20% cashback",
      bill: "MXN 1,240",
      tip: "MXN 186 (15%)",
      total: "MXN 1,426",
      waiter: "Carlos",
      story: true,
    },
    time: "9:32 PM",
  },
  {
    id: 4,
    from: "bot",
    text: "¿Confirmas que el ticket es correcto? Se cobrará en Mesita Credits de la clienta.",
    type: "buttons",
    payload: ["✅ Confirmar", "❌ Rechazar"],
    time: "9:32 PM",
  },
];

export function ValidatorChat() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [step, setStep] = useState<"pending" | "validated">("pending");

  const push = (m: Omit<Msg, "id" | "time"> & { time?: string }) =>
    setMsgs((prev) => [
      ...prev,
      { ...m, id: Date.now() + Math.random(), time: m.time ?? "9:33 PM" },
    ]);

  const confirm = () => {
    push({ from: "me", text: "✅ Confirmar" });
    setTimeout(() => {
      push({
        from: "bot",
        type: "success",
        payload: { amount: "MXN 1,426", saved: "cobrado · +MXN 223 cashback a Valentina" },
      });
      push({
        from: "bot",
        text: "Listo. Pago acreditado al venue en Mesita Credits. Te aviso del próximo ticket.",
        type: "buttons",
        payload: ["📊 Cierre del turno"],
      });
      setStep("validated");
    }, 700);
  };

  const handleButton = (label: string) => {
    if (label.includes("Confirmar")) return confirm();
    push({ from: "me", text: label });
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{ background: "var(--wa-bg)" }}
    >
      {/* WhatsApp header */}
      <div
        className="flex items-center gap-3 px-3 pb-2 pt-9"
        style={{ background: "var(--wa-header)" }}
      >
        <ArrowLeft className="h-5 w-5 text-white/80" />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-peacock text-lg">
          🦚
        </div>
        <div className="flex-1">
          <p className="font-medium text-white">Mesita · Validador</p>
          <p className="text-[11px] text-white/60">en línea</p>
        </div>
        <Video className="h-5 w-5 text-white/70" />
        <Phone className="h-5 w-5 text-white/70" />
      </div>

      {/* messages */}
      <div
        className="flex-1 space-y-2 overflow-y-auto scrollbar-hide px-3 py-3"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.30 0.04 160 / 0.3) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {msgs.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[80%] rounded-lg px-3 py-2 text-sm text-white shadow"
              style={{
                background:
                  m.from === "me" ? "var(--wa-bubble-out)" : "var(--wa-bubble-in)",
                borderTopRightRadius: m.from === "me" ? 0 : undefined,
                borderTopLeftRadius: m.from === "bot" ? 0 : undefined,
              }}
            >
              {m.text && <p className="leading-snug">{m.text}</p>}

              {m.type === "buttons" && (
                <div className="mt-2 flex flex-col gap-1">
                  {(m.payload as string[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => handleButton(b)}
                      className="rounded-md border-t border-white/10 bg-white/5 px-3 py-1.5 text-center text-[13px] font-medium text-emerald-300 transition hover:bg-white/10"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}

              {m.type === "card" && (
                <div className="-mx-1 mt-1 rounded-md bg-black/25 p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-semibold">
                        {m.payload.name}
                      </p>
                      <p className="text-[11px] text-white/60">Mesa 12 · 2 pax</p>
                    </div>
                    <span className="rounded-full bg-tier-gold px-2 py-0.5 text-[10px] font-bold text-black">
                      {m.payload.tier}
                    </span>
                  </div>
                  <div className="space-y-1 text-[12px] text-white/80">
                    <div className="flex justify-between">
                      <span>Cuenta</span>
                      <span className="font-semibold">{m.payload.bill}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Propina · {m.payload.waiter}</span>
                      <span>{m.payload.tip}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-1">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-emerald-300">{m.payload.total}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-white/60">
                      <span>Cupón</span>
                      <span>{m.payload.coupon}</span>
                    </div>
                    {m.payload.story && (
                      <div className="flex justify-between text-[11px] text-sky-300">
                        <span>📸 Story IG</span>
                        <span>verificada</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {m.type === "success" && (
                <div className="-mx-1 mt-1 rounded-md bg-emerald-500/15 p-3 text-center">
                  <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-black">
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </div>
                  <p className="text-[13px] font-semibold text-emerald-200">
                    Validado · {m.payload.amount}
                  </p>
                  <p className="text-[11px] text-white/60">
                    abonado {m.payload.saved}
                  </p>
                </div>
              )}

              <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/50">
                {m.time}
                {m.from === "me" && <CheckCheck className="h-3 w-3 text-sky-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* input bar */}
      <div
        className="flex items-center gap-2 px-2 py-2"
        style={{ background: "var(--wa-header)" }}
      >
        <div className="flex flex-1 items-center gap-2 rounded-full bg-black/30 px-3 py-2">
          <Plus className="h-5 w-5 text-white/60" />
          <span className="flex-1 text-sm text-white/40">Mensaje</span>
          <Paperclip className="h-5 w-5 text-white/60" />
          <Camera className="h-5 w-5 text-white/60" />
        </div>
        <button
          onClick={confirm}
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "var(--wa-accent)" }}
        >
          <Mic className="h-5 w-5 text-black" />
        </button>
      </div>
    </div>
  );
}