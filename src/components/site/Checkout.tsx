import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, ShieldCheck, Truck, Wallet, BadgeCheck } from "lucide-react";
import { products } from "@/lib/products";
import { placeOrder } from "@/lib/place-order.functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const paymentMethods = [
  { id: "cod", label: "ক্যাশ অন ডেলিভারি", sub: "প্রোডাক্ট হাতে পেয়ে টাকা দিন", emoji: "💵" },
  { id: "bkash", label: "বিকাশ", sub: "Send Money", emoji: "🟣", color: "#E2136E" },
  { id: "nagad", label: "নগদ", sub: "Send Money", emoji: "🟧", color: "#EE1C25" },
];

const colorBn: Record<string, string> = {
  Red: "লাল (RED)",
  Blue: "নীল (BLUE)",
  Black: "কালো (BLACK)",
  Green: "সবুজ (GREEN)",
  Military: "মিলিটারি",
  "Classic Navy Blue": "নেভি ব্লু",
};

export function Checkout() {
  const submitOrder = useServerFn(placeOrder);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [orderId, setOrderId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(products[0].colors?.[0] ?? "");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const stored = sessionStorage.getItem("jeba:selected-product");
    if (stored) setSelectedProduct(stored);
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setSelectedProduct(detail);
    };
    window.addEventListener("jeba:select-product", handler);
    return () => window.removeEventListener("jeba:select-product", handler);
  }, []);

  const product = products.find((p) => p.id === selectedProduct) ?? products[0];

  useEffect(() => {
    if (product.colors && !product.colors.includes(selectedColor)) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedColor]);

  const subtotal = product.price * qty;
  const delivery = 80;
  const total = subtotal + delivery;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const form = e.currentTarget;

    try {
      const saved = await submitOrder({
        data: {
          name: String(fd.get("name") || ""),
          phone: String(fd.get("phone") || ""),
          jela: String(fd.get("jela") || ""),
          thana: String(fd.get("thana") || ""),
          union: "",
          gram: String(fd.get("gram") || ""),
          productId: product.id,
          color: selectedColor,
          qty,
          payment: payment as "cod" | "bkash" | "nagad",
        },
      });
      setOrderId("JEBA-" + saved.id.slice(0, 8).toUpperCase());
      setOpen(true);
      form.reset();
      setQty(1);
    } catch (err) {
      console.error(err);
      alert("অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="checkout" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-bn">দ্রুত অর্ডার</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 font-bn">এখনই অর্ডার করুন</h2>
          <p className="font-bn mt-3 text-muted-foreground">
            প্রোডাক্ট হাতে পেয়ে চেক করে তারপর টাকা দিন
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-card">
          <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
            <Field label="আপনার নাম *" name="name" placeholder="পুরো নাম" required />
            <Field label="মোবাইল নাম্বার *" name="phone" type="tel" placeholder="01XXXXXXXXX" required />

            <Field label="জেলা *" name="jela" placeholder="যেমনঃ ঢাকা" required />
            <Field label="থানা / উপজেলা *" name="thana" placeholder="যেমনঃ সাভার" required />
            <Field label="ইউনিয়ন *" name="union" placeholder="যেমনঃ আশুলিয়া" required />
            <Field label="গ্রাম / বাসা ও রোড *" name="gram" placeholder="বিস্তারিত ঠিকানা" required />

            <Select
              label="প্রোডাক্ট *"
              name="product"
              required
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ৳{p.price}
                </option>
              ))}
            </Select>
            <div className="block">
              <span className="text-sm font-medium mb-1.5 block font-bn">কালার সিলেক্ট করুন *</span>
              <div className="flex flex-wrap gap-2">
                {(product.colors ?? ["Default"]).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border-2 uppercase tracking-wide transition font-bn ${
                      selectedColor === c
                        ? "border-primary bg-primary text-primary-foreground shadow-gold"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {colorBn[c] || c}
                  </button>
                ))}
              </div>
            </div>
            <Field
              label="পরিমাণ *"
              name="qty"
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              min={1}
              required
            />
            <div className="rounded-xl bg-muted border border-border p-4 space-y-1.5 text-sm font-bn">
              <div className="flex justify-between"><span className="text-muted-foreground">প্রোডাক্ট</span><span>৳{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">ডেলিভারি</span><span>৳{delivery}</span></div>
              <div className="flex justify-between border-t border-border pt-1.5 font-bold text-base"><span>মোট</span><span className="text-primary">৳{total}</span></div>
            </div>

            <div className="md:col-span-2">
              <div className="text-sm font-semibold mb-3 font-bn">পেমেন্ট মেথড সিলেক্ট করুন</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentMethods.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`relative rounded-2xl p-4 text-left border-2 transition font-bn overflow-hidden ${
                      payment === m.id
                        ? "border-primary bg-primary/5 shadow-gold scale-[1.02]"
                        : "border-border hover:border-primary/40 bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                        style={{ background: m.color || "#16a34a" }}
                      >
                        {m.id === "bkash" ? "b" : m.id === "nagad" ? "N" : "💵"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm">{m.label}</div>
                        <div className="text-[11px] text-muted-foreground truncate">{m.sub}</div>
                      </div>
                      {payment === m.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {payment === "bkash" && (
                <div className="mt-3 rounded-xl border border-pink-200 bg-pink-50 p-3 text-xs text-pink-900 font-bn animate-fade-up">
                  bKash নাম্বার (Personal): <b>01832-860787</b> — Send Money করে রেফারেন্সে অর্ডার আইডি দিন।
                </div>
              )}
              {payment === "nagad" && (
                <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs text-orange-900 font-bn animate-fade-up">
                  Nagad নাম্বার (Personal): <b>01832-860787</b> — Send Money করে রেফারেন্সে অর্ডার আইডি দিন।
                </div>
              )}
              {payment === "cod" && (
                <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 font-bn animate-fade-up">
                  ক্যাশ অন ডেলিভারি — প্রোডাক্ট হাতে পেয়ে চেক করে তারপর ডেলিভারিম্যানকে টাকা দিন।
                </div>
              )}
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 font-bn">
              {[
                { icon: Wallet, t: "ক্যাশ অন ডেলিভারি" },
                { icon: BadgeCheck, t: "চেক করে টাকা দিন" },
                { icon: Truck, t: "ফাস্ট ডেলিভারি" },
                { icon: ShieldCheck, t: "ওয়ারেন্টি" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <b.icon className="w-4 h-4 text-primary" />
                  {b.t}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-gold hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              <span className="font-bn">{loading ? "প্রসেসিং..." : `অর্ডার কনফার্ম করুন — ৳${total}`}</span>
            </button>
          </form>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass-strong border-primary/30">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3 shadow-gold animate-pulse-glow">
              <Check className="w-8 h-8 text-primary-foreground" strokeWidth={3} />
            </div>
            <DialogTitle className="text-center text-2xl font-bn">
              অর্ডার সফল হয়েছে! 🎉
            </DialogTitle>
            <DialogDescription className="text-center font-bn">
              আপনার অর্ডার আইডি: <span className="text-primary font-bold">{orderId}</span>
              <br />
              আমাদের প্রতিনিধি শীঘ্রই আপনাকে কল করবেন।
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Field({
  label,
  full,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-medium mb-1.5 block font-bn">{label}</span>
      <input
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition font-bn"
      />
    </label>
  );
}

function Select({
  label,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium mb-1.5 block font-bn">{label}</span>
      <select
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition font-bn"
      >
        {children}
      </select>
    </label>
  );
}
