import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Lock,
  LogOut,
  Package,
  Phone,
  MapPin,
  Trash2,
  RefreshCw,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  Truck,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  adminListOrders,
  adminUpdateOrderStatus,
  adminDeleteOrder,
} from "@/lib/admin.functions";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@/lib/admin-credentials";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Jeba Shop" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const SESSION_KEY = "jeba:admin-session";
type Status = "pending" | "confirmed" | "delivered" | "cancelled";

type OrderRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  jela: string;
  thana: string;
  union_name: string | null;
  gram: string;
  product_id: string;
  product_name: string;
  color: string;
  qty: number;
  payment: string;
  subtotal: number;
  delivery: number;
  total: number;
  status: Status;
};

type Session = { username: string; password: string };

function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    if (s.username === ADMIN_USERNAME && s.password === ADMIN_PASSWORD) return s;
    return null;
  } catch {
    return null;
  }
}

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(loadSession());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!session) return <Login onSuccess={(s) => setSession(s)} />;
  return (
    <Dashboard
      session={session}
      onLogout={() => {
        localStorage.removeItem(SESSION_KEY);
        setSession(null);
      }}
    />
  );
}

function Login({ onSuccess }: { onSuccess: (s: Session) => void }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const username = String(fd.get("user") || "").trim();
    const password = String(fd.get("pass") || "");
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const s = { username, password };
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      onSuccess(s);
    } else {
      setError("ভুল ইউজারনেম অথবা পাসওয়ার্ড");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <form onSubmit={submit} className="w-full max-w-sm bg-card rounded-3xl p-8 shadow-card border border-border">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-gold">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-center text-2xl font-bold font-bn">অ্যাডমিন লগইন</h1>
        <p className="text-center text-sm text-muted-foreground mt-1 font-bn">Jeba Shop ড্যাশবোর্ড</p>

        <label className="block mt-6">
          <span className="text-sm font-medium font-bn">ইউজারনেম</span>
          <input name="user" required autoComplete="username" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <label className="block mt-4">
          <span className="text-sm font-medium font-bn">পাসওয়ার্ড</span>
          <input name="pass" type="password" required autoComplete="current-password" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>

        {error && <p className="text-sm text-red-500 mt-3 font-bn text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-gold hover:scale-[1.02] transition font-bn inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          লগইন করুন
        </button>
      </form>
    </div>
  );
}

function Dashboard({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const list = useServerFn(adminListOrders);
  const updateStatus = useServerFn(adminUpdateOrderStatus);
  const removeFn = useServerFn(adminDeleteOrder);

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");

  const refresh = async () => {
    setLoading(true);
    try {
      const rows = await list({ data: session });
      setOrders(rows as OrderRow[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);
    const completedRevenue = orders
      .filter((o) => o.status === "delivered")
      .reduce((s, o) => s + o.total, 0);
    return { total, pending, confirmed, delivered, cancelled, revenue, completedRevenue };
  }, [orders]);

  const visible = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return [o.name, o.phone, o.id, o.jela, o.thana, o.product_name].some((v) =>
      v.toLowerCase().includes(q),
    );
  });

  const setStatus = async (id: string, status: Status) => {
    await updateStatus({ data: { ...session, id, status } });
    refresh();
  };
  const remove = async (id: string) => {
    if (!confirm("এই অর্ডারটি ডিলিট করবেন?")) return;
    await removeFn({ data: { ...session, id } });
    refresh();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">J</div>
            <div>
              <div className="font-bold leading-tight">Jeba Shop</div>
              <div className="text-xs text-muted-foreground font-bn">অ্যাডমিন ড্যাশবোর্ড</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refresh} className="p-2 rounded-lg hover:bg-muted" title="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium">
              <LogOut className="w-4 h-4" /> <span className="font-bn">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        {/* Analytics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 font-bn">
          <Stat icon={Package} label="মোট অর্ডার" value={stats.total} tone="default" />
          <Stat icon={TrendingUp} label="মোট সেলস" value={`৳${stats.revenue.toLocaleString("en-BD")}`} tone="primary" />
          <Stat icon={Clock} label="পেন্ডিং" value={stats.pending} tone="amber" />
          <Stat icon={CheckCircle2} label="ডেলিভার্ড" value={stats.delivered} tone="green" />
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 font-bn">
          <MiniStat label="কনফার্মড" value={stats.confirmed} />
          <MiniStat label="ক্যানসেল্ড" value={stats.cancelled} />
          <MiniStat label="কমপ্লিটেড রেভিনিউ" value={`৳${stats.completedRevenue.toLocaleString("en-BD")}`} />
          <MiniStat
            label="কমপ্লিশন রেট"
            value={`${stats.total ? Math.round((stats.delivered / stats.total) * 100) : 0}%`}
          />
        </section>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="খুঁজুন (নাম, ফোন, অর্ডার আইডি...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary focus:outline-none font-bn text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto font-bn text-sm">
            {(
              [
                ["all", "সব"],
                ["pending", "পেন্ডিং"],
                ["confirmed", "কনফার্মড"],
                ["delivered", "ডেলিভার্ড"],
                ["cancelled", "ক্যানসেল"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k as typeof filter)}
                className={`px-3 py-2 rounded-lg border whitespace-nowrap ${
                  filter === k
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        {loading && orders.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-bn bg-card rounded-2xl border border-border inline-flex items-center justify-center gap-2 w-full">
            <Loader2 className="w-4 h-4 animate-spin" /> লোড হচ্ছে...
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-bn bg-card rounded-2xl border border-border">
            কোনো অর্ডার পাওয়া যায়নি
          </div>
        ) : (
          <div className="grid gap-3">
            {visible.map((o) => (
              <article key={o.id} className="bg-card rounded-2xl border border-border p-4 md:p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2 py-1 rounded bg-muted">
                        JEBA-{o.id.slice(0, 8).toUpperCase()}
                      </span>
                      <StatusBadge status={o.status} />
                      <span className="text-xs text-muted-foreground font-bn">
                        {new Date(o.created_at).toLocaleString("bn-BD")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mt-2 font-bn">{o.name}</h3>
                    <a href={`tel:${o.phone}`} className="text-sm text-primary inline-flex items-center gap-1 mt-0.5">
                      <Phone className="w-3.5 h-3.5" /> {o.phone}
                    </a>
                  </div>
                  <div className="text-right font-bn">
                    <div className="text-xs text-muted-foreground">মোট</div>
                    <div className="text-2xl font-bold text-primary">৳{o.total.toLocaleString("en-BD")}</div>
                    <div className="text-xs text-muted-foreground">{o.payment.toUpperCase()}</div>
                  </div>
                </div>

                <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm font-bn">
                  <div className="rounded-lg bg-muted/60 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <Package className="w-3.5 h-3.5" /> প্রোডাক্ট
                    </div>
                    <div className="font-semibold">{o.product_name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      কালার: {o.color} • পরিমাণ: {o.qty} • সাবটোটাল ৳{o.subtotal} + ডেলিভারি ৳{o.delivery}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3.5 h-3.5" /> ঠিকানা
                    </div>
                    <div>জেলা: <b>{o.jela}</b></div>
                    <div>থানা: <b>{o.thana}</b></div>
                    {o.union_name && <div>ইউনিয়ন: <b>{o.union_name}</b></div>}
                    <div>গ্রাম: <b>{o.gram}</b></div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 font-bn text-xs">
                  {o.status !== "confirmed" && o.status !== "delivered" && (
                    <button
                      onClick={() => setStatus(o.id, "confirmed")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accept
                    </button>
                  )}
                  {o.status !== "delivered" && (
                    <button
                      onClick={() => setStatus(o.id, "delivered")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white"
                    >
                      <Truck className="w-3.5 h-3.5" /> Deliver
                    </button>
                  )}
                  {o.status !== "cancelled" && (
                    <button
                      onClick={() => setStatus(o.id, "cancelled")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Cancel
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${o.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white"
                  >
                    হোয়াটসঅ্যাপ
                  </a>
                  <button
                    onClick={() => remove(o.id)}
                    className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> ডিলিট
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Package;
  label: string;
  value: number | string;
  tone: "default" | "amber" | "green" | "primary";
}) {
  const toneClass = {
    default: "text-foreground",
    amber: "text-amber-600",
    green: "text-emerald-600",
    primary: "text-primary",
  }[tone];
  return (
    <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${toneClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`text-xl font-bold ${toneClass}`}>{value}</div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-card/60 rounded-xl border border-border px-4 py-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-base font-semibold mt-0.5">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map = {
    pending: { l: "পেন্ডিং", c: "bg-amber-100 text-amber-700" },
    confirmed: { l: "কনফার্মড", c: "bg-blue-100 text-blue-700" },
    delivered: { l: "ডেলিভার্ড", c: "bg-emerald-100 text-emerald-700" },
    cancelled: { l: "ক্যানসেল", c: "bg-red-100 text-red-700" },
  }[status];
  return <span className={`text-xs px-2 py-0.5 rounded-full font-bn font-medium ${map.c}`}>{map.l}</span>;
}
