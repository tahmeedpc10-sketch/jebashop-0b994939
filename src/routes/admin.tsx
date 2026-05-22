import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Lock, LogOut, Package, Phone, MapPin, Trash2, RefreshCw, Search, Loader2, History } from "lucide-react";
import { getOrders, updateOrderStatus, deleteOrder, getAuditLog, type Order, type AuditEntry } from "@/lib/orders";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_USERNAME = "JEBASHOP01";
const ADMIN_EMAIL = "jebashop01@jeba.shop";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Jeba Shop" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) {
    console.error("has_role error", error);
    return false;
  }
  return !!data;
}

function AdminPage() {
  const [state, setState] = useState<"checking" | "login" | "ready">("checking");
  const [permError, setPermError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        if (!cancelled) setState("login");
        return;
      }
      const ok = await checkIsAdmin(data.session.user.id);
      if (cancelled) return;
      if (ok) {
        setPermError("");
        setState("ready");
      } else {
        await supabase.auth.signOut();
        setPermError("এই অ্যাকাউন্টে অ্যাডমিন অনুমতি নেই");
        setState("login");
      }
    };
    verify();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) setState("login");
      else verify();
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground font-bn">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> যাচাই করা হচ্ছে...
      </div>
    );
  }
  if (state === "login") return <Login permError={permError} />;
  return <Dashboard onLogout={async () => { await supabase.auth.signOut(); }} />;
}

function Login({ permError }: { permError?: string }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const user = String(fd.get("user") || "").trim();
    const pass = String(fd.get("pass") || "");

    // Map the JEBASHOP01 username to the seeded admin email.
    const email = user.toUpperCase() === ADMIN_USERNAME ? ADMIN_EMAIL : user;

    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setError("ভুল ইউজারনেম অথবা পাসওয়ার্ড");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm glass-strong rounded-3xl p-8 shadow-card">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-gold">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-center text-2xl font-bold font-bn">অ্যাডমিন লগইন</h1>
        <p className="text-center text-sm text-muted-foreground mt-1 font-bn">Jeba Shop ড্যাশবোর্ড</p>

        {permError && <p className="text-sm text-red-500 mt-4 text-center font-bn">{permError}</p>}

        <label className="block mt-6">
          <span className="text-sm font-medium font-bn">ইউজারনেম</span>
          <input name="user" required defaultValue="" className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <label className="block mt-4">
          <span className="text-sm font-medium font-bn">পাসওয়ার্ড</span>
          <input name="pass" type="password" required className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>

        {error && <p className="text-sm text-red-500 mt-3 font-bn">{error}</p>}

        <button type="submit" disabled={loading} className="mt-6 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-gold hover:scale-[1.02] transition font-bn inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          লগইন করুন
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");
  const [tab, setTab] = useState<"orders" | "audit">("orders");

  const refresh = async () => {
    setLoading(true);
    try {
      const [o, a] = await Promise.all([getOrders(), getAuditLog(200)]);
      setOrders(o);
      setAudit(a);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refresh();
    const channel = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => refresh())
      .on("postgres_changes", { event: "*", schema: "public", table: "order_audit_log" }, () => refresh())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === "pending").length;
    const confirmed = orders.filter(o => o.status === "confirmed").length;
    const delivered = orders.filter(o => o.status === "delivered").length;
    const revenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
    return { total, pending, confirmed, delivered, revenue };
  }, [orders]);

  const visible = orders.filter(o => {
    if (filter !== "all" && o.status !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return [o.name, o.phone, o.id, o.jela, o.thana, o.productName].some(v => v.toLowerCase().includes(q));
  });

  const setStatus = async (id: string, s: Order["status"]) => { await updateOrderStatus(id, s); refresh(); };
  const remove = async (id: string) => { if (confirm("এই অর্ডারটি ডিলিট করবেন?")) { await deleteOrder(id); refresh(); } };

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
            <button onClick={refresh} className="p-2 rounded-lg hover:bg-muted" title="Refresh"><RefreshCw className="w-4 h-4" /></button>
            <button onClick={onLogout} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-foreground text-background text-sm font-medium">
              <LogOut className="w-4 h-4" /> <span className="font-bn">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-bn">
          <Stat label="মোট অর্ডার" value={stats.total} />
          <Stat label="পেন্ডিং" value={stats.pending} tone="amber" />
          <Stat label="কনফার্মড" value={stats.confirmed} tone="blue" />
          <Stat label="ডেলিভার্ড" value={stats.delivered} tone="green" />
          <Stat label="মোট রেভিনিউ" value={`৳${stats.revenue.toLocaleString("en-BD")}`} tone="primary" />
        </div>

        <div className="flex gap-2 font-bn text-sm">
          <button
            onClick={() => setTab("orders")}
            className={`px-4 py-2 rounded-lg border inline-flex items-center gap-1.5 ${tab === "orders" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
          >
            <Package className="w-4 h-4" /> অর্ডার ({orders.length})
          </button>
          <button
            onClick={() => setTab("audit")}
            className={`px-4 py-2 rounded-lg border inline-flex items-center gap-1.5 ${tab === "audit" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
          >
            <History className="w-4 h-4" /> অডিট লগ ({audit.length})
          </button>
        </div>

        {tab === "orders" && (
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
            {([
              ["all", "সব"], ["pending", "পেন্ডিং"], ["confirmed", "কনফার্মড"],
              ["delivered", "ডেলিভার্ড"], ["cancelled", "ক্যানসেল"],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k as typeof filter)}
                className={`px-3 py-2 rounded-lg border whitespace-nowrap ${filter === k ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        )}

        {tab === "orders" && (<>


        {loading ? (
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
                      <span className="font-mono text-xs px-2 py-1 rounded bg-muted">JEBA-{o.id.slice(0, 8).toUpperCase()}</span>
                      <StatusBadge status={o.status} />
                      <span className="text-xs text-muted-foreground font-bn">
                        {new Date(o.createdAt).toLocaleString("bn-BD")}
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
                    <div className="font-semibold">{o.productName}</div>
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
                    {o.union && <div>ইউনিয়ন: <b>{o.union}</b></div>}
                    <div>গ্রাম: <b>{o.gram}</b></div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 font-bn text-xs">
                  {o.status !== "confirmed" && (
                    <button onClick={() => setStatus(o.id, "confirmed")} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white">কনফার্ম</button>
                  )}
                  {o.status !== "delivered" && (
                    <button onClick={() => setStatus(o.id, "delivered")} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white">ডেলিভার্ড</button>
                  )}
                  {o.status !== "cancelled" && (
                    <button onClick={() => setStatus(o.id, "cancelled")} className="px-3 py-1.5 rounded-lg bg-muted border border-border">ক্যানসেল</button>
                  )}
                  <a
                    href={`https://wa.me/${o.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white"
                  >
                    হোয়াটসঅ্যাপ
                  </a>
                  <button onClick={() => remove(o.id)} className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" /> ডিলিট
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        </>)}

        {tab === "audit" && <AuditPanel entries={audit} loading={loading} />}
      </main>
    </div>
  );
}

function Stat({ label, value, tone = "default" }: { label: string; value: number | string; tone?: "default" | "amber" | "blue" | "green" | "primary" }) {
  const toneClass = {
    default: "text-foreground",
    amber: "text-amber-600",
    blue: "text-blue-600",
    green: "text-emerald-600",
    primary: "text-primary",
  }[tone];
  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${toneClass}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    pending: { l: "পেন্ডিং", c: "bg-amber-100 text-amber-700" },
    confirmed: { l: "কনফার্মড", c: "bg-blue-100 text-blue-700" },
    delivered: { l: "ডেলিভার্ড", c: "bg-emerald-100 text-emerald-700" },
    cancelled: { l: "ক্যানসেল", c: "bg-red-100 text-red-700" },
  }[status];
  return <span className={`text-xs px-2 py-0.5 rounded-full font-bn font-medium ${map.c}`}>{map.l}</span>;
}

function AuditPanel({ entries, loading }: { entries: AuditEntry[]; loading: boolean }) {
  const actionMap: Record<string, { l: string; c: string }> = {
    created: { l: "তৈরি", c: "bg-emerald-100 text-emerald-700" },
    status_changed: { l: "স্ট্যাটাস পরিবর্তন", c: "bg-blue-100 text-blue-700" },
    updated: { l: "আপডেট", c: "bg-amber-100 text-amber-700" },
    deleted: { l: "ডিলিট", c: "bg-red-100 text-red-700" },
  };
  if (loading) {
    return (
      <div className="text-center py-20 text-muted-foreground font-bn bg-card rounded-2xl border border-border inline-flex items-center justify-center gap-2 w-full">
        <Loader2 className="w-4 h-4 animate-spin" /> লোড হচ্ছে...
      </div>
    );
  }
  if (entries.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground font-bn bg-card rounded-2xl border border-border">
        কোনো অডিট লগ নেই
      </div>
    );
  }
  return (
    <div className="grid gap-2">
      {entries.map((e) => {
        const a = actionMap[e.action] ?? { l: e.action, c: "bg-muted text-foreground" };
        return (
          <article key={e.id} className="bg-card rounded-xl border border-border p-3 md:p-4 text-sm font-bn">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.c}`}>{a.l}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">JEBA-{e.orderId.slice(0, 8).toUpperCase()}</span>
              {e.customerName && <span className="font-semibold">{e.customerName}</span>}
              {e.productName && <span className="text-muted-foreground text-xs">• {e.productName}</span>}
              {e.total != null && <span className="text-primary font-semibold text-xs">৳{e.total.toLocaleString("en-BD")}</span>}
              <span className="text-xs text-muted-foreground ml-auto">
                {new Date(e.createdAt).toLocaleString("bn-BD")}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {e.action === "status_changed" && (
                <span>
                  স্ট্যাটাস: <b className="text-foreground">{e.oldStatus}</b> → <b className="text-foreground">{e.newStatus}</b>
                </span>
              )}
              <span>
                অ্যাডমিন: <b className="text-foreground">{e.actorEmail ?? "system / customer"}</b>
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

