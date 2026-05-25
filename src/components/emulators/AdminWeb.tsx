import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  Search,
  Plus,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Star,
  Filter,
  Check,
  X as XIcon,
  Upload,
  Wand2,
  Globe,
  Instagram,
  Tag,
  Building2,
  PartyPopper,
  UserCircle2,
  Compass,
  ChevronRight,
  Eye,
  PencilLine,
  Trash2,
  Bot,
  TrendingUp,
  Clock,
} from "lucide-react";
import { SEED_LISTINGS, type Category, type Listing } from "@/lib/clubers/data";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

type EntityTab = Category;

const TAB_META: Record<EntityTab, { label: string; plural: string; Icon: IconType; hint: string; accent: string }> = {
  place:     { label: "Place",     plural: "Places",      Icon: Building2,    hint: "Venues, restaurants, bars, rooftops",      accent: "from-rose-500 to-pink-500" },
  event:     { label: "Event",     plural: "Events",      Icon: PartyPopper,  hint: "One-off nights, concerts, pop-ups",        accent: "from-violet-500 to-fuchsia-500" },
  experience:{ label: "Experience",plural: "Experiences", Icon: Compass,      hint: "Tastings, workshops, guided activities",   accent: "from-emerald-500 to-teal-500" },
  community: { label: "Community", plural: "Communities", Icon: Users,        hint: "Clubs, schools, member groups",            accent: "from-sky-500 to-cyan-500" },
  person:    { label: "Person",    plural: "People",      Icon: UserCircle2,  hint: "DJs, foodies, hosts, tastemakers",          accent: "from-amber-500 to-orange-500" },
};

type View = "dashboard" | EntityTab;

export function AdminWeb() {
  const [view, setView] = useState<View>("dashboard");
  const [creating, setCreating] = useState<EntityTab | null>(null);

  const nav: { id: View; label: string; Icon: IconType; hint: string }[] = [
    { id: "dashboard", label: "Overview",     Icon: TrendingUp, hint: "Network at a glance" },
    { id: "place",     label: "Places",       Icon: Building2,  hint: "City inventory" },
    { id: "event",     label: "Events",       Icon: PartyPopper,hint: "Tonight & upcoming" },
    { id: "experience",label: "Experiences",  Icon: Compass,    hint: "Tastings & workshops" },
    { id: "community", label: "Communities",  Icon: Users,      hint: "Group rails" },
    { id: "person",    label: "People",       Icon: UserCircle2,hint: "Creators & hosts" },
  ];

  const counts = useMemo(() => {
    const c: Record<EntityTab, number> = { place: 0, event: 0, experience: 0, community: 0, person: 0 };
    SEED_LISTINGS.forEach(l => { c[l.category]++; });
    return c;
  }, []);

  return (
    <div className="flex h-full bg-background text-foreground">
      <aside className="flex w-64 flex-col border-r border-border bg-sidebar p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-base font-black text-white">
            c.
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none">clubers HQ</p>
            <p className="eyebrow">Network console</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map(n => {
            const active = view === n.id;
            const count = n.id !== "dashboard" ? counts[n.id as EntityTab] : null;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                  active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                }`}
              >
                <n.Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">
                  <span className="block text-[13px] font-medium">{n.label}</span>
                  <span className="block text-[10.5px] text-muted-foreground">{n.hint}</span>
                </span>
                {count !== null && (
                  <span className="rounded-full bg-card px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">{count}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-3 rounded-xl border border-dashed border-border/60 bg-card/50 p-3">
          <p className="eyebrow">AI sourcing</p>
          <p className="mt-1 text-xs text-foreground/80">Agents pull places, events, people automatically — you curate.</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Search the network…
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs">
              <Filter className="h-3.5 w-3.5" /> Monterrey · all tiers
            </button>
            <CreateMenu onPick={setCreating} />
          </div>
        </div>

        {view === "dashboard" && <Dashboard counts={counts} onCreate={setCreating} onOpen={setView} />}
        {view !== "dashboard" && <EntityList tab={view} onCreate={() => setCreating(view)} />}
      </main>

      {creating && <CreateDrawer tab={creating} onClose={() => setCreating(null)} />}
    </div>
  );
}

function CreateMenu({ onPick }: { onPick: (t: EntityTab) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-white shadow-glow"
      >
        <Plus className="h-3.5 w-3.5" /> Create
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-elev">
          {(Object.keys(TAB_META) as EntityTab[]).map(k => {
            const m = TAB_META[k];
            return (
              <button
                key={k}
                onClick={() => { setOpen(false); onPick(k); }}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs hover:bg-muted"
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${m.accent} text-white`}>
                  <m.Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">New {m.label}</p>
                  <p className="text-[10px] text-muted-foreground">{m.hint}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Dashboard({
  counts,
  onCreate,
  onOpen,
}: {
  counts: Record<EntityTab, number>;
  onCreate: (t: EntityTab) => void;
  onOpen: (v: View) => void;
}) {
  const recent = SEED_LISTINGS.slice(0, 5);
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="eyebrow text-[11px] font-semibold">Network overview</p>
        <h1 className="font-display text-3xl font-semibold">Everything on the rails.</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Clubers indexes the city automatically. Approve what AI sources, or hand-create any of the four entities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {(Object.keys(TAB_META) as EntityTab[]).map(k => {
          const m = TAB_META[k];
          return (
            <button
              key={k}
              onClick={() => onOpen(k)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition hover:border-foreground/30"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${m.accent}`} />
              <div className="flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} text-white`}>
                  <m.Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">live</span>
              </div>
              <p className="mt-3 font-display text-3xl font-semibold">{counts[k]}</p>
              <p className="text-xs text-muted-foreground">{m.plural} in network</p>
              <button
                onClick={(e) => { e.stopPropagation(); onCreate(k); }}
                className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-foreground/70 group-hover:text-foreground"
              >
                <Plus className="h-3 w-3" /> New {m.label.toLowerCase()}
              </button>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="eyebrow">Recent activity</p>
              <p className="text-sm font-semibold">Latest entries across all entities</p>
            </div>
            <button className="text-[11px] font-semibold text-muted-foreground hover:text-foreground">View all</button>
          </div>
          <div className="space-y-2">
            {recent.map(l => {
              const m = TAB_META[l.category];
              return (
                <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${m.accent} text-white`}>
                    <m.Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold">{l.name}</p>
                    <p className="text-[10px] text-muted-foreground">{m.label} · {l.zone} · {l.subcategory}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground capitalize">{l.participation}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">AI sourcing</p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Agents scan Google Business, Luma, Eventbrite, IG — they bring candidates here for approval.</p>
          <div className="mt-3 space-y-1.5 text-[11px]">
            <Row label="Places queued" value="38" />
            <Row label="Events tonight" value="12" />
            <Row label="People shortlisted" value="7" />
            <Row label="Communities sourced" value="4" />
          </div>
          <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-foreground py-2 text-[11px] font-semibold text-background">
            <Sparkles className="h-3 w-3" /> Run agent batch
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function EntityList({ tab, onCreate }: { tab: EntityTab; onCreate: () => void }) {
  const m = TAB_META[tab];
  const items = SEED_LISTINGS.filter(l => l.category === tab);
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow text-[11px] font-semibold">{m.plural}</p>
          <h1 className="font-display text-3xl font-semibold">{m.hint}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} {m.plural.toLowerCase()} in the network.</p>
        </div>
        <button
          onClick={onCreate}
          className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${m.accent} px-3 py-2 text-xs font-semibold text-white shadow-glow`}
        >
          <Plus className="h-3.5 w-3.5" /> New {m.label.toLowerCase()}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map(l => <EntityCard key={l.id} l={l} />)}
        <button
          onClick={onCreate}
          className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/40 p-4 text-center text-xs text-muted-foreground hover:border-foreground/40 hover:text-foreground"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} text-white`}>
            <Plus className="h-5 w-5" />
          </div>
          <p className="font-semibold">Add a new {m.label.toLowerCase()}</p>
          <p className="text-[10px]">or let AI source one for you</p>
        </button>
      </div>
    </div>
  );
}

function EntityCard({ l }: { l: Listing }) {
  const m = TAB_META[l.category];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elev transition hover:border-foreground/30">
      <div className="relative h-28 bg-muted">
        <img src={l.cover} alt={l.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-2 top-2 flex items-center gap-1.5">
          <span className={`flex items-center gap-1 rounded-full bg-gradient-to-r ${m.accent} px-2 py-0.5 text-[10px] font-semibold text-white`}>
            <m.Icon className="h-2.5 w-2.5" /> {m.label}
          </span>
          {l.participation === "partner" && (
            <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">Partner</span>
          )}
        </div>
        <p className="absolute bottom-2 left-2 text-sm font-semibold text-white">{l.name}</p>
      </div>
      <div className="space-y-2 p-3 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{l.zone}</span>
          <span>·</span>
          <span>{l.subcategory}</span>
          {l.clubersRating > 0 && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-secondary text-secondary" />{l.clubersRating}</span>
            </>
          )}
        </div>
        {l.category === "event" && l.whenLabel && (
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><Clock className="h-2.5 w-2.5" /> {l.whenLabel}</p>
        )}
        {l.category === "community" && (
          <p className="text-[11px] text-muted-foreground">{l.members?.toLocaleString()} members · {l.entryRule}</p>
        )}
        {l.category === "person" && (
          <p className="text-[11px] text-muted-foreground">{l.handle} · {l.igFollowers?.toLocaleString()} followers</p>
        )}
        <div className="flex gap-1 pt-1">
          <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-muted py-1.5 text-[10px] font-semibold hover:bg-muted/70">
            <Eye className="h-2.5 w-2.5" /> View
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-muted py-1.5 text-[10px] font-semibold hover:bg-muted/70">
            <PencilLine className="h-2.5 w-2.5" /> Edit
          </button>
          <button className="flex items-center justify-center rounded-md bg-muted px-2 py-1.5 text-[10px] font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
            <Trash2 className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// Create drawer — adapts fields per entity type
// ───────────────────────────────────────────────────────────────
function CreateDrawer({ tab, onClose }: { tab: EntityTab; onClose: () => void }) {
  const m = TAB_META[tab];
  const [step, setStep] = useState<"choose" | "form" | "done">("choose");
  return (
    <div className="absolute inset-0 z-30 flex bg-black/40" onClick={onClose}>
      <div
        className="ml-auto flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between border-b border-border bg-gradient-to-r ${m.accent} p-4 text-white`}>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <m.Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-90">New entity</p>
              <p className="text-sm font-semibold">Create a {m.label.toLowerCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/20 p-1.5 hover:bg-white/30">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === "choose" && <ChooseMethod onPick={() => setStep("form")} />}
          {step === "form" && <EntityForm tab={tab} onSubmit={() => setStep("done")} />}
          {step === "done" && <DoneStep tab={tab} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

function ChooseMethod({ onPick }: { onPick: () => void }) {
  return (
    <div className="space-y-3 p-4">
      <p className="text-xs text-muted-foreground">How do you want to create it?</p>
      <button
        onClick={onPick}
        className="flex w-full items-start gap-3 rounded-xl border border-violet-500/30 bg-violet-500/5 p-3 text-left hover:bg-violet-500/10"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Wand2 className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Source with AI</p>
          <p className="text-[11px] text-muted-foreground">Paste a name, URL or IG handle. The agent fills everything.</p>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground" />
      </button>
      <button
        onClick={onPick}
        className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left hover:bg-muted"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
          <PencilLine className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Fill manually</p>
          <p className="text-[11px] text-muted-foreground">Type the details yourself.</p>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground" />
      </button>
      <button
        onClick={onPick}
        className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left hover:bg-muted"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
          <Upload className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Import CSV</p>
          <p className="text-[11px] text-muted-foreground">Bulk-load from a spreadsheet.</p>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}

function EntityForm({ tab, onSubmit }: { tab: EntityTab; onSubmit: () => void }) {
  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
      className="space-y-4 p-4 text-xs"
    >
      <Field label="Name" placeholder={
        tab === "place" ? "La Catarina Rooftop" :
        tab === "event" ? "Sunset Sessions vol. 4" :
        tab === "community" ? "Borregos Tec" :
        "Ana Paula Rz."
      } />

      {tab === "place" && (
        <>
          <TwoCol>
            <Field label="Subcategory" placeholder="Rooftop Bar" />
            <Field label="Zone" placeholder="San Pedro" Icon={MapPin} />
          </TwoCol>
          <TwoCol>
            <SelectField label="Price level" options={["$", "$$", "$$$", "$$$$"]} />
            <SelectField label="Participation" options={["Listed", "Partner"]} />
          </TwoCol>
          <Field label="Vibes" placeholder="rooftop, late night, live music" Icon={Tag} />
          <Field label="Instagram" placeholder="@lacatarina" Icon={Instagram} />
          <Field label="Website" placeholder="lacatarina.mx" Icon={Globe} />
        </>
      )}

      {tab === "event" && (
        <>
          <TwoCol>
            <Field label="Subcategory" placeholder="Concert · Party · Pop-up" />
            <Field label="When" placeholder="Fri Dec 14 · 22:00" Icon={Calendar} />
          </TwoCol>
          <TwoCol>
            <Field label="Venue" placeholder="La Catarina Rooftop" Icon={Building2} />
            <Field label="Zone" placeholder="San Pedro" Icon={MapPin} />
          </TwoCol>
          <Field label="Hosts / lineup" placeholder="@anapaularz, @djmateo" Icon={UserCircle2} />
        </>
      )}

      {tab === "community" && (
        <>
          <TwoCol>
            <SelectField label="Kind" options={["College", "Members club", "Open", "Professional"]} />
            <Field label="Members" placeholder="1,820" />
          </TwoCol>
          <Field label="Entry rule" placeholder="Only @tec.mx · admin approval · open" />
          <Field label="Monthly fee" placeholder="0" />
          <Field label="Description" placeholder="What this community is and who it's for." />
        </>
      )}

      {tab === "person" && (
        <>
          <TwoCol>
            <Field label="Handle" placeholder="@anapaularz" Icon={Instagram} />
            <Field label="IG followers" placeholder="12,400" />
          </TwoCol>
          <Field label="Role" placeholder="DJ residente · Vértigo" />
          <SelectField label="Influence tier" options={["Rising", "Creator", "Tastemaker", "Icon"]} />
          <Field label="Linked venues" placeholder="La Catarina, Vértigo" Icon={Building2} />
        </>
      )}

      <div>
        <p className="mb-1 font-semibold text-muted-foreground">Cover image</p>
        <div className="flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-card text-muted-foreground hover:border-foreground/40">
          <div className="flex items-center gap-2 text-[11px]">
            <Upload className="h-3.5 w-3.5" /> Drop image or click to upload
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button type="button" className="flex-1 rounded-lg border border-border py-2 text-[11px] font-semibold text-muted-foreground hover:bg-muted">
          Save draft
        </button>
        <button type="submit" className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-foreground py-2 text-[11px] font-semibold text-background hover:opacity-90">
          <Check className="h-3.5 w-3.5" /> Publish
        </button>
      </div>
    </form>
  );
}

function DoneStep({ tab, onClose }: { tab: EntityTab; onClose: () => void }) {
  const m = TAB_META[tab];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.accent} text-white`}>
        <Check className="h-6 w-6" />
      </div>
      <p className="font-display text-xl font-semibold">{m.label} created</p>
      <p className="max-w-xs text-xs text-muted-foreground">It's live on the network. Guests can already discover it on Clubers.</p>
      <button onClick={onClose} className="mt-2 rounded-lg bg-foreground px-4 py-2 text-[11px] font-semibold text-background">
        Done
      </button>
    </div>
  );
}

function Field({ label, placeholder, Icon }: { label: string; placeholder: string; Icon?: IconType }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 focus-within:border-foreground/40">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
        <input className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-muted-foreground/60" placeholder={placeholder} />
      </div>
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-muted-foreground">{label}</span>
      <select className="w-full rounded-lg border border-border bg-card px-2.5 py-2 text-[12px] outline-none">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}