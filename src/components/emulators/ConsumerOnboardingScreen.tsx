import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";

// Shared field chrome (label + matching input/select sizing).
const INPUT_CLASS =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-foreground/40";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
        {optional && <span className="text-muted-foreground/70"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export function ConsumerOnboardingScreen({
  onDone,
}: {
  onDone: (profile: {
    name: string;
    age: number;
    sex: string;
    country: string;
    instagram: string;
    phone: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [country, setCountry] = useState("");
  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedPhone = phone.trim().replace(/\s+/g, "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ageNum = parseInt(age, 10);
    if (!name.trim() || !ageNum || !sex || !country.trim() || !phone.trim()) {
      setError("Please complete all required fields");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      onDone({
        name: name.trim(),
        age: ageNum,
        sex,
        country: country.trim(),
        instagram: instagram.trim(),
        phone: normalizedPhone,
      });
      setLoading(false);
    }, 450);
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background text-foreground">
      <div className="flex flex-1 flex-col px-6 pb-8 pt-10">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold">Tell us about you</h1>
          <p className="mt-1 text-sm text-muted-foreground">A few details to personalize Mesita</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <Field label="Name">
            <input className={INPUT_CLASS} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Age">
              <input
                type="number"
                min={13}
                max={120}
                className={INPUT_CLASS}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Field>
            <Field label="Sex">
              <select className={INPUT_CLASS} value={sex} onChange={(e) => setSex(e.target.value)} required>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </Field>
          </div>
          <Field label="Country">
            <select
              className={INPUT_CLASS}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag}  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Instagram" optional>
            <input
              className={INPUT_CLASS}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@yourhandle"
              maxLength={60}
            />
          </Field>
          <Field label="Phone number">
            <input
              type="tel"
              className={INPUT_CLASS}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+5215512345678"
              maxLength={30}
              required
            />
          </Field>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background transition disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}