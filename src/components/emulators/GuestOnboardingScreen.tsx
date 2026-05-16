import { useState } from "react";
import { Loader2, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { COUNTRIES } from "@/lib/countries";

export function GuestOnboardingScreen({ userId, onDone }: { userId: string; onDone: () => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [country, setCountry] = useState("");
  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedPhone = phone.trim().replace(/\s+/g, "");

  const sendOtp = async () => {
    setError(null);
    if (!/^\+[1-9]\d{6,14}$/.test(normalizedPhone)) {
      setError("Enter phone in international format, e.g. +5215512345678");
      return;
    }
    setSendingOtp(true);
    try {
      const { error } = await supabase.auth.updateUser({ phone: normalizedPhone });
      if (error) throw error;
      setOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setError(null);
    if (otp.trim().length < 4) {
      setError("Enter the code we sent you");
      return;
    }
    setVerifyingOtp(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: normalizedPhone,
        token: otp.trim(),
        type: "phone_change",
      });
      if (error) throw error;
      setPhoneVerified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ageNum = parseInt(age, 10);
    if (!name.trim() || !ageNum || !sex || !country.trim() || !phone.trim()) {
      setError("Please complete all required fields");
      return;
    }
    if (!phoneVerified) {
      setError("Please verify your phone number");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: name.trim(),
          age: ageNum,
          sex,
          country: country.trim(),
          instagram: instagram.trim() || null,
          phone: normalizedPhone,
          onboarded: true,
        })
        .eq("user_id", userId);
      if (error) throw error;
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-foreground/40";

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background text-foreground">
      <div className="flex flex-1 flex-col px-6 pb-8 pt-10">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold">Tell us about you</h1>
          <p className="mt-1 text-sm text-muted-foreground">A few details to personalize Mesita</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Age</label>
              <input
                type="number"
                min={13}
                max={120}
                className={inputCls}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Sex</label>
              <select className={inputCls} value={sex} onChange={(e) => setSex(e.target.value)} required>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Country</label>
            <select
              className={inputCls}
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
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Instagram <span className="text-muted-foreground/70">(optional)</span>
            </label>
            <input
              className={inputCls}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@yourhandle"
              maxLength={60}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                className={inputCls + " flex-1"}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneVerified(false);
                  setOtpSent(false);
                  setOtp("");
                }}
                placeholder="+5215512345678"
                maxLength={30}
                disabled={phoneVerified}
                required
              />
              {phoneVerified ? (
                <span className="flex h-11 items-center gap-1 rounded-xl bg-emerald-500/10 px-3 text-xs font-medium text-emerald-600">
                  <Check className="h-4 w-4" /> Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={sendingOtp || !phone.trim()}
                  className="h-11 rounded-xl border border-border px-3 text-xs font-medium disabled:opacity-60"
                >
                  {sendingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : otpSent ? "Resend" : "Send code"}
                </button>
              )}
            </div>
            {otpSent && !phoneVerified && (
              <div className="mt-2 flex gap-2">
                <input
                  inputMode="numeric"
                  className={inputCls + " flex-1 tracking-widest"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="6-digit code"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={verifyingOtp}
                  className="flex h-11 items-center gap-1 rounded-xl bg-foreground px-3 text-xs font-medium text-background disabled:opacity-60"
                >
                  {verifyingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShieldCheck className="h-4 w-4" /> Verify</>}
                </button>
              </div>
            )}
          </div>

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